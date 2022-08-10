import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator, Image , Alert} from 'react-native'
import { FAB , Slider } from 'react-native-elements'
import { Badge , Portal , Modal , Provider} from 'react-native-paper'
import firebase from '../database/firebase'

function ExerciseView(props) {
    const initialState = {
        id: '',
        name: '',
        repeats: '',
        series: '', 
        description1: '',
        description2: '',
        description3: '',
        muscle: '',
        variation: '',
    }

    const initialParams = {
        routineId: '',
        userId: '',
        exerciseId: '',
    }

    const [url, setUrl] = useState();

    //Slider
    const [value, setValue] = useState(0);
    const interpolate = (start, end) => {
        let k = (value - 0) / 100; // 0 =>min  && 100 => MAX
        return Math.ceil((1 - k) * start + k * end) % 256;
      };

    const color = () => {
        let r = interpolate(255, 50);
        let g = interpolate(0, 205);
        let b = interpolate(0, 50);
        return `rgb(${r},${g},${b})`;
    };

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [loading, setLoading] = useState(true)
    const [exercise, setExercise] = useState(initialState)
    const [params, setParams] = useState(initialParams);
    
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

    const getImage = async (exerciseId) => {
        const storage = firebase.storage.ref();
        const imageRef = storage.child('images/'+exerciseId+'.jpg');
        await imageRef.getDownloadURL().then((url) => {
            setUrl(url);
        })
    }

    const setRouteParams = (userId, routineId, exerciseId) => {
        setParams({
            userId: userId,
            routineId: routineId,
            exerciseId: exerciseId,
        })
    }

    useEffect (() => {
        setRouteParams(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
        getExerciseByID(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
        getImage(props.route.params.exerciseId);
    }, [])

    const completeExercise = async(id) => {
        setLoading(true);
        const dbref = firebase.db.collection('tracking').doc(params.routineId).collection('completeExercise').doc(id);
        const dbref2 = firebase.db.collection('users').doc(params.userId).collection('routines').doc(params.routineId).collection('exercise').doc(id);
        await dbref.set({
            name: exercise.name,
            percentage: value,
        })
        await dbref2.delete();
        props.navigation.goBack();
    }

    const completeExerciseAlert = (id) => {
        Alert.alert("Completar Ejercicio", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => completeExercise(id)},
            {text: 'No', onPress: () => console.log('false')},
        ])
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
            <View >
                <Image style={styles.image} source={{uri: url}} />
            </View>
            <FAB style = {styles.button}
                visible={true}
                title="Descripción"
                titleStyle = {styles.titleButton}
                color='red'
                icon={{ name: 'info', color: 'white' }}
                upperCase
                onPress={showModal}/>
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
                placeholderTextColor='white'
                placeholder='Sin Variación'
                value={exercise.variation}
                editable={false}/>
            </View>
            <View style={styles.sliderContainer}>
                <Slider
                value={value}
                onValueChange={setValue}
                maximumValue={100}
                minimumValue={0}
                step={10}
                thumbProps={{
                    children: (
                      <Badge
                      style={{backgroundColor: color(), 
                        fontSize: 11, 
                        alignSelf: 'center', 
                        color: 'white'}}
                      size={40}>{value}%</Badge>
                    ),
                  }}>
                </Slider>
            </View>  
            <View style = {styles.buttonContainer}>
                <FAB style = {styles.button}
                visible={true}
                title="Completar Ejercicio"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => completeExerciseAlert(exercise.id)}
                icon={{ name: 'check', color: 'white' }}/>
            </View>
            <Provider>
                <Portal>
                    <Modal
                    contentContainerStyle={{backgroundColor: 'white', borderColor: 'red', borderWidth: 1}}
                    visible={visible} 
                    onDismiss={hideModal}>
                        <View style={{flexDirection: 'row', alignSelf: 'center', padding: 20}}>
                            <Image style={styles.image2} 
                            source={require('react-native-firebase/resources/logo.png')}/>
                            <Text style={styles.text2}>ReactFit</Text>
                        </View>
                        <Text style={styles.descriptionText}>{exercise.description1}</Text>
                        <Text style={styles.descriptionText}>{'\t' + exercise.description2}</Text>
                        <Text style={styles.descriptionText}>{exercise.description3}</Text>
                    </Modal>
                </Portal>
            </Provider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 35,
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
    },
    text2: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        margin: 3,
        color: 'black',
    },
    title:{
        padding: 2,
        color: 'gray',
        fontSize: 10,
    },
    inputGroup:{
        margin: 1,
    },
    button:{
        margin: 30,
        width: '70%',
        alignSelf: 'center',
    },
    titleButton:{
        fontSize: 12,
        fontWeight: 'bold',
        width: '80%'
    },
    list: {
        padding: 5,
        borderColor: 'grey',
    },
    image: {
        borderWidth: 1,
        borderColor: 'red',
        width: 286,
        height: 160,
        resizeMode: 'stretch',
        alignSelf: 'center',
        margin: 10,
    },
    image2: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginRight: 10,
    },
    sliderContainer: {
        margin: 20,
    },
    descriptionText:{
        padding: 10,
        fontSize: 18,
        textAlign: 'justify',
    },
    loading: {
        marginTop: 300,
    },
});

export default ExerciseView