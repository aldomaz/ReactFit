import React, {useEffect, useState} from 'react'
import { async } from '@firebase/util';
import {View, StyleSheet, TextInput, ScrollView, Button, Alert, Text , Image} from 'react-native'
import { ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const LoginScreen = (props) =>{

    const [state, setState] = useState({
        email: '',
        password: ''
    });
    
    const handleChangeText = (email, value) => {
        setState({...state, [email]: value})
    }

    const [loading, setLoading] = useState(false)

    const loginErrorAlerts = (err) => {
        if (err === 'auth/user-not-found')
        {
            Alert.alert("Email incorrecto o usuario no existente");
        } else {
            Alert.alert("Contraseña incorrecta");
        }
        setLoading(false);
    }

    const userLogin = () => {
        if(state.email === '' || state.password === ''){
            Alert.alert('Ubique los datos para ingresar');
        }else{
            setLoading(true);
            firebase.auth
            .signInWithEmailAndPassword(state.email, state.password)
            .then((res) => {

                setLoading(false);
                props.navigation.navigate("Dashboard");
            })
            .catch(error => loginErrorAlerts(error.code));
        }
    }

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }

    return(
        <ScrollView style = {styles.container} backgroundColor = {'black'}>
            <View >
                <Image style = {styles.image} source = {require('react-native-firebase/resources/logo.png')}/>
            </View>
            <View>
                <Text style = {styles.text}>ReactFit</Text>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Email' 
                onChangeText={(value) => handleChangeText('email', value)}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                maxLength={50}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Contraseña'
                secureTextEntry={true}
                maxLength={16}
                onChangeText={(value) => handleChangeText('password', value)}/>
            </View>
            <View style = {styles.button}>
                <Button title='Ingresar' 
                color='red'
                onPress={() => userLogin()}/>
            </View>
        </ScrollView>
    )
}  
    
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
        alignSelf: 'auto',
    },
    image:{
        width: 160,
        height: 160,
        resizeMode: 'stretch',
        alignSelf: 'center',
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
    },
    button:{
        margin: 10,
    },
    text:{
        alignSelf: 'center',
        fontSize: 30,
        padding: 15,
        margin: 20,
        color: 'white',
    },
});

export default LoginScreen