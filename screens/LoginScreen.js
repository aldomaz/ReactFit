import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native'
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
            .catch(error => setState({ errorMessage: error.message}))
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
        <ScrollView style = {styles.container}>
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
                color='#19AC52'
                onPress={() => userLogin()}/>
            </View>
            <View style = {styles.button}>
                <Button title='Registrarse' onPress={() => props.navigation.navigate('UserRegister')}/>
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
        padding: 5,
    },
});

export default LoginScreen
