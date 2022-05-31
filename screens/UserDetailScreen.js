import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native'
import { ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'
import UsersList from './UsersList'

const UserDetailScreen = (props) =>{
    
    const initialState = {
        id: '',
        name: '',
        email: '',
    }

    const [user, setUser] = useState(initialState)

    const [loading, setLoading] = useState(true)

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
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('UsersList');
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
        })
        setUser(initialState);
        props.navigation.navigate('UsersList');
    }

    const openConfirmationAlert = async () => {
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
            
            <View>
                <Button color='#19AC52' title='Update User' onPress={() => updateUser()}/>
            </View>
            <View>
                <Button color='#E37399' title='Delete User' onPress={() => openConfirmationAlert()}/>
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

export default UserDetailScreen