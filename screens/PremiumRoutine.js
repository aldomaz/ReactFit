import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator , Text} from 'react-native'
import firebase from '../database/firebase'
import { SpeedDial, FAB } from 'react-native-elements'

function PremiumRoutine(props) {

    const getCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return date + '-' + month + '-' + year;
    }

    const initialState1 = {
        name: '',
        aux: 0,
        id: '',
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
        var res = props.route.params.username.substring(0, 3);
        return res + date + month + year;
    }

    const addExcercise = async () => {
        if(routine.aux === 0){
            setLoading(true);
            const dbRef = firebase.db.collection('routines').doc(generateID());
            await dbRef.set({
                name: routine.name,
                date: getCurrentDate(),
            });
            setRoutine({ 
                name: routine.name,
                aux: routine.aux + 1,
                id: generateID(),
            })
            console.log('Ejercicio1');
            setLoading(false);
        } else {
            
        }
    }

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
        <View style = {{paddingBottom:10 }}>
        <Text style = {styles.title2}>Ejercicios Asignados ({routine.aux}):</Text>
        <Text style = {styles.title2}>** Para agregar ejercicios hacer clic en el botón + **</Text>
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
              onPress={() => addExcercise()}
            />
        </SpeedDial>
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
});

export default PremiumRoutine