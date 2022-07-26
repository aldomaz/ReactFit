import React, {useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert, Pressable} from 'react-native';
import firebase from '../database/firebase';
import {Picker} from '@react-native-picker/picker';
import { useTogglePasswordVisibility} from '../components/useTogglePasswordVisibility'

function CreateUser(props) {
    const auth = firebase.auth;
    const db = firebase.db;
    const initialState = {
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 'premium',
    }

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [state, setState] = useState(initialState);

    const [loading, setLoading] = useState(false)

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value});
    }

    const registerAlert = () => {
        Alert.alert("Usuario Registrado Exitosamente", "", [
            {text: 'OK', onPress:()=> {
                props.navigation.navigate('CreateUser');
                setState(initialState);
            }},
        ])
    }

    const errorAlert = (err) => {
        if (err === 'auth/email-already-in-use')
        {
            alert("Existe una cuenta con el email ya registrado");
        }else{
            if (err === 'auth/weak-password')
            {
                alert("La contraseña debe tener más de 6 caracteres");
            } else {
                alert("Correo no válido");
            }
        }
        setLoading(false);
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
                    props.navigation.navigate('CreateUser');
                }catch(error){
                    errorAlert(error.code);
                }
            } else {
                alert("Las contraseñas no coinciden");
            } 
        }
    }

    if (loading){
        return(
            <ScrollView backgroundColor='black'>
                <View>
                    <ActivityIndicator 
                    style={styles.loading}
                    size='large' color="red" />
                </View>
            </ScrollView>
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
                <TextInput style = {styles.inputField}
                name='pwd' 
                placeholder='Contraseña' 
                onChangeText={(value) => handleChangeText('password', value)}
                secureTextEntry={passwordVisibility}
                maxLenght={16}/>
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={18} color="#232323" />
                </Pressable>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput style = {styles.inputField}
                name="pwd2" 
                placeholder='Validar Contraseña' 
                onChangeText={(value) => handleChangeText('password2', value)}
                secureTextEntry={passwordVisibility}
                maxLenght={16}/>
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={18} color="#232323" />
                </Pressable>
            </View>
            <View style = {styles.list}>  
                <Picker
                selectedValue={state.role}
                onValueChange={(itemValue) => {
                    handleChangeText('role', itemValue);
                    }}>
                    <Picker.Item label="Cliente Premium" value={"premium"}/>
                    <Picker.Item label="Cliente Normal" value={"normal"}/>
                </Picker>
            </View>
            <View style = {styles.button}>
                <Button title='Crear Usuario'
                color={'red'} 
                onPress={() => saveNewUser()}/>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        padding: 2,
        width: '90%'
    },
    button: {
        margin: 10,
    },
    text: {
        alignSelf: 'center',
        fontSize: 30,
        padding: 15,
        margin: 20,
        color: 'white',
    },
    loading: {
        marginTop: 300,
    },
})

export default CreateUser