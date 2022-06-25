import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert , Text} from 'react-native'
import { ActivityIndicator } from 'react-native'
import firebase from '../database/firebase'

function CompleteUserProfile(props) {
    const initialState = {
        id: '',
        name: '',
        goal: '',
        dateBirth: '',
        age: '',
        job: '',
        physicalActivity: "",
    }

    const auth = firebase.auth;
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
        getUserByID(auth.currentUser.uid);
    }, [])

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.update({
            name: user.name,
            goal: user.goal,
            age: user.age,
            job: user.job,
        })
        setUser(initialState);
        props.navigation.navigate('Dashboard');
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
                <Text style = {styles.title}>Nombre</Text>
                <TextInput 
                placeholder='Name User'
                value={user.name}
                onChangeText={(value) => handleChangeText('name', value)} />
            </View> 
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Objetivo</Text>
                <TextInput 
                value={user.goal}
                onChangeText={(value) => handleChangeText('goal', value)} />
            </View> 
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Edad</Text>
                <TextInput 
                value={user.age}
                keyboardType={'number-pad'}
                onChangeText={(value) => handleChangeText('age', value)} />
            </View> 
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Ocupacion</Text>
                <TextInput 
                value={user.job}
                onChangeText={(value) => handleChangeText('job', value)} />
            </View> 
            <View>
                <Button color='red' title='Guardar Información' onPress={() => updateUser()}/>
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
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc',
    },
});

export default CompleteUserProfile