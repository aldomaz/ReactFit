import React,  {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { Dialog , List, ListItem } from 'react-native-elements'
import { View , Text, StyleSheet, ScrollView, Button} from 'react-native';

function RoutineView(props) {
    const initialState = {
        id: '',
        role: '',
    }

    const [user, setUser]=useState(initialState)
    const [routine, setRoutine]=useState([])
    const [exercise, setExercise]=useState([])

    const [currentRoutine, SetCurrentRoutine] = useState ({
        routineId: '',
    })

    const [visible, setVisible] = useState(false);
    const toggleDialog = () => {
        setVisible(!visible);
      };

    getRoleByID = async (userId) => {
        const dbRef = firebase.db.collection('users').doc(userId);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
    }

    useEffect(() => {
        firebase.db.collection('users').doc(firebase.auth.currentUser.uid).collection('routines').onSnapshot(querySnapshot => {
            const routine = [];
            querySnapshot.docs.forEach(doc => {
                const {name} = doc.data()
                routine.push({
                    id: doc.id,
                    name,
                })
            })  
            setRoutine(routine); 
        })
        getRoleByID(firebase.auth.currentUser.uid);
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
            SetCurrentRoutine({
                routineId: id
            })
        })
    }

    return (
        <ScrollView style={styles.container}>
            {
                routine.map(routine => {
                    return( 
                        <ListItem
                        containerStyle={styles.list}
                        key={routine.id}
                        onPress={() => {
                            getExercises(routine.id);
                            toggleDialog();}}>
                        <ListItem.Chevron />
                        <ListItem.Content>
                                <ListItem.Title style={styles.text}>{routine.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <Dialog
            isVisible={visible}
            onBackdropPress={() => {
                toggleDialog();
                setExercise([]);
            }}>
                {
                    exercise.map(exercise => {
                        return(
                            <ListItem key={exercise.id}
                                onPress={() => { if(user.role === 'premium'){
                                    props.navigation.navigate('ExerciseView',{
                                    userId: firebase.auth.currentUser.uid,
                                    routineId: currentRoutine.routineId,
                                    exerciseId: exercise.id,
                                })}else{
                                    props.navigation.navigate('NormalExerciseView',{
                                                userId: firebase.auth.currentUser.uid,
                                                routineId: currentRoutine.routineId,
                                                exerciseId: exercise.id,
                                    })
                                    }
                                }}>
                            <ListItem.Chevron color={'black'}/>
                            <ListItem.Content>
                                <ListItem.Title>{exercise.name}</ListItem.Title>
                            </ListItem.Content>
                            </ListItem>
                        )
                    })
                }
            </Dialog>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    title:{
        padding: 2,
        color: 'gray',
        fontSize: 10,
    },
    title2:{
        padding: 2,
        color: 'black',
        fontSize: 10,
        alignSelf: 'center',
    },
    button:{
        padding: 10,
    },
    list: {
        backgroundColor: 'black',
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 15,
    },
    list: {
        backgroundColor: 'black',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        color: 'white',
    },
});

export default RoutineView