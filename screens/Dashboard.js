import { async } from '@firebase/util';
import React , {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import AdminView from '../views/AdminView';
import ClientView from '../views/ClientView';

function Dashboard(props) {

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <View>
            <Button title = 'Cerrar Sesión'
            onPress={() => SignOut()}> 
            </Button>
        </View>
    )
}

export default Dashboard