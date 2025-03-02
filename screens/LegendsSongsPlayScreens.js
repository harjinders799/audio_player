import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import Slider from '@react-native-community/slider';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LegendsongsList } from '../ScreenSongs/LegendsongsList';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { getFontSize } from '../utils'; // Responsive font utility

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(LegendsongsList);
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

const LegendsSongsPlayScreens = ({ navigation, route }) => {
  const { selectedIndex } = route.params;
  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  // Skip to a given track and start playing (if desired)
  const skipTo = async (trackId) => {
    await TrackPlayer.skip(trackId);
    await TrackPlayer.play(); // Auto-play once we skip
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged) {
      const currentTrack = event.nextTrack;
      if (currentTrack !== null) {
        setSongIndex(currentTrack);
        // Programmatically scroll to the new track
        songSlider.current?.scrollToOffset({
          offset: currentTrack * width,
          animated: true,
        });
      } else {
        // If track is null, reset to the first track
        setSongIndex(0);
        songSlider.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    }
  });

  // Set up the player once on mount
  useEffect(() => {
    const startPlayer = async () => {
      await setupPlayer();
      await skipTo(selectedIndex);
      setSongIndex(selectedIndex);
      songSlider.current?.scrollToOffset({
        offset: selectedIndex * width,
        animated: true,
      });
    };
    startPlayer();

    // Clean up scroll listeners on unmount
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const skipToNext = async () => {
    let nextIndex = songIndex + 1;
    if (nextIndex >= LegendsongsList.length) {
      nextIndex = 0; // wrap around to the first track
    }
    try {
      await skipTo(nextIndex);
      setSongIndex(nextIndex);
      songSlider.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    } catch (error) {
      console.log("Error skipping to next track:", error);
    }
  };

  const skipToPrevious = async () => {
    let previousIndex = songIndex - 1;
    if (previousIndex < 0) {
      previousIndex = LegendsongsList.length - 1; // wrap around to the last track
    }
    try {
      await skipTo(previousIndex);
      setSongIndex(previousIndex);
      songSlider.current?.scrollToOffset({
        offset: previousIndex * width,
        animated: true,
      });
    } catch (error) {
      console.log("Error skipping to previous track:", error);
    }
  };

  // Called when user finishes scrolling (momentum stops)
  const onScrollEnd = async (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);

    // Only skip if we've actually changed track index
    if (newIndex !== songIndex) {
      await skipTo(newIndex);
      setSongIndex(newIndex);
    }
  };

  const renderSongs = ({ index, item }) => {
    return (
      <Animated.View style={styles.animatedview}>
        <View style={styles.artworkWrapper}>
          <Image source={item.artwork} style={styles.artworkimage} />
        </View>
      </Animated.View>
    );
  };

  // Optional: Reset when track finishes
  useEffect(() => {
    if (duration > 0) {
      const remainingTime = new Date((duration - position) * 1000).toISOString().substr(14, 5);
      if (remainingTime === '00:00') {
        // Pause the audio and seek to the beginning
        TrackPlayer.pause();
        TrackPlayer.seekTo(0);
      }
    }
  }, [position, duration]);

  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={{ flex: 1, paddingBottom: 20 }}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.goBack()}>
            <Image
              source={require("../images/back-white.webp")}
              style={{ height: 50, width: 50, marginLeft: 15, tintColor: 'black' }}
            />
          </TouchableOpacity>

          <View style={styles.mainContainer}>
            {/* Artwork / Swiping */}
            <View style={{ width: width }}>
              <Animated.FlatList
                ref={songSlider}
                data={LegendsongsList}
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
                onMomentumScrollEnd={onScrollEnd}
              />
            </View>

            {/* Song Title & Artist */}
            <View style={styles.titleView}>
              <Text
                allowFontScaling={false}
                style={[styles.title, { marginBottom: 10 }]}
              >
                {LegendsongsList[songIndex].title}
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.artist}
              >
                {LegendsongsList[songIndex].artist}
              </Text>
            </View>

            {/* Progress / Slider */}
            <View style={{ marginTop: 25 }}>
              <Slider
                style={styles.progressContainer}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="black"
                thumbTintColor="green"
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
              />
              <View style={styles.progressLabelContainer}>
                <Text allowFontScaling={false} style={styles.progressLebelText}>
                  {new Date(position * 1000).toISOString().substr(14, 5)}
                </Text>
                <Text allowFontScaling={false} style={styles.progressLebelText}>
                  {new Date((duration - position) * 1000).toISOString().substr(14, 5)}
                </Text>
              </View>
            </View>

            {/* Playback Controls */}
            <View style={styles.musicControls}>
              <TouchableOpacity onPress={skipToPrevious} style={styles.skipButton}>
                <Ionicons name="play-skip-back-outline" size={35} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => togglePlayback(playbackState)}
                style={styles.playButton}
              >
                <Ionicons
                  name={playbackState === State.Playing ? "pause-circle" : "play-circle"}
                  size={75}
                  color="black"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={skipToNext} style={styles.skipButton}>
                <Ionicons name="play-skip-forward-outline" size={35} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.queueIconContainer}
                onPress={() => navigation.navigate('AllSongsListScreen')}
              >
                <MaterialIcons name="queue-music" size={35} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

export default LegendsSongsPlayScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 50 : 50,
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
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  artworkimage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: getFontSize(25),
    fontWeight: '700',
    color: '#EEEEEEE',
  },
  artist: {
    fontSize: getFontSize(16),
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
    fontSize: getFontSize(14),
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
    marginHorizontal: 20,
  },
  playButton: {
    marginHorizontal: 10,
  },
  queueIconContainer: {
    position: 'absolute',
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    marginTop: 5,
    width: width,
    marginLeft: 70,
  },
  animatedview: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
