import React,  {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { List } from 'react-native-paper'
import { View , Text, StyleSheet, ScrollView, Button} from 'react-native';

function RoutineView(props) {
    const [routine, setRoutine]=useState([])
    const [exercise, setExercise]=useState([])

    useEffect(() => {
        firebase.db.collection('users').doc(firebase.auth.currentUser.uid).collection('routines').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                const {name} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                })
            })  
            setRoutine(users)
        })
    }, [])

    const getExercises = (id) => {
        firebase.db.collection('users').doc(firebase.auth.currentUser.uid).collection('routines').doc(id).collection('exercise').onSnapshot(querySnapshot => {
            const exercise = [];
            querySnapshot.docs.forEach(doc => {
                const {name} = doc.data()
                exercise.push({
                    id: doc.id,
                    name,
                })
            })  
            setExercise(exercise);
        })
    }

    return (
        <ScrollView>
            {
                routine.map(routine => {
                    return( 
                        <List.Section                         
                        key={routine.id}  
                        bottomDivider>
                        <List.Accordion
                        title={routine.name}
                        onPress={getExercises(routine.id)}>
                        {
                            exercise.map(exercise => {
                                return(
                                    <List.Section key={exercise.id} 
                                    bottomDivider>
                                        <List.Item title={exercise.name}
                                        onPress={() => {props.navigation.navigate('ExerciseView',{
                                            userId: firebase.auth.currentUser.uid,
                                            routineId: routine.id,
                                            exerciseId: exercise.id,
                                        })}}/>
                                    </List.Section>
                                )
                            })
                        }
                        </List.Accordion>
                        </List.Section>
                    )
                })
            }
        </ScrollView>
    )
}

export default RoutineView