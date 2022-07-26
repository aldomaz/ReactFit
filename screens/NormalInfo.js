import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator , Text} from 'react-native'
import firebase from '../database/firebase'
import {Picker} from '@react-native-picker/picker';

function NormalInfo(props) {
    
    const initialState = {
        id: '',
        name: '',
        goal: '',
        routine: '',
    }

    const db = firebase.db;
    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(true)

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

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

    const assignAlert = () => {
        Alert.alert("Rutina Asignada Exitosamente", "", [
            {text: 'OK', onPress:()=>props.navigation.navigate('NormalList')},
        ])
    }

    const saveRoutine = async () => {
        try{
            setLoading(true);
            db.collection('users').doc(user.id).collection('routines').add({
                routine: user.routine,
            });
            setLoading(false);
            assignAlert();
        }catch(error){
            console.log(error);
        }
    }

    useEffect (() => {
        getUserByID(props.route.params.userId);
        console.log(props.route.params.userRole);
    }, [])

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
            <View style = {styles.list}>
                <Picker
                selectedValue={user.routine}
                onValueChange={(itemValue) => {
                    handleChangeText('routine', itemValue);
                    }}>
                    <Picker.Item label="Rutina Bajar Peso" value={"Rutina Bajar Peso"}/>
                    <Picker.Item label="Rutina Ganar Musculo" value={"Rutina Ganar Musculo"}/>
                    <Picker.Item label="Rutina Resistencia" value={"Rutina Resistencia"}/>
                </Picker>
            </View>
            <View style = {styles.button}>
                <Button title='Asignar' 
                color='red'
                onPress={() => saveRoutine()}/>
            </View>
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
    loading: {
        marginTop: 300,
    },
});

export default NormalInfo
