import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { CanconsSongList } from "../ScreenSongs/CanconsSongList";
import { getFontSize } from "../utils"; // Updated import

const CanconsSongsListScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#fe01bf", "#ca30df", "#885ce9"]}
      style={{ flex: 1, paddingBottom: 20 }}
    >
      {/* Header */}
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
          allowFontScaling={false}
          style={{
            fontSize: getFontSize(18),
            color: "#ffffff",
            fontWeight: "500",
            marginLeft: "20%",
            marginTop: 10,
          }}
        >
          Medistoris.cat
        </Text>
      </View>

      {/* Title */}
      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text
          allowFontScaling={false}
          style={{
            color: "white",
            fontSize: getFontSize(18),
            marginLeft: 0,
          }}
        >
          Cançons populars Catalanes
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={CanconsSongList}
        style={{ paddingBottom: 50, flex: 1 }}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={<View style={{ height: 1 }} />}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CanConsSongsPlayScreen", {
                  selectedIndex: index,
                })
              }
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                paddingBottom: 10,
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View style={[styles.imageContainer, styles.shadowProp]}>
                  <Image source={item.artwork} style={styles.image} />
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "white",
                      fontSize: getFontSize(16),
                      width: "100%",
                    }}
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
                      allowFontScaling={false}
                      style={{
                        color: "white",
                        fontSize: getFontSize(16),
                        verticalAlign: "middle",
                      }}
                    >
                      {item.artist}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </LinearGradient>
  );
};

export default CanconsSongsListScreen;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 150,
    height: 150,
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
