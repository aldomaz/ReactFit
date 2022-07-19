import React,  {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { Dialog , ListItem, FAB } from 'react-native-elements'
import { View , Text, StyleSheet, ScrollView, Button , Alert , ActivityIndicator} from 'react-native';

function RoutineView(props) {
    const initialState = {
        id: '',
        role: '',
        name: '',
    }

    const [user, setUser] = useState(initialState)
    const [routine, setRoutine] = useState([])
    const [exercise, setExercise] = useState([])
    const [routinePercentage, setPercentage] = useState(0)
    const [loading, setLoading] = useState(false)

    const [currentRoutine, SetCurrentRoutine] = useState ({
        routineId: '',
        routineName: '',
    })

    const [visible, setVisible] = useState(false);
    const toggleDialog = () => {
        setVisible(!visible);
      };

    function getRoutinePercentage(id){
        const exPercentage = [];
        let suma = 0;
        firebase.db.collection('tracking').doc(id).collection('completeExercise').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                const {percentage} = doc.data();
                exPercentage.push({
                    percentage,
                })
            })
            exPercentage.forEach((exPercentage) => {
                suma += exPercentage.percentage;
            })
            suma = suma/exPercentage.length;
            console.log(suma);
            setPercentage(suma);
        })
    }

    const getRoleByID = async (userId) => {
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

    const getExercises = (id, routineName) => {
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
                routineId: id,
                routineName: routineName,
            })
        })
    }

    const getCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return date + '-' + month + '-' + year;
    }

    const finishRoutineAlert = (id) => {
        Alert.alert("Finalizar rutina. Se eliminaran todos los ejercicios", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => finishRoutine(id)},
            {text: 'No', onPress: () => console.log(routinePercentage)},
        ])
    }

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }

    async function finishRoutine(id){
        setLoading(true);
        const dbRef = await firebase.db.collection('users').doc(firebase.auth.currentUser.uid).collection('routines').doc(id);
        if(user.role === 'premium')
        {   
            const dbRef2 = firebase.db.collection('tracking').doc(id);
            await dbRef2.set({
                userName: user.name,
                userId: firebase.auth.currentUser.uid,
                routineName: currentRoutine.routineName,
                percentage: routinePercentage,
                date: getCurrentDate(),
            })
        }
        //await dbRef.delete();
        toggleDialog();
        setLoading(false);
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
                            getExercises(routine.id, routine.name);
                            getRoutinePercentage(routine.id);
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
                <View style = {styles.buttonContainer}>
                    <FAB style = {styles.button}
                    visible={true}
                    title="Finalizar Rutina"
                    titleStyle = {{fontSize: 12, color: 'white'}}
                    color='limegreen'
                    upperCase
                    onPress={() => {finishRoutineAlert(currentRoutine.routineId);}}
                    icon={{ name: 'check', color: 'white' }}/>
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
    buttonContainer: {
        marginTop: 20,
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