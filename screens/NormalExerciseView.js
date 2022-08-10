import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator, Image} from 'react-native'
import { FAB} from 'react-native-elements'
import { Portal , Modal , Provider} from 'react-native-paper'
import firebase from '../database/firebase'

function NormalExerciseView(props) {
  
  const initialState = {
      id: '',
      name: '',
      repeats: '',
      series: '',
      description1: '',
      description2: '',
      description3: '',
      muscle: '',
  }

  const [url, setUrl] = useState();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

  const getImage = async (exerciseId) => {
      const storage = firebase.storage.ref();
      const imageRef = storage.child('images/'+exerciseId+'.jpg');
      await imageRef.getDownloadURL().then((url) => {
        setUrl(url);
      })
  }

  useEffect (() => {
    getExerciseByID(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
    getImage(props.route.params.exerciseId);
  }, [])

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
    <View style = {styles.buttonContainer}>
      <FAB style = {styles.button}
      visible={true}
      title=" Descripción "
      titleStyle = {{fontSize: 12}}
      color='red'
      upperCase
      onPress={showModal}/>
    </View>
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
  buttonContainer: {
      margin: 15,
  },
  button:{
      padding: 2,
      margin: 2,
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

export default NormalExerciseView