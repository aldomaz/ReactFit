import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator, Image} from 'react-native'
import { FAB } from 'react-native-elements'
import firebase from '../database/firebase'

function ExerciseView(props) {
    const initialState = {
        id: '',
        name: '',
        repeats: '',
        series: '',
        description: '',
        muscle: '',
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

    useEffect (() => {
        getExerciseByID(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
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
            <View >
                <Image style={styles.image} source={require('react-native-firebase/resources/logo.png')} />
            </View>
            <View style = {styles.buttonContainer}>
                <FAB style = {styles.button}
                visible={true}
                title=" Descripción "
                titleStyle = {{fontSize: 12}}
                color='red'
                upperCase/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Nombre</Text>
                <TextInput style = {styles.text}
                placeholder='Exercise Name'
                value={exercise.name}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Series</Text>
                <TextInput style = {styles.text}
                placeholder='Exercise Name'
                value={exercise.series}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Repeticiones</Text>
                <TextInput style = {styles.text}
                placeholder='Exercise Name'
                value={exercise.repeats}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Musculo a trabajar</Text>
                <TextInput style = {styles.text}
                placeholder='Muscle'
                value={exercise.muscle}
                editable={false}/>
            </View>
            <View style = {styles.inputGroup}>
                <Text style = {styles.title}>Variación</Text>
                <TextInput style = {styles.text}
                placeholder='Variation'
                value={exercise.variation}
                editable={false}/>
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
    inputGroup:{
        margin: 5,
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
    image: {
        width: 160,
        height: 160,
        resizeMode: 'stretch',
        alignSelf: 'center',
        margin: 10,
    },
});

export default ExerciseView