/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const WellcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#d9d600', '#760075']}   style={styles.gradient}>
    <View style={styles.container}>
    <Image source={require('../images/logo2.webp')} style={styles.logo} />
    <Text style={styles.title}>Cultura Catalana immersiva</Text>
    <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("Login")}>
        <Text style={{color:'white'}}>Entra</Text>
    </TouchableOpacity>
    </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 50,
  },
  Button:{
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width:300,
  }
});

export default WellcomeScreen;
