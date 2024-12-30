import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
const HistoriesScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name='heart' size={30}/>
      <Text>HistoriesScreen</Text>
    </View>
  )
}

export default HistoriesScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})