import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import LoginScreen from './screens/LoginScreen';
import UsersList from './screens/UsersList';
import UserRegister from './screens/UserRegister';
import UserDetailScreen from './screens/UserDetailScreen';

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login', headerTitleAlign: 'center'}}/>
      <Stack.Screen name="UsersList" component={UsersList} options={{title: 'Users List'}}/>
      <Stack.Screen name="UserRegister" component={UserRegister} options={{title: 'Registro de Usuario', headerTitleAlign: 'center'}}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{title: 'User Detail'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
  <NavigationContainer>
    <MyStack/>
  </NavigationContainer>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
