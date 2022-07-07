import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator, Alert} from 'react-native'
import { FAB } from 'react-native-elements'
import firebase from '../database/firebase'

function ModifyExercise(props) {
    
    const initialState = {
        id: '',
        name: '',
        repeats: '',
        series: '',
    }

    const [loading, setLoading] = useState(true)
    const [exercise, setExercise] = useState(initialState)
    
    const getExerciseByID = async (userId, exerciseId) => {
        const dbRef = firebase.db.collection('routines').doc(userId).collection('exercise').doc(exerciseId);
        const doc = await dbRef.get();
        const exercise = doc.data();
        setExercise({
            ...exercise,
            id: doc.id,
        });
        setLoading(false);
    }

    const handleChangeText = (name, value) => {
        setExercise({...exercise, [name]: value})
    }

    useEffect (() => {
        getExerciseByID(props.route.params.userId, props.route.params.exerciseId);
    }, [])

    const saveChanges =  async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('routines').doc(props.route.params.userId).collection('exercise').doc(props.route.params.exerciseId);
        await dbRef.set({
            name: exercise.name,
            repeats: exercise.repeats,
            series: exercise.series,
        })
        setExercise(initialState);
        props.navigation.navigate('PremiumRoutine');
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
                <TextInput style = {styles.text}
                placeholder='Exercise Name'
                value={exercise.name}
                editable={false}
                onChangeText={(value) => handleChangeText('name', value)}/>
            </View>
            <Text style = {styles.title}>Repeticiones</Text>
            <View style = {styles.inputGroup2}>
                <TextInput style = {styles.text}
                placeholder='Exercise Series'
                value={exercise.series}
                onChangeText={(value) => handleChangeText('series', value)}/>
            </View>
            <Text style = {styles.title}>Series</Text>
            <View style = {styles.inputGroup2}>
                <TextInput style = {styles.text}
                placeholder='Exercise Repeats'
                value={exercise.repeats}
                onChangeText={(value) => handleChangeText('repeats', value)}/>
            </View>
            <FAB style = {styles.button}
            visible={true}
            title="Guardar Cambios"
            titleStyle = {{fontSize: 12}}
            color='red'
            upperCase
            onPress={() => saveChanges()}
            icon={{ name: 'check', color: 'white' }}
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
    inputGroup1:{

    },
    inputGroup2: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 5,
        fontSize: 15,
    },
    button:{
        padding: 2,
        margin: 15,
    },
    list: {
        padding: 5,
        borderColor: 'grey',
    },
});

export default ModifyExercise