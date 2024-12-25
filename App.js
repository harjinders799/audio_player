import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WellcomeScreen from './screens/WellcomeScreen';
import SignupScreen from './screens/SignupScreen';
import ResetPassword from './screens/ResetPassword';
import HomeScreen from './screens/HomeScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import HistoriesScreen from './screens/HistoriesScreen';
import LegendsScreens from './screens/LegendsScreens';
import DitesScreen from './screens/DitesScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">
        <Stack.Screen name="Wellcome" component={WellcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HistoriesScreen" component={HistoriesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LegendsScreen" component={LegendsScreens} options={{ headerShown: false }}    />
        <Stack.Screen name="DitesScreen" component={DitesScreen} options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
