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
                console.log(res);
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
                <TextInput placeholder='Nombre de Usuario o Email' 
                onChangeText={(value) => handleChangeText('email', value)}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Contraseña'
                secureTextEntry={true}
                maxLength={16}
                onChangeText={(value) => handleChangeText('password', value)}/>
            </View>
            <View>
                <Button title='Ingresar' 
                color='#19AC52'
                onPress={() => userLogin()}/>
            </View>
            <View>
                <Button title='Registrarse' onPress={() => props.navigation.navigate('UserRegister')}/>
            </View>
        </ScrollView>
    )
}  
    
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc',
    },
});

export default LoginScreen
