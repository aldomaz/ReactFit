import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'

const UserRegister = (props) => {
    
    const auth = firebase.auth;
    const db = firebase.db;

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: '',
    });

    const [loading, setLoading] = useState(false)

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const registerAlert = () => {
        Alert.alert("Usuario Registrado Exitosamente", "", [
            {text: 'OK', onPress:()=>props.navigation.navigate('LoginScreen')},
        ]);
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
                        role: 'cliente',
                    });
                    setLoading(false);
                    registerAlert('');
                    props.navigation.navigate('LoginScreen');
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
    },
    loading: {
        marginTop: 300,
    },
})

export default UserRegister