import React from 'react';
import { StyleSheet , StatusBar } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard'

import UserRegister from './screens/UserRegister';
import UserDetailScreen from './screens/UserDetailScreen';
import CreateUser from './screens/CreateUser';
import CompleteUserProfile from './screens/CompleteUserProfile';
import PremiumInfo from './screens/PremiumInfo'
import RoutineView from './screens/RoutineView';
import CreateTrainer from './screens/CreateTrainer'

import PremiumList from './screens/lists/PremiumList';
import TrainerList from './screens/lists/TrainerList';
import ClientList from './screens/lists/ClientList';
import NormalList from './screens/lists/NormalList';

import PremiumRoutine from './screens/PremiumRoutine';
import NormalRoutine from './screens/NormalRoutine';
import ModifyExercise from './screens/ModifyExercise';
import ExerciseView from './screens/ExerciseView';
import NormalExerciseView from './screens/NormalExerciseView';

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
        <Stack.Screen name="TrainerList" component={TrainerList} options={{ title: 'Entrenadores', headerTitleAlign: 'center' , 
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
        <Stack.Screen name="PremiumList" component={PremiumList} options={{ title: 'Clientes Premium', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="NormalList" component={NormalList} options={{ title: 'Clientes Normales', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="PremiumInfo" component={PremiumInfo} options={{ title: 'Información Cliente', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}} />
        <Stack.Screen name="PremiumRoutine" component={PremiumRoutine} options={{ title: 'Asignar Rutina Premium', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerBackVisible: false, 
          headerLeft: null, 
          headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="NormalRoutine" component={NormalRoutine} options={{ title: 'Asignar Rutina Normal', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerBackVisible: false, 
          headerLeft: null, 
          headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="ExerciseView" component={ExerciseView} options={{ title: 'Ejercicio Asignado', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="NormalExerciseView" component={NormalExerciseView} options={{ title: 'Ejercicio Asignado', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}}/>
        <Stack.Screen name="ModifyExercise" component={ModifyExercise} options={{ title: 'Modificar Ejercicio', headerTitleAlign: 'center' ,
          headerTitleStyle:{color:'white'},
          headerTintColor:'white',
          headerStyle:{backgroundColor: 'black'}}}/>
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
