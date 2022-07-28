import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator , Pressable } from 'react-native'
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
        if(exercise.variation !== undefined){
            await dbRef.update({
                name: exercise.name,
                repeats: exercise.repeats,
                series: exercise.series,
                variation: exercise.variation,
            })
        }else{
            await dbRef.update({
                name: exercise.name,
                repeats: exercise.repeats,
                series: exercise.series,
            })
        }
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
                <MaterialCommunityIcons name={'dumbbell'} 
                size={130} 
                color="red"/>
            </Pressable>
            <Text style = {styles.title}>Nombre</Text>
            <View style = {styles.textName}>
                <TextInput style = {styles.text}
                placeholder='Exercise Name'
                value={exercise.name}
                editable={false}
                onChangeText={(value) => handleChangeText('name', value)}/>
            </View>
            <Text style = {styles.title}>Series</Text>
            <View style = {styles.inputGroup2}>
                <TextInput
                placeholder='Series'
                value={exercise.series}
                onChangeText={(value) => handleChangeText('series', value)}/>
            </View>
            <Text style = {styles.title}>Repeticiones</Text>
            <View style = {styles.inputGroup2}>
                <TextInput
                placeholder='Repeticiones'
                value={exercise.repeats}
                onChangeText={(value) => handleChangeText('repeats', value)}/>
            </View>
            <Text style = {styles.title}>Variaciones</Text>
            <View style = {styles.inputGroup2}>
                <TextInput
                placeholder='Variaciones'
                value={exercise.variation}
                onChangeText={(value) => handleChangeText('variation', value)}/>
            </View>
            <View style={{marginTop: 5}}>
                <FAB style = {styles.button}
                    visible={true}
                    title="Guardar Cambios"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => saveChanges()}
                    icon={{ name: 'save', color: 'white' , size: 20}}
                />
                <FAB style = {styles.button}
                    visible={true}
                    title="Eliminar Ejercicio"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => deleteExercise()}
                    icon={{ name: 'delete', color: 'white' , size: 20}}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
        backgroundColor: 'black'
    },
    text: {
        color: 'white',
    },
    title:{
        paddingLeft: 10,
        marginTop: 6,
        color: 'lightgray',
        fontSize: 10,
    },
    textName: {
        margin: 10,
    },
    inputGroup2: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'red',
        padding: 10,
        fontSize: 20,
    },
    button:{
        margin: 10,
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
    loading: {
        marginTop: 300,
    },
    icon:{
        padding: 25,
        alignItems: 'center',
        opacity: 0.8,
    },
});

export default ModifyExercise