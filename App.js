import { StatusBar } from 'expo-status-bar';
import React, { Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard'
import UsersList from './screens/UsersList';
import UserRegister from './screens/UserRegister';
import UserDetailScreen from './screens/UserDetailScreen';
import CreateUser from './screens/CreateUser';
import CompleteUserProfile from './screens/CompleteUserProfile';
import CustomerList from './screens/CustomerList';
import AssignRoutine from './screens/AssignRoutine'
import RoutineView from './screens/RoutineView';


function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="UserRegister" component={UserRegister} options={{title: 'Registro de Usuario', headerTitleAlign: 'center'}}/>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Menú Principal', headerTitleAlign: 'center', headerBackVisible: false, headerLeft: null}}/>
        <Stack.Screen name="UsersList" component={UsersList} options={{title: 'Lista de Usuarios'}}/>
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{title: 'Datos del Usuario'}}/>
        <Stack.Screen name="CreateUser" component={CreateUser} options={{title: 'Crear Usuario', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="CompleteUserProfile" component={CompleteUserProfile} options={{title: 'Editar Perfil', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="CustomerList" component={CustomerList} options={{title: 'Lista de Clientes', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="AssignRoutine" component={AssignRoutine} options={{title: 'Asignar Rutina', headerTitleAlign: 'center'}}/>      
        <Stack.Screen name="RoutineView" component={RoutineView} options={{title: 'Rutinas Asignadas', headerTitleAlign: 'center'}}/>      
      </Stack.Group>
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
