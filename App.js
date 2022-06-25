import React from 'react';
import { StyleSheet , StatusBar } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
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
import CreateTrainer from './screens/CreateTrainer'
import ClientList from './screens/ClientList';


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '', headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="UserRegister" component={UserRegister} options={{ title: 'Registro de Usuario', headerTitleAlign: 'center' }} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ 
          title: 'Menú Principal', 
          headerTitleAlign: 'center', 
          headerBackVisible: false, 
          headerLeft: null, 
          headerTitleStyle:{color:'white'} , 
          headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Entrenadores', headerTitleAlign: 'center' , 
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="ClientList" component={ClientList} options={{ title: 'Clientes', headerTitleAlign: 'center',
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'Datos del Usuario', headerTitleAlign: 'center',
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'} }}/>
        <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Crear Usuario', headerTitleAlign: 'center',
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="CreateTrainer" component={CreateTrainer} options={{ title: 'Crear Entrenador', headerTitleAlign: 'center', 
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="CompleteUserProfile" component={CompleteUserProfile} options={{ title: 'Editar Perfil', headerTitleAlign: 'center',
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="CustomerList" component={CustomerList} options={{ title: 'Lista de Clientes', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="AssignRoutine" component={AssignRoutine} options={{ title: 'Asignar Rutina', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="RoutineView" component={RoutineView} options={{ title: 'Rutinas Asignadas', headerTitleAlign: 'center',
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'} }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar barStyle = "light-content" hidden = {false} translucent = {true}/>
        <MyStack />
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
