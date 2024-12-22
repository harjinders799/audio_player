/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */

import React,{useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = ({navigation}) => {

  const [isPasswordShown, setIsPasswordShown] = useState(false);


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, marginHorizontal: 22,}}>
        <View style={{marginVertical: 22,}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: 'black',
            }}>
            Inicia sessió
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: 'black',
            }}>
            Ens alegrem de tornar-te a veure 👋
          </Text>
        </View>

        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Correu Electrònic"
              //placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              //value={email}
              //onChangeText={(text) => setEmail(text.toLowerCase())}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>








        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Contrasenya"
              //placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown == false ? (
              <Ionicons name="eye-off" size={40} color={"red"} />
            ) : (
              <Ionicons name="eye" size={40} color={"blue"} />
            )}
            </TouchableOpacity>
          </View>

        </View>



       
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
           <TouchableOpacity onPress={()=> navigation.navigate("ResetPassword")}>
            <Text
              style={{
                fontSize: 19,
                color: '#007260',
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Restablir la contrasenya
            </Text>
            </TouchableOpacity>
        </View>







    <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <TouchableOpacity style={styles.Button} onPress={()=>navigation.navigate("HomeScreen")} >
                    <Text style={{color:'white'}}>Inicia sessió</Text>
                </TouchableOpacity>
    </View>
       







        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}
          />
          <Text style={{fontSize: 14}}>O inicia sessió amb</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}
          />
        </View>



        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: 'black',
              marginRight: 4,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
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
                color: 'black',
                marginLeft: 16,
                fontWeight: '400',
              }}>
              Entra amb google
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{fontSize: 16, color: 'black'}}>No tens compte</Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: '#007260',
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Crea compte
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Button:{
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width:350,
    marginTop: 18,
    marginBottom: 4,
   
  },
});
export default LoginScreen;
