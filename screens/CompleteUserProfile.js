import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {FAB} from 'react-native-elements'
import {View, StyleSheet, TextInput, ScrollView, Pressable , Text , ActivityIndicator} from 'react-native'
import firebase from '../database/firebase'

function CompleteUserProfile(props) {
    const initialState = {
        id: '',
        name: '',
        goal: '',
        age: '',
        weight: '',
        height: '',
        job: '',
    }

    const auth = firebase.auth;
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);

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
        if(name==='age' || name==='weight' || name==='height'){
            let newText = '';
            let numbers = '0123456789';
    
            for (var i=0; i < value.length; i++) {
                if(numbers.indexOf(value[i]) > -1 ) {
                newText = newText + value[i];
                }  
                else {
                    alert("Solo se permiten números en los campos de Edad, Peso y Estatura");
                }     
            }
            setUser({...user, [name]: newText})
        }else{
            setUser({...user, [name]: value})
        }
    }

    const updateUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.update({
            name: user.name,
            goal: user.goal,
            age: user.age,
            weight: user.weight,
            height: user.height,
            job: user.job,
        })
        setUser(initialState);
        setLoading(false);
        props.navigation.navigate('Dashboard');
    }

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
                <MaterialCommunityIcons name={'account-edit'} 
                size={130} 
                color="red"/>
            </Pressable>
            <Text style = {styles.title}>Nombre</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                placeholder='Name User'
                value={user.name}
                onChangeText={(value) => handleChangeText('name', value)} />
            </View> 
            <Text style = {styles.title}>Objetivo</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                value={user.goal}
                onChangeText={(value) => handleChangeText('goal', value)} />
            </View> 
            <Text style = {styles.title}>Edad</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                value={user.age}
                keyboardType={'number-pad'}
                maxLength={3}
                onChangeText={(value) => handleChangeText('age', value)} />
            </View> 
            <Text style = {styles.title}>Peso (kg)</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                value={user.weight}
                keyboardType={'number-pad'}
                maxLength={3}
                onChangeText={(value) => handleChangeText('weight', value)} />
            </View> 
            <Text style = {styles.title}>Estatura (cm)</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                value={user.height}
                keyboardType={'number-pad'}
                maxLength={3}
                onChangeText={(value) => handleChangeText('height', value)} />
            </View> 
            <Text style = {styles.title}>Ocupacion</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                value={user.job}
                onChangeText={(value) => handleChangeText('job', value)} />
            </View> 
            <FAB style = {styles.button}
                visible={true}
                title="Guardar Información"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => updateUser()}
                icon={{ name: 'edit', color: 'white' , size: 20}}
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
        paddingLeft: 15,
        padding: 8,
        fontSize: 20,
    },    
    button:{
        margin: 10,
        width: '90%',
        alignSelf: 'center',
        paddingTop: 15,
    },
    titleButton:{
        fontSize: 14,
        fontWeight: 'bold',
        width: '80%'
    },
    icon:{
        alignItems: 'center',
        opacity: 0.8,
    },
    loading: {
        position: 'absolute',
        margin: 0
    },
});

export default CompleteUserProfile