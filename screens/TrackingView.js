import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet , Text , View } from 'react-native'
import firebase from '../database/firebase'
import { ListItem , Dialog} from 'react-native-elements';

function TrackingView(props) {
    const initialState ={
        date: '',
        percentage: '',
    }

    const [routines, setRoutines] = useState([]);
    const [currentRoutine, SetCurrentRoutine] = useState(initialState);
    const [exercise, setExercise] = useState([]);

    useEffect(() => {
        firebase.db.collection('tracking').onSnapshot(querySnapshot => {
            const routines = [];
            querySnapshot.docs.forEach(doc => {
                if(doc.data().userId === props.route.params.userId){
                    const { routineName , date , percentage} = doc.data() 
                    routines.push({
                    id: doc.id,
                    routineName,
                    date,
                    percentage,
                })
                }
            })
            setRoutines(routines);
        })
    }, [])

    const getExercises = (id) => {
        firebase.db.collection('tracking').doc(id).collection('completeExercise').onSnapshot(querySnapshot => {
            const exercises = [];
            querySnapshot.docs.forEach(doc => {
                const { name , percentage} = doc.data() 
                exercises.push({
                    id: doc.id,
                    name,
                    percentage,
                })
            })
            setExercise(exercises);
        })
    }

    const [visible, setVisible] = useState(false);
    const toggleDialog = () => {
        setVisible(!visible);
      };

    return (
        <ScrollView style={styles.container}>
            {
                routines.map(routine => {
                    return (
                        <ListItem 
                        key={routine.id} 
                        containerStyle={styles.list}
                        bottomDivider
                        onPress={() => {
                            SetCurrentRoutine({
                                date: routine.date,
                                percentage: routine.percentage,
                            });
                            getExercises(routine.id);
                            toggleDialog();
                        }}>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title style={styles.text}>{routine.routineName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <Dialog
            isVisible={visible}
            onBackdropPress={() => {
                toggleDialog();
            }}>
                <View style={styles.dialogview}>
                    <Text style={styles.title}>Porcentaje de Completación</Text>
                    <Text style={styles.dialogtext}>{currentRoutine.percentage}%</Text>
                </View>
                <View style={styles.dialogview}>
                    <Text style={styles.title}>Fecha de Realización</Text>
                    <Text style={styles.dialogtext}>{currentRoutine.date}</Text>
                </View>
                <View style={styles.dialogview}>
                <Text style={styles.title}>Ejercicios Realizados</Text>
                    {exercise.map(exercise => {
                        return(
                        <ListItem 
                        key={exercise.id} 
                        bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={styles.dialogtext}>{exercise.name}</ListItem.Title>
                                <ListItem.Subtitle style={styles.title}>{exercise.percentage}%</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>)
                    })}
                </View>
            </Dialog>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    list: {
        backgroundColor: 'black',
    },
    title:{
        fontSize: 11,
        color: 'dimgray',
    },  
    text: {
        color: 'white',
    },
    dialogview:{
        padding: 3,
        marginBottom: 6,
    },
    dialogtext: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default TrackingView