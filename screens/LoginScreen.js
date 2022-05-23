import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native'
import { ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const LoginScreen = (props) =>{

    return(
        <ScrollView style = {styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Nombre de Usuario o Email' />
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Contraseña'
                secureTextEntry={true}
                maxLength={16}/>
            </View>
            <View>
                <Button title='Ingresar' 
                color='#19AC52'
                /*onPress={() => props.navigation.navigate('MainMenu')}*//>
            </View>
            <View>
                <Button title='Registrarse' onPress={() => props.navigation.navigate('CreateUserScreen')}/>
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
