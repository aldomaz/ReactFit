import { async } from '@firebase/util';
import React , {Children, useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { View , ActivityIndicator, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import AdminView from '../views/AdminView';
import ClientView from '../views/ClientView';
import InstructorView from '../views/InstructorView';

function Dashboard(props) {

    const [loading, setLoading] = useState(false)

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
                setLoading(false);
            });
        }
    }
    
    useEffect (() => {
        setUserWithDbAndRol();
    })


    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }


    return (
        <View style={styles.button}>
            {user.userRole === 'admin' ? <AdminView navigation={props.navigation}/> : (user.userRole === 'cliente' ? <ClientView navigation={props.navigation}/> : (user.userRole !== '' ? <InstructorView navigation={props.navigation}
            /> : setLoading(true)))}
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        margin: 10,
        padding: 5,
    },
});

export default Dashboard