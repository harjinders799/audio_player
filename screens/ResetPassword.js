import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import COLORS from '../../src/constants/colors';
//import Button from '../../src/components/Button';
//import {resetEmailRequest} from '../../src/services/firebase';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <View style={styles.container}>
        <Text style={styles.title}>Restablir Contrasenya</Text>
        <Text style={styles.description}>
         Introdueix el teu correu electrònic i rebràs instruccions 
         per restablir la contrasenya.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
          />
        </View>

        <Button
          title="Continuar"
          filled
          isLoading={loading}
          //onPress={handleResetPassword}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    marginTop: 20,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
});

export default ResetPassword;
