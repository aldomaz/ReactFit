import { async } from '@firebase/util';
import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserRegister = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const registerAlert = () => {
        Alert.alert("Usuario Registrado Exitosamente", "", [
            {text: 'OK', onPress:()=>props.navigation.navigate('LoginScreen')},
        ])
    }

    const saveNewUser = async () => {
        if(state.name === ''){
            alert('Por favor ubicar datos en todos los campos')
        }
        else{
            try{
                setLoading(true);
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    password: state.password
                })
                setLoading(false);
                registerAlert();
            }catch(error){
                console.log(error);
            }
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
                <TextInput placeholder='Nombre de Usuario' 
                onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Email' 
                onChangeText={(value) => handleChangeText('email', value)}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Contraseña' 
                onChangeText={(value) => handleChangeText('password', value)}
                secureTextEntry={true}
                maxLenght={15}/>
            </View>
            <View>
                <Button title='Registrarse' 
                onPress={() => saveNewUser()}/>
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
        borderBottomColor: '#cccccc'
    }
})

export default UserRegister