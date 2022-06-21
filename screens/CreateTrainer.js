import { async } from '@firebase/util';
import React, {useState} from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import firebase from '../database/firebase';

function CreateTrainer(props) {
    const auth = firebase.auth;
    const db = firebase.db;

    const initialState = {
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 'instructor',
    }

    const [state, setState] = useState(initialState);

    const [loading, setLoading] = useState(false)

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const registerAlert = () => {
        Alert.alert("Usuario Registrado Exitosamente", "", [
            {text: 'OK', onPress:()=> {
                props.navigation.navigate('CreateTrainer');
                setState(initialState);
            }},
        ])
    }

    const saveNewUser = async () => {
        if(state.name === '' || state.email === '' || state.password === '' || state.password2 === ''){
            alert('Por favor ubicar datos en todos los campos')
        }
        else{
            if(state.password === state.password2){
                try{
                    setLoading(true);
                    const infoUsuario = await auth
                    .createUserWithEmailAndPassword(state.email, state.password)
                    .then((res) => {
                        res.user.updateProfile({
                            displayName: state.name
                        })
                        return res;
                    });
                    const dbRef = db.collection('users').doc(infoUsuario.user.uid);
                    await dbRef.set({
                        id: auth.currentUser.uid,
                        name: state.name,
                        email: infoUsuario.user.email,
                        role: state.role,
                    });
                    setLoading(false);
                    registerAlert();
                    props.navigation.navigate('CreateTrainer');
                }catch(error){
                    console.log(error);
                }
            } else {
                alert("Las contraseñas no coinciden");
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
                onChangeText={(value) => handleChangeText('email', value)}
                keyboardType={'email-address'}
                autoCapitalize={'none'}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput name='pwd' placeholder='Contraseña' 
                onChangeText={(value) => handleChangeText('password', value)}
                secureTextEntry={true}
                maxLenght={16}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput name="pwd2" placeholder='Validar Contraseña' 
                onChangeText={(value) => handleChangeText('password2', value)}
                secureTextEntry={true}
                maxLenght={16}/>
            </View>
            <View style = {styles.button}>
                <Button title='Crear Entrenador' 
                onPress={() => saveNewUser()}/>
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
    list: {
        padding: 5,
        borderColor: 'grey',
    },
})
export default CreateTrainer