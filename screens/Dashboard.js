import { async } from '@firebase/util';
import React , {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import AdminView from '../views/AdminView';
import ClientView from '../views/ClientView';

function Dashboard(props) {

    const [user, setUser] = useState({
        id: '',
        email: '',
        userRole: '',
    });

    const getRol = async (uid) => {
        const docuRef = firebase.db.collection('users').doc(uid);
        const docuCifrada = await  docuRef.get();
        const infoUsuario = docuCifrada.data().role;
        return infoUsuario;
    }

    const setUserWithDbAndRol = () =>{
        if (user.userRole === '') {
            getRol(firebase.auth.currentUser.uid).then((rol) => {
                const userData = {
                    id: firebase.auth.currentUser.uid,
                    email: firebase.auth.currentUser.email,
                    userRole: rol,
                };
                setUser(userData);
                console.log("userData final", userData);
            });
        }
    }
    
    useEffect (() => {
        setUserWithDbAndRol();
    })

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <View>
            {user.userRole === 'admin' ? <AdminView/> : <ClientView/>}
            <Button title = 'Cerrar Sesión'
            onPress={() => SignOut()}> 
            </Button>
        </View>
    )
}

export default Dashboard