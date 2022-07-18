import React, {useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert, Pressable} from 'react-native'
import { ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../database/firebase'
import { useTogglePasswordVisibility} from '../components/useTogglePasswordVisibility'

function ChangePassword() {

    const initialState = {
        newPwd: '',
        confirmPwd: '',
    }

    const passwordsErrorAlerts = (err) => {
        if (err.code === 'auth/weak-password') {
            Alert.alert("La contraseña debe tener más de 6 caracteres");
            setPassword(initialState);
        } else { 
            Alert.alert(err.message);
            setPassword(initialState);
        }
    }

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [password, setPassword] = useState(initialState)
    const [loading, setLoading] = useState(loading?true:false)

    const handleChangeText = (name, value) => {
        setPassword({...password, [name]: value})
    }
    
    const changePassword = async(newPassword) => {
        if (password.confirmPwd === newPassword){
            setLoading(true);
            const user = firebase.auth.currentUser;
            await user.updatePassword(newPassword).then(() => {
                alert('Contraseña Actualizada');
                setPassword(initialState);
                setLoading(false);
            }).catch((error) => { 
                setLoading(false);
                console.log(error.code);
                passwordsErrorAlerts(error);});
        } else {
            alert('Las contraseñas no coinciden');
            setPassword({
                newPwd: '',
                confirmPwd: '',
            })
        }
    }

     if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }
    return (
    <ScrollView style = {styles.container}>
        <View style = {styles.inputGroup}>
            <TextInput 
            style = {styles.inputField}
            placeholder='Contraseña Nueva' 
            value={password.newPwd}
            secureTextEntry={passwordVisibility}
            maxLength={16}
            enablesReturnKeyAutomatically
            onChangeText={(value) => handleChangeText('newPwd', value)}/>
            <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons name={rightIcon} size={18} color="#232323" />
            </Pressable>
        </View>
        <View style = {styles.inputGroup}>
            <TextInput 
            style = {styles.inputField}
            placeholder='Confirmar Contraseña' 
            value={password.confirmPwd}
            secureTextEntry={passwordVisibility}
            maxLength={16}
            onChangeText={(value) => handleChangeText('confirmPwd', value)}/>
            <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons name={rightIcon} size={18} color="#232323" />
            </Pressable>
        </View>
        <View style = {styles.button}>
            <Button color='limegreen' title='Cambiar Contraseña' 
            onPress={() => changePassword(password.newPwd)}/>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
    },
    title:{
        padding: 2,
        color: 'gray',
        fontSize: 10,
    },
    inputGroup: {
        margin: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        padding: 2,
        width: '90%'
    },
    button: {
        padding: 10,
        margin: 10,
    },
});

export default ChangePassword