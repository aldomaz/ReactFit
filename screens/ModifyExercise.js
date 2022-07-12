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
        variation: '',
    }

    const [loading, setLoading] = useState(true)
    const [exercise, setExercise] = useState(initialState)
    
    const getExerciseByID = async (userId, routineId, exerciseId) => {
        const dbRef = firebase.db.collection('users').doc(userId).collection('routines').doc(routineId).collection('exercise').doc(exerciseId);
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
        getExerciseByID(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
    }, [])

    const saveChanges =  async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId).collection('routines').doc(props.route.params.routineId).collection('exercise').doc(props.route.params.exerciseId);
        await dbRef.update({
            name: exercise.name,
            repeats: exercise.repeats,
            series: exercise.series,
            variation: exercise.variation,
        })
        setExercise(initialState);
        props.navigation.navigate('PremiumRoutine');
    }

    const deleteExercise = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId).collection('routines').doc(props.route.params.routineId).collection('exercise').doc(props.route.params.exerciseId);
        await dbRef.delete();
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
            <Text style = {styles.title}>Series</Text>
            <View style = {styles.inputGroup2}>
                <TextInput style = {styles.text}
                placeholder='Series'
                value={exercise.series}
                onChangeText={(value) => handleChangeText('series', value)}/>
            </View>
            <Text style = {styles.title}>Repeticiones</Text>
            <View style = {styles.inputGroup2}>
                <TextInput style = {styles.text}
                placeholder='Repeticiones'
                value={exercise.repeats}
                onChangeText={(value) => handleChangeText('repeats', value)}/>
            </View>
            <Text style = {styles.title}>Variaciones</Text>
            <View style = {styles.inputGroup2}>
                <TextInput style = {styles.text}
                placeholder='Variaciones'
                value={exercise.variation}
                onChangeText={(value) => handleChangeText('variation', value)}/>
            </View>
            <View style = {styles.buttonContainer}>
                <FAB style = {styles.button}
                visible={true}
                title=" Guardar Cambios "
                titleStyle = {{fontSize: 12}}
                color='limegreen'
                upperCase
                onPress={() => saveChanges()}
                icon={{ name: 'check', color: 'white' }}
                />
                <FAB style = {styles.button}
                visible={true}
                title="Eliminar Ejercicio"
                titleStyle = {{fontSize: 12}}
                color='red'
                upperCase
                onPress={() => deleteExercise()}
                icon={{ name: 'delete', color: 'white' }}
                />
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
    buttonContainer: {
        margin: 15,
    },
    button:{
        padding: 2,
        margin: 2,
    },
    list: {
        padding: 5,
        borderColor: 'grey',
    },
});

export default ModifyExercise