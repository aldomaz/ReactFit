import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, StyleSheet, TextInput, ScrollView, ActivityIndicator , Pressable , Text} from 'react-native'
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
            props.navigation.navigate('PremiumRoutine', {username: user.id});
        }else{
            props.navigation.navigate('NormalRoutine');
        }
    }

    useEffect (() => {
        getUserByID(props.route.params.userId);
    }, [])

    if (loading){
        return(
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
        <ScrollView style = {styles.container}>
            <Pressable style={styles.icon}>
                <MaterialCommunityIcons name={'account-details'} 
                size={130} 
                color="red"/>
            </Pressable>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Nombre</Text>
                <TextInput style = {styles.text}
                placeholderTextColor='gray'
                placeholder='No registrado'
                value={user.name}
                editable={false}/>
            </View> 
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Objetivo</Text>
                <TextInput style = {styles.text}
                placeholderTextColor='gray'
                placeholder='No registrado' 
                value={user.goal}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Edad</Text>
                <TextInput style = {styles.text}
                placeholderTextColor='gray'
                placeholder='No registrado' 
                value={user.age}
                editable={false}/>
            </View>
            <View style={{flexDirection: 'row'}}>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Peso (kg)</Text>
                <TextInput style = {styles.text}
                placeholderTextColor='gray'
                placeholder='No registrado' 
                value={user.weight}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Estatura (cm)</Text>
                <TextInput style = {styles.text}
                placeholderTextColor='gray'
                placeholder='No registrado'
                value={user.height}
                editable={false}/>
            </View>
            </View>
            <FAB style = {styles.button}
                visible={true}
                title="Asignar Rutina"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => assignRoutine()}
                icon={{ name: 'add', color: 'white' , size: 20}}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
    },
    title:{
        padding: 2,
        color: 'gray',
        fontSize: 10,
    },
    inputGroup: {
        margin: 10,
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
    list: {
        padding: 5,
        borderColor: 'grey',
    },
    icon:{
        padding: 25,
        alignItems: 'center',
        opacity: 0.8,
    },
    loading: {
        position: 'absolute',
        margin: 0
    },
});

export default PremiumInfo
