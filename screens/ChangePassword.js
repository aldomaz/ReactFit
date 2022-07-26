import React, {useState} from 'react'
import {View, Text , StyleSheet, TextInput, ScrollView, Alert, Pressable , ActivityIndicator} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FAB }from 'react-native-elements'
import firebase from '../database/firebase'
import { useTogglePasswordVisibility } from '../components/useTogglePasswordVisibility'

function ChangePassword(props) {

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
            <ScrollView backgroundColor='black'>
                <View>
                    <ActivityIndicator 
                    style={styles.loading}
                    size='large' color="red" />
                </View>
            </ScrollView>
        );
    }
    return (
    <ScrollView style = {styles.container}>
        <Pressable style={styles.icon}>
            <MaterialCommunityIcons name={'lock-check'} 
            size={130} 
            color="red"/>
        </Pressable>
        <Text style = {styles.title}>Contraseña Nueva</Text>
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
        <Text style = {styles.title}>Validar Contraseña</Text>
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
        <FAB style = {styles.button}
            visible={true}
            title="Actualizar Contraseña"
            titleStyle = {styles.titleButton}
            color='red'
            upperCase
            onPress={() => changePassword(password.newPwd)}
            icon={{ name: 'update', color: 'white' , size: 20}}
        />
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignSelf: 'auto',
        backgroundColor: 'black',
    },
    title:{
        paddingLeft: 10,
        marginTop: 6,
        color: 'lightgray',
        fontSize: 10,
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'red',
        padding: 10,
        fontSize: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        padding: 2,
        width: '90%'
    },
    button:{
        margin: 30,
        width: '90%',
        alignSelf: 'center',
    },
    titleButton:{
        fontSize: 14,
        fontWeight: 'bold',
        width: '80%'
    },
    icon:{
        padding: 25,
        alignItems: 'center',
        opacity: 0.8,
    },
    loading: {
        marginTop: 300,
    },
});

export default ChangePassword