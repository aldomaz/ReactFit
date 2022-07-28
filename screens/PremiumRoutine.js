import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, StyleSheet, TextInput, ScrollView, BackHandler , Alert, ActivityIndicator , Pressable , Text} from 'react-native'
import firebase from '../database/firebase'
import { SpeedDial, FAB , Dialog, CheckBox, ListItem} from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

function PremiumRoutine(props) {

    const [showex, setEx] = useState([]);
    const [showex2, setEx2] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    
    const initialState2 = {
        name: '',
        repeats: '',
        series: '',
        muscle: '',
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
        const dbRef = firebase.db.collection('users').doc(user.username).collection('routines').doc(generateID()).collection('exercise').doc(ex2);
        await dbRef.set({
            name: exercise.name,
            series: exercise.series,
            repeats: exercise.repeats,
            muscle: exercise.muscle,
        })
        setCounter(counter+1);
        firebase.db.collection('users').doc(user.username).collection('routines').doc(generateID()).collection('exercise').orderBy('name').onSnapshot(querySnapshot => {
            const showex2 = [];
            querySnapshot.docs.forEach(doc => {
                const { name, repeats, series , muscle } = doc.data()
                showex2.push({
                    id: doc.id,
                    name,
                    repeats,
                    series,
                    muscle,
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
                const dbRef = firebase.db.collection('users').doc(user.username).collection('routines').doc(generateID());
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

    const finishRoutineAlert = () => {
        Alert.alert("Finalizar asignación de rutina", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => props.navigation.navigate('PremiumList')},
            {text: 'No', onPress: () => console.log('false')},
        ])
    }

    const cancelRoutine = async () => {
        setLoading(true);
        if(routine.aux !== 0){
            const dbref = firebase.db.collection('users').doc(user.username).collection('routines').doc(routine.id);
            await dbref.delete();
        }
        props.navigation.navigate('PremiumList');
    }

    const cancelRoutineAlert = () => {
        Alert.alert("Desea cancelar la asignación de rutina", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => cancelRoutine()},
            {text: 'No', onPress: () => console.log('false')},
        ])
    }


    useEffect (() => {
        firebase.db.collection('excersises').orderBy('name').onSnapshot(querySnapshot => {
            const showex = [];
            querySnapshot.docs.forEach(doc => {
                const { name, repeats, series , muscle } = doc.data()
                showex.push({
                    id: doc.id,
                    name,
                    repeats,
                    series,
                    muscle,
                })
            })
            setEx(showex);
            setFilteredDataSource(showex);
        })
        if(user.username === ''){
            setUser({
                username: props.route.params.username,
            })
        }
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = showex.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(showex);
          setSearch(text);
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          cancelRoutineAlert,
        );
        return () => backHandler.remove();
      }, []);

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
    <View style = {styles.container}>
        <ScrollView style = {{backgroundColor: 'black'}}>
        <Pressable style={styles.icon}>
            <MaterialCommunityIcons name={'dumbbell'} 
            size={130} 
            color="red"/>
            <Text style={styles.text}>Premium</Text>
        </Pressable>
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
                            routineId: routine.id,
                            userId: user.username,
                        })}}>
                    <ListItem.Chevron color={'red'}/>
                    <ListItem.Content>
                    <ListItem.Title style={styles.text}>{showex2.name}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                )
            })
        }
        </View>
        <View style={{marginTop: 8}}>
            <FAB style = {styles.button}
                visible={true}
                title="Enviar Rutina"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => finishRoutineAlert()}
                icon={{ name: 'check', color: 'white' , size: 20}}
            />
            <FAB style = {styles.button}
                visible={true}
                title="Cancelar Rutina"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => cancelRoutineAlert()}
                icon={{ name: 'cancel', color: 'white' , size: 20}}
            />
        </View>
        </ScrollView>
        <SpeedDial
            isOpen={open}
            buttonStyle={{backgroundColor:'red'}}
            icon={{ name: 'add', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>
            <SpeedDial.Action
              icon={{ name: 'add', color: 'white' }}
              buttonStyle={{backgroundColor:'red'}}
              title="Añadir Ejercicio"
              onPress={() => {
                if(routine.name !== ''){
                    toggleDialog5();
                }else{
                    alert('Asigne un nombre a la rutina')
                }
            }}
            />
        </SpeedDial>
        <ScrollView>
        <Dialog
            backdropStyle={{backgroundColor: 'black'}}
            isVisible={visible5}
            onBackdropPress={toggleDialog5}>
        <ScrollView >
            <Searchbar
                placeholder="Buscar ejercicio"
                placeholderTextColor={'gray'}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                iconColor={'white'}
                maxLength ={50}
                inputStyle={{fontSize: 14, color: 'white'}}
                style={styles.searchbar}
            />
            {filteredDataSource.map(showex => (
                <CheckBox
                    key= {showex.id}
                    title={showex.name}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    checkedIcon="check"
                    uncheckedIcon="circle-o"
                    uncheckedColor='black'
                    checkedColor='red'
                    checked={checked === showex.id}
                    onPress={() => {setChecked(showex.id),
                    setExercise({
                        name: showex.name,
                        repeats: showex.repeats,
                        series: showex.series,
                        muscle: showex.muscle,
                    })}}
               />
            ))}
        <Dialog.Actions>
            <Dialog.Button
                title="AÑADIR"
                titleStyle={{color: 'red'}}
                onPress={() => {
                    toggleDialog5;
                    addExercise(checked);
                }}
            />
            <Dialog.Button titleStyle={{color: 'black'}} title="CANCELAR" onPress={toggleDialog5} />
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
        backgroundColor: 'black'
    },
    title:{
        paddingLeft: 10,
        marginTop: 6,
        color: 'lightgray',
        fontSize: 10,
    },
    title2:{
        padding: 2,
        color: 'white',
        fontSize: 10,
        alignSelf: 'center',
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
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'red',
        padding: 5,
        paddingLeft: 15,
        fontSize: 16,
    },
    list: {
        backgroundColor: 'black',
        padding: 13,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'red',
    },
    searchbar:{
        borderWidth: 2,
        borderRadius: 20,
        width: '98%',
        alignSelf: 'center',
        backgroundColor: 'black',
        borderColor: 'red',
    },
    text: {
        color: 'white',
    },
    loading: {
        marginTop: 300,
    },
    icon:{
        alignItems: 'center',
        opacity: 0.8,
    },
});

export default PremiumRoutine