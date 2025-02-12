import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import Slider from '@react-native-community/slider';
import LinearGradient from "react-native-linear-gradient";
//import { AllsongsList } from '../ScreenSongs/AllSongs';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AllsongsList } from '../ScreenSongs/AllSongs';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';





const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(AllsongsList);
  await TrackPlayer.setRepeatMode(RepeatMode.Track);

};

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const AllSongsPlayScreen = ({ navigation }) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  // Skip to the specified track
  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged) {
      const currentTrack = event.nextTrack;
  
      if (currentTrack !== null) {
        setSongIndex(currentTrack);
  
        // Scroll to the new track smoothly
        songSlider.current.scrollToOffset({
          offset: currentTrack * width,
          animated: true,
        });
      } else {
        // If track is null (looped to first track), reset scroll and song index
        setSongIndex(0);
        songSlider.current.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    }
  });
  




  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      if (index >= AllsongsList.length) {
        setSongIndex(0);
        songSlider.current.scrollToOffset({ offset: 0, animated: true });
      } else {
        setSongIndex(index);
      }
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);
  
  



  const skipToNext = async () => {
    let nextIndex = songIndex + 1;
    if (nextIndex >= AllsongsList.length) { // If it's the last song, go back to the first
      nextIndex = 0;
    }
    try {
      await TrackPlayer.skip(nextIndex);
      songSlider.current.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
      setSongIndex(nextIndex); // Update the song index
    } catch (error) {
      console.log("Error skipping to next track:", error);
    }
  };

  const skipToPrevious = async () => {
    let previousIndex = songIndex - 1;
    if (previousIndex < 0) { // If it's the first song, go to the last
      previousIndex = AllsongsList.length - 1;
    }
    try {
      await TrackPlayer.skip(previousIndex);
      songSlider.current.scrollToOffset({
        offset: previousIndex * width,
        animated: true,
      });
      setSongIndex(previousIndex); // Update the song index
    } catch (error) {
      console.log("Error skipping to previous track:", error);
    }
  };

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.artworkWrapper}>
          <Image source={item.artwork} style={styles.artworkimage} />
        </View>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={{ flex: 1, paddingBottom: 20 }}>
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />

        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
            <Image source={require("../images/back-white.webp")} style={{ height: 50, width: 50, marginLeft: 15, tintColor: 'black' }} />
          </TouchableOpacity>
          <View style={styles.mainContainer}>

            <View style={{ width: width }}>
              <Animated.FlatList
                ref={songSlider}
                data={AllsongsList}
                renderItem={renderSongs}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
              />
            </View>

            <View style={{ marginLeft: 0, marginTop: 5, width: width, marginLeft: 70 }}>
              <Text style={[styles.title, { marginBottom: 10 }]}>{AllsongsList[songIndex].title}</Text>
              <Text style={styles.artist}>{AllsongsList[songIndex].artist}</Text>
            </View>

            <View style={{ marginTop: 25 }}>
              <Slider
                style={styles.progressContainer}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                minimumTrackTintColor="black"
                thumbTintColor="green"
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
              />
              <View style={styles.progressLabelContainer}>
                <Text style={styles.progressLebelText}>{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
                <Text style={styles.progressLebelText}>{new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}</Text>
              </View>
            </View>       
         
            <View style={styles.musicControls}>

                <TouchableOpacity onPress={skipToPrevious} style={styles.skipButton}>
                  <Ionicons name="play-skip-back-outline" size={35} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => togglePlayback(playbackState)} style={styles.playButton}>
                  <Ionicons name={playbackState === State.Playing ? "pause-circle" : "play-circle"} size={75} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipToNext} style={styles.skipButton}>
                  <Ionicons name="play-skip-forward-outline" size={35} color="black" />
                </TouchableOpacity>      

                <TouchableOpacity style={styles.queueIconContainer} onPress={()=>navigation.navigate('AllSongsListScreen')}>
                  <MaterialIcons name={"queue-music"} size={35} color={"#000000"} />
                </TouchableOpacity>
                
             </View>

          </View>

        </SafeAreaView>

      </View>
    </LinearGradient>
  );
};

export default AllSongsPlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: 350,
    height: 340,
    marginBottom: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84
  },
  artworkimage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWidth: '700',
    color: '#EEEEEEE',
  },
  artist: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EEEEEEE',
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLebelText: {
    color: 'black',
  },
  musicControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
    position: 'relative',
  },
  skipButton: {
    marginHorizontal: 20,  // Increase spacing for skip buttons
  },
  playButton: {
    marginHorizontal: 10,  // Center play button with more spacing
  },
  queueIconContainer: {
    position: 'absolute',
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
