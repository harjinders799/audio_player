/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */

import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
 
  




const onDeleteAccount = () => {
  Alert.alert(
    'Eliminar compte',
    'Estàs segur que vols eliminar el teu compte permanentment?',
    [
      {
        text: 'Cancel·lar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const user = auth().currentUser;
            if (user) {
              await user.delete();
              Alert.alert('Compte eliminat', 'El teu compte ha estat eliminat correctament.');
              // Optionally, navigate to login screen after deletion
              navigation.replace('Login');
            }
          } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
              Alert.alert(
                'Error',
                'Per eliminar el compte, torna a iniciar sessió i prova-ho de nou.'
              );
              // Re-authentication logic can go here if needed
            } else {
              Alert.alert('Error', 'No s\'ha pogut eliminar el compte. Torna-ho a provar.');
            }
          }
        },
      },
    ],
    { cancelable: false }
  );
};




  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={styles.container}>
    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={"transparent"} barStyle='light-content' />
                  
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, color: "#ffffff", fontWeight: "500" }}>
            Medistoris.cat
          </Text>
        
        
        
          <Pressable onPress={ ()=> navigation.navigate('ProfileScreen') }   >
              <Ionicons name='person-circle-outline' size={40} color='white'/>
          </Pressable>   



        </View>
        




        {/* <View style={{ alignItems: 'flex-end', marginTop: 10,marginRight:10, }}>
            <Pressable onPress={onDeleteAccount}>
              <Text style={{ fontSize: 16, color: "#ff4d4d", fontWeight: "500" }}>
                Eliminar compte
              </Text>
            </Pressable> 
        </View> */}








        <View style={styles.logoContainer}>
          <Image source={require("../images/logo-medi.webp")} style={styles.logoImg} resizeMode={"contain"}/>
        </View>


        <View style={styles.boxContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate("HistoriesSongsListScreen")} activeOpacity={0.6} style={[styles.box, { backgroundColor: "#ba7900" }]}>
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image source={require("../images/Mataro_foto.webp")}  style={styles.image}/>
            </View>
            <View>
              <Text style={styles.boxText}>Històries immersives</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
              </View>
            </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate("LegendsSongsListScreen")}
            activeOpacity={0.6}
            style={[styles.box, { backgroundColor: "#bd008a" }]}>
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image source={require("../images/timbaler4.webp")} style={styles.image}/>
            </View>
            <View>
              <Text style={styles.boxText}>Llegendes immersives</Text>
            </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate("DitesSongsListScreen")}  activeOpacity={0.6} style={[styles.box, { backgroundColor: "#001d9a" }]}  >
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image source={require("../images/Dites.jpeg")}  style={styles.image} />
            </View>
            <Text style={styles.boxText}>Dites</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate("CanconsSongsListScreen")} activeOpacity={0.6} style={[styles.box, { backgroundColor: "#8d00b4" }]}>
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image source={require("../images/ocells.webp")} style={styles.image}/>
            </View>
            <Text style={styles.boxText}>Cançons populars Catalanes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("AllSongsListScreen")}>
            <View style={styles.totalButton}>
              <Text style={styles.totalBtnText}>
                Escolta tots els àudios
              </Text>
            </View>
          </TouchableOpacity>
        </View>

    
    </SafeAreaView>
    </LinearGradient>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",

  },
  logoImg: {
    width: 260,  
    height: 100,
    marginTop:10,
  },
  totalContainer: {
    marginTop: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  totalButton: {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bf00a8",
    borderRadius: 5,
  },
  totalBtnText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  playPauseBtn: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#8d13b3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    right: 10,
    bottom: 10,
  },
  playPauseImg: {
    flex: 1,
    position: "absolute",
    width: 30,
    height: 30,
  },
  boxContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  box: {
    flex: 1,
    backgroundColor: "blue", 
    marginHorizontal: 0, 
    marginVertical: 5, 
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1, 
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  boxText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 3,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 100,
  },
});
export default HomeScreen;
