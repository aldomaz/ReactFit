import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, ActivityIndicator , Text} from 'react-native'
import { FAB } from 'react-native-elements'
import firebase from '../database/firebase'

function PremiumInfo(props) {
    
    const initialState = {
        id: '',
        name: '',
        goal: '',
        age: '',
        weight: '',
        height: '',
        routine: '',
    }

    const db = firebase.db;
    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(true)


    const getUserByID = async (id) => {
        const dbRef = db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    }

    const assignRoutine = async () => {
        if(props.route.params.userRole === "premium")
        {
            props.navigation.navigate('PremiumRoutine', {username: user.name});
        }else{
            props.navigation.navigate('NormalRoutine');
        }
    }

    useEffect (() => {
        getUserByID(props.route.params.userId);
    }, [])

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
                <TextInput style = {styles.text}
                placeholder='Name User'
                value={user.name}
                editable={false}/>
            </View> 
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Objetivo</Text>
                <TextInput style = {styles.text}
                placeholder='Goal User' 
                value={user.goal}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Edad</Text>
                <TextInput style = {styles.text}
                placeholder='Goal User' 
                value={user.age}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Peso (kg)</Text>
                <TextInput style = {styles.text}
                placeholder='Goal User' 
                value={user.weight}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Estatura (cm)</Text>
                <TextInput style = {styles.text}
                placeholder='Goal User' 
                value={user.height}
                editable={false}/>
            </View>
            <FAB style = {styles.button}
            visible={true}
            title="Asignar Rutina"
            titleStyle = {{fontSize: 12}}
            color='red'
            upperCase
            onPress={() => assignRoutine()}
            icon={{ name: 'add', color: 'white' }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
    },
    text: {
        color: 'black',
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
    button:{
        padding: 5,
    },
    list: {
        padding: 5,
        borderColor: 'grey',
    },
});

export default PremiumInfo
