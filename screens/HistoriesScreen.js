import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View,FlatList, Animated } from 'react-native'
import React,{useState,useEffect,useRef,} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
const {width,height} = Dimensions.get('window');
import Silder from '@react-native-community/slider';
import { songsList } from '../ScreenSongs/Histories';

const HistoriesScreen = () => {


  const scrollX = useRef (new Animated.Value(0)).current;
  const [songIndex, setSongIndex ]=useState(0);
const songSlider = useRef(null);

  useEffect(()=>{
    scrollX.addListener(({value})=>{
      //console.log("scrol x" , scrollX)
      //console.log('device width', width)
      const index =Math.round(value/width);
      //console.log('index', index)
      setSongIndex(index)
    });

    return()=>{
      scrollX.removeAllListeners();
    }


  },[])


  const skipToNext=()=>{
    songSlider.current.scrollToOffset({
      offset:(songIndex+1)*width,
    });
  }

  const skipToPrevious=()=>{
    songSlider.current.scrollToOffset({
      offset:(songIndex-1)*width,
    });
  }

  const renderSongs =({index,item})=>{
    return(
      <Animated.View style={{width:width,justifyContent:'center',alignItems:'center'}}>
               <View style={styles.artworkWrapper}>
                   <Image source={item.artwork} style={styles.artworkimage}/>
              </View>
      </Animated.View >
     
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
        
        <SafeAreaView style={{flex:1,backgroundColor:'#9f5ae8'}}>
            
            <View style={styles.mainContainer}>

            <View style={{width:width}}>
              <Animated.FlatList
              ref={songSlider}
              data={songsList}
              renderItem={renderSongs}
              keyExtractor={(item)=>item.id}
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false} 
              scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{x:scrollX}}}],
            {useNativeDriver:true}
          )}
          />
            </View> 

              <View>
              <Text style={styles.title}>{songsList[songIndex].title}</Text>
              <Text style={styles.artist}>{songsList[songIndex].artist}</Text>
            </View>

            <View>
                <Silder style={styles.progressContainer}  
                value={10} 
                minimumValue={0} 
                maximumValue={100}
                onSlidingComplete={()=>{}}
                />
                <View style={styles.progressLabelContainer}>
                  <Text style={styles.progressLebelText}>0.00</Text>
                  <Text style={styles.progressLebelText}>3.44</Text>
                </View>
            </View>

            <View style={styles.musicControls}>
              <TouchableOpacity onPress={skipToPrevious}>
                  <Ionicons name="play-skip-back-outline" size={35} color="white" style={{marginTop:25}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}}>
                  <Ionicons name="pause-circle" size={75} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={skipToNext}>
                  <Ionicons name="play-skip-forward-outline" size={35} color="white" style={{marginTop:25}} />
                </TouchableOpacity>
            </View>

          </View>

           

            <View style={styles.bottomcontainer}>
              <View style={styles.bottomcontrols}>
                
                <TouchableOpacity onPress={()=>{}}>
                  <Ionicons name="heart-outline" size={30} color="white"/>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={()=>{}}>
                  <Ionicons name="repeat" size={30} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}}>
                  <Ionicons name="share-outline" size={30} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}}>
                  <Ionicons name="heart-outline" size={30} color="white"/>
                </TouchableOpacity>

              </View>
            </View>

        </SafeAreaView>

    </View>
  )
}

export default HistoriesScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mainContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  bottomcontainer:{
    borderTopColor:'white',
    borderTopWidth:1,
    width:width,
    alignItems:'center', 
    paddingVertical:15,
  },
  bottomcontrols: {
    flexDirection:'row', 
    justifyContent:'space-between',
    width:'80%'},
    artworkWrapper:{
      width:300,
      height:340,
      marginBottom:25,
      shadowColor:'#ccc',
      shadowOffset:{
      width:5,
      height:5,
      },
      shadowOpacity:0.5,
      shadowRadius:3.84},
   
    artworkimage:{
      height:'100%',
      width:'100%', 
      borderRadius:15,},
    title:{
      fontSize:18,
      fontWidth:'600',
      textAlign:'center',
      color:'#EEEEEEE',
    },
    artist:{
      fontSize:16,
      fontWeight:'200',
      textAlign:'center',
      color:'#EEEEEEE',
    },
    progressContainer:{
        width:350,
        height:40,
        merginTop:25,
        flexDirection:'row'
    },
    progressLabelContainer:{
      width:340,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    progressLebelText:{
      color:'white',
    },
    musicControls:{
      flexDirection:'row',
      width:'60%',
      justifyContent:'space-between',
      marginTop:15,
    }

})