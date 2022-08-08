import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet , Text , View , ActivityIndicator , Pressable} from 'react-native'
import firebase from '../database/firebase'
import { ListItem , Dialog} from 'react-native-elements';

function TrackingView(props) {

    
    const [loading, setLoading] = useState(true);

    const initialState ={
        date: '',
        percentage: '',
    }

    const [routines, setRoutines] = useState([]);
    const [currentRoutine, SetCurrentRoutine] = useState(initialState);
    const [exercise, setExercise] = useState([]);

    useEffect(() => {
        setLoading(true);
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
            setLoading(false);
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
        <ScrollView style={styles.container}>
            {routines.length===0?<Text style={styles.alertText}>El cliente todavía no ha completado rutinas..</Text>:<></>}
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
                <Pressable style={styles.icon}>
                    <MaterialCommunityIcons name={'account-eye'} 
                    size={130} 
                    color="red"/>
                </Pressable>
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
                <Dialog.Button titleStyle={{color: 'red', paddingTop: 10}} title="FINALIZAR" onPress={toggleDialog} />
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
    icon:{
        padding: 25,
        alignItems: 'center',
        opacity: 0.8,
    },
    alertText:{
        color: 'red', 
        alignSelf: 'center', 
        fontSize: 16, 
        paddingTop: 20,
    },
});

export default TrackingView