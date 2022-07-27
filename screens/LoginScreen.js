import React, { useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Pressable , Alert, Text, Image , ActivityIndicator , TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../database/firebase'
import { useTogglePasswordVisibility} from '../components/useTogglePasswordVisibility'
import * as Analytics from 'expo-firebase-analytics';

const LoginScreen = (props) => {

    const initialState = {
        email: '',
        password: ''
    };

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false)

    const handleChangeText = (email, value) => {
        setState({ ...state, [email]: value })
    }

    const loginErrorAlerts = (err) => {
        if (err === 'auth/user-not-found' || err === 'auth/invalid-email') {
            Alert.alert("Email incorrecto o usuario no existente");
            setState(initialState);
        } else { 
            if (err === 'auth/wrong-password'){
                Alert.alert("Contraseña incorrecta");
                setState({
                    email: state.email,
                    password: '',
                });
            }else{
                Alert.alert(err.message);
                setState(initialState);
            }
        }
    }

    const userLogin = async () => {
        if (state.email === '' || state.password === '') {
            Alert.alert('Ubique los datos para ingresar');
        } else {
            setLoading(true);
            await firebase.auth
                .signInWithEmailAndPassword(state.email, state.password)
                .then((auth) => {
                    setLoading(false);
                    setState(initialState);
                    Analytics.logEvent( "login" , {
                        method: auth.user.email
                      });
                    props.navigation.navigate("Dashboard");
                })
                .catch(error => {
                    console.log(error.code);
                    setLoading(false);
                    loginErrorAlerts(error.code);
                });
        }
    }

    if (loading) {
        return (
            <ScrollView backgroundColor='black'>
                <View>
                    <ActivityIndicator 
                    style={styles.loading}
                    size='large' color="red" />
                    <Text style={{fontSize: 12, alignSelf: 'center', color: 'white'}}>Cargando...</Text>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container} 
        backgroundColor={'black'}>
            <View>
                <Image style={styles.image} 
                source={require('react-native-firebase/resources/logo.png')}/>
            </View>
            <View>
                <Text style={styles.title}>ReactFit</Text>
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.inputField}  
                    placeholder='Email'
                    value={state.email}
                    onChangeText={(value) => handleChangeText('email', value)}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    maxLength={50}/>
                    <MaterialCommunityIcons name={'mail'} size={18} color="#232323" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.inputField} 
                    placeholder='Contraseña'
                    secureTextEntry={passwordVisibility}
                    maxLength={16}
                    onChangeText={(value) => handleChangeText('password', value)}/>
                <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={18} color="#232323" />
                </Pressable>
            </View>
            <TouchableOpacity style={styles.appButtonContainer}
            onPress={() => userLogin()}>
                <Text style={styles.appButtonText}>Ingresar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignSelf: 'auto',
    },
    image: {
        width: 200,
        height: 200,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    appButtonContainer: {
        marginTop: 15,
        marginHorizontal: 8,
        padding: 12,
        backgroundColor: "red",
        borderRadius: 18,
      },
    appButtonText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
    inputField: {
        padding: 2,
        width: '90%',
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        padding: 15,
        margin: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    loading: {
        marginTop: 300,
    },
});

export default LoginScreen