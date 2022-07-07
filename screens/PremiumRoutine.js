import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator , Text} from 'react-native'
import firebase from '../database/firebase'
import { SpeedDial, FAB , Dialog, CheckBox, ListItem} from 'react-native-elements'

function PremiumRoutine(props) {

    const [showex, setEx] = useState([]);
    const [showex2, setEx2] = useState([]);
    
    const initialState2 = {
        name: '',
        repeats: '',
        series: '',
    }

    const userState = {
        username: '',
    }

    const [user, setUser] = useState (userState);
    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState(initialState2)

    const getCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return date + '-' + month + '-' + year;
    }
    
    const [visible5, setVisible5] = useState(false);
    const toggleDialog5 = () => {
        setVisible5(!visible5);
      };
    const [checked, setChecked] = useState(1);
    
    const initialState1 = {
        name: '',
        id: '',
        aux: 0,
    }
    const [routine, setRoutine] = useState(initialState1);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleChangeText = (id, value) => {
        setRoutine({...routine, [id]: value})
    }

    const generateID = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var res = user.username;
        return res + date + month + year;
    }

    const sendExercise = async (ex2) => {
        setLoading(true);
        const dbRef = firebase.db.collection('routines').doc(generateID()).collection('exercise').doc(ex2);
        await dbRef.set({
            name: exercise.name,
            series: exercise.series,
            repeats: exercise.repeats,
        })
        setCounter(counter+1);
        firebase.db.collection('routines').doc(generateID()).collection('exercise').orderBy('name').onSnapshot(querySnapshot => {
            const showex2 = [];
            querySnapshot.docs.forEach(doc => {
                const { name, repeats, series } = doc.data()
                showex2.push({
                    id: doc.id,
                    name,
                    repeats,
                    series,
                })
            })
            setEx2(showex2);
        })
        setLoading(false);
        alert('Asignación exitosa');
    }

    const addExercise = async (ex) => {
        if(routine.name !== ''){
            if(routine.aux === 0){
                setLoading(true);
                const dbRef = firebase.db.collection('routines').doc(generateID());
                await dbRef.set({
                    name: routine.name,
                    date: getCurrentDate(),
                });
                setRoutine({ 
                    name: routine.name,
                    id: generateID(),
                    aux: routine.aux + 1,
                })
                setLoading(false);
            }
            sendExercise(ex);
        } else {
            alert('Asigne un nombre a la rutina')
        }
    }

    useEffect (() => {
        firebase.db.collection('excersises').orderBy('name').onSnapshot(querySnapshot => {
            const showex = [];
            querySnapshot.docs.forEach(doc => {
                const { name, repeats, series } = doc.data()
                showex.push({
                    id: doc.id,
                    name,
                    repeats,
                    series,
                })
            })
            setEx(showex);
        })
        if(user.username === ''){
            setUser({
                username: props.route.params.username,
            })
        }
    }, [])

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }

    return (
    <View style = {styles.container}>
        <ScrollView>
        <Text style = {styles.title}>Nombre</Text>
            <TextInput 
                value = {routine.name}
                style = {styles.inputGroup}
                onChangeText={(value) => handleChangeText('name', value)} />
        <Text style = {styles.title}>Fecha</Text>
            <TextInput
                style = {styles.inputGroup} 
                value = {getCurrentDate()}
                color='black'
                editable={false}/>
        <View style = {{margin:3 }}>
        <Text style = {styles.title2}>Ejercicios Asignados ({counter}):</Text>
        <Text style = {styles.title2}>** Para agregar ejercicios hacer clic en el botón + **</Text>
        </View>
        <View style = {{margin:5}}>
        {
            showex2.map(showex2 => {
                return (
                    <ListItem 
                    key={showex2.id} 
                    containerStyle={styles.list}
                    onPress={() => {
                        props.navigation.navigate("ModifyExercise", {
                            exerciseId: showex2.id,
                            userId: generateID(),
                        })}}>
                    <ListItem.Chevron />
                    <ListItem.Content>
                    <ListItem.Title style={styles.text}>{showex2.name}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                )
            })
        }
        </View>
        <FAB style = {styles.button}
            visible={true}
            title="Enviar Rutina"
            titleStyle = {{fontSize: 12}}
            color='limegreen'
            upperCase
            onPress={() => sendRoutine()}
            icon={{ name: 'check', color: 'white' }}
            />
        <FAB style = {styles.button}
            visible={true}
            title="Cancelar Rutina"
            titleStyle = {{fontSize: 12}}
            color='red'
            upperCase
            onPress={() => cancelRoutine()}
            icon={{ name: 'cancel', color: 'white' }}
            />
        </ScrollView>
        <SpeedDial
            isOpen={open}
            buttonStyle={{backgroundColor:'limegreen'}}
            icon={{ name: 'add', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>
            <SpeedDial.Action
              icon={{ name: 'add', color: 'white' }}
              buttonStyle={{backgroundColor:'limegreen'}}
              title="Añadir Ejercicio"
              onPress={toggleDialog5}
            />
        </SpeedDial>
        <ScrollView>
        <Dialog
            isVisible={visible5}
            onBackdropPress={toggleDialog5}
        >
        <ScrollView >
        <Dialog.Title title="Seleccionar Ejercicio"/>
            {showex.map(showex => (
                <CheckBox
                    key= {showex.id}
                    title={showex.name}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={checked === showex.id}
                    onPress={() => {setChecked(showex.id),
                    setExercise({
                        name: showex.name,
                        repeats: showex.repeats,
                        series: showex.series,
                    })}}
               />
            ))}
        <Dialog.Actions>
            <Dialog.Button
                title="CONFIRM"
                onPress={() => {
                    toggleDialog5;
                    addExercise(checked);
                }}
            />
            <Dialog.Button title="CANCEL" onPress={toggleDialog5} />
        </Dialog.Actions>
        </ScrollView>
    </Dialog>
    </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
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
        borderColor: 'red',
        borderRadius: 10,
    },
    text: {
        color: 'white',
    },
});

export default PremiumRoutine