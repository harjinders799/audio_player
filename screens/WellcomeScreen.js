import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WellcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);  // Show loading indicator during the check

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userToken) {
        navigation.replace('HomeScreen');  // Navigate to Home if logged in
      } else {
        navigation.replace('Login');  // Navigate to Login if not logged in
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.replace('Login');  // Fallback to Login on error
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  return (
    <LinearGradient colors={['#d9d600', '#760075']} style={styles.gradient}>
      <View style={styles.container}>
        <Image source={require('../images/logo2.webp')} style={styles.logo} />
        <Text style={styles.title}>Cultura Catalana immersiva</Text>

        <TouchableOpacity style={styles.Button} onPress={handlePress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: 'white' }}>Entra</Text>
          )}
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
    marginBottom: 100,
  },
  logo: {
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
  },
  Button: {
    backgroundColor: '#5c10b2',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
    width: 300,
  },
});

export default WellcomeScreen;
