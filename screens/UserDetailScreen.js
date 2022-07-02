import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native'
import { ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

const UserDetailScreen = (props) =>{
    
    const initialState = {
        id: '',
        name: '',
        email: '',
        role: '',
    }

    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(loading?true:false)

    const getUserByID = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    }

    useEffect (() => {
        getUserByID(props.route.params.userId);
    }, [])

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

    const deleteUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        if(user.role === 'instructor'){
            setUser(initialState);
            props.navigation.navigate('UsersList');
        }else{
            setUser(initialState);
            props.navigation.navigate('ClientList');
        }
    }

    const updateUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
            role: user.role,
        })
        if(user.role === 'instructor'){
            setUser(initialState);
            props.navigation.navigate('UsersList');
        }else{
            setUser(initialState);
            props.navigation.navigate('ClientList');
        }
    }

    const openConfirmationAlert = () => {
        Alert.alert("Eliminar Usuario", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => deleteUser()},
            {text: 'No', onPress: () => console.log('false')},
        ])
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
                <TextInput 
                placeholder='Name User'
                value={user.name}
                onChangeText={(value) => handleChangeText('name', value)} />
            </View> 
            <View style = {styles.inputGroup}>
                <TextInput 
                placeholder='Email User' 
                value={user.email}
                onChangeText={(value) => handleChangeText('email', value)}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput 
                placeholder='Rol User' 
                value={user.role}
                onChangeText={(value) => handleChangeText('role', value)}/>
            </View>
            <View style = {styles.button}>
                <Button color='red' title='Update User' onPress={() => updateUser()}/>
            </View>
            <View style = {styles.button}>
                <Button color='red' title='Delete User' onPress={() => openConfirmationAlert()}/>
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
        margin:15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc',
    },
    button: {
        margin: 10,
    },
});

export default UserDetailScreen