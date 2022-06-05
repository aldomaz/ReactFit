import { async } from '@firebase/util';
import React from 'react';
import firebase from '../database/firebase';
import { View , Text} from 'react-native';
import { Button } from 'react-native-elements';
import UsersList from '../screens/UsersList'

function AdminView(props) {
    
    return (
        <View>
            <Text>Bienvenido Admin</Text>
            <Button title = 'Lista de Usuarios'
            color='#19AC52'
            onPress={() => props.navigation.navigate('UsersList')}> 
            </Button>
        </View>
    )
}

export default AdminView