import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AllsongsList } from "../ScreenSongs/AllSongs";

const TotalSongsScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#b88c08", "#60045f"]}
      style={{ flex: 1, paddingBottom: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS === "ios" ? 50 : 50,
          paddingHorizontal: 10,
          borderBottomWidth: 0.2,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../images/back-white.webp")}
            style={{ height: 50, width: 50, marginRight: 6 }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "500",
            marginLeft: "20%",
            marginTop: 10,
          }}
        >
          Medistoris.cat
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text style={{ color: "white", fontSize: 24, marginLeft: 5 }}>
          Àudios
        </Text>
      </View>

      {AllsongsList.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
          }}
        onPress={()=>navigation.navigate('allSongPlayScreen')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image source={item.artwork} style={styles.image} />
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text
                style={{ color: "white", fontSize: 15, width: "100%" }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    verticalAlign: "middle",
                  }}
                >
                  {item.artist}
                </Text>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    height: 100,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 2,
  },
});

export default TotalSongsScreen;
