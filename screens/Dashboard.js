import { async } from '@firebase/util';
import React from 'react'
import firebase from '../database/firebase'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

function Dashboard(props) {

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <View>
            <Button title = 'Lista de Usuarios'
            color='#19AC52'
            onPress={() => props.navigation.navigate('UsersList')}> 
            </Button>
            <Button title = 'Cerrar Sesión'
            onPress={() => SignOut()}> 
            </Button>
        </View>
    )
}

export default Dashboard