/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  width
} from "react-native";
import Checkbox from "@react-native-community/checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";



const SignupScreen = ({ navigation, route }) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: "black",
            }}
          >
            Registra't
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Nom d'usuari"
              placeholderTextColor={"black"}
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Correu Electrònic"
              placeholderTextColor={"black"}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>




        <View style={{ marginBottom: 12, marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Contrasenya"
              placeholderTextColor={"black"}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              <Ionicons
            name={isPasswordShown ? "eye-off" : "eye"}
            size={24}
            color={"black"}
          />
            </TouchableOpacity>
          </View>
        </View>







        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginRight: 5, transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "red" : undefined}
            
          />

          <Text
            style={{ width: 350 }}
            onPress={() =>
              navigation.navigate("PrivacyScreen", { isChecked: isChecked })
            }
          >
            En fer clic a Registre, accepteu els nostres termes, privadesa i
            política i acord d'usuari
          </Text>
        </View>





        <TouchableOpacity
      style={{
        backgroundColor: '#5c10b2',
        borderRadius: 8,
        paddingVertical: 13,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
      }}
     >
     <Text style={{color:"white"}}>Registra't</Text>
    </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>O registra't amb</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "grey",
              marginHorizontal: 10,
            }}
          />
        </View>

    

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
        
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: "grey",
                marginRight: 4,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
                  }}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  marginLeft: 16,
                  fontWeight: "400",
                }}
              >
                Entra amb google
              </Text>
            </TouchableOpacity>
         

        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            Si tens un compte
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: "#007260",
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Inicia sessió
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;
