import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, ScrollView, TextInput , ActivityIndicator, Image} from 'react-native'
import { FAB , Dialog , Slider , Icon} from 'react-native-elements'
import { Badge , Portal , Modal , Provider} from 'react-native-paper'
import firebase from '../database/firebase'

function NormalExerciseView(props) {
  
  const initialState = {
      id: '',
      name: '',
      repeats: '',
      series: '',
      description: '',
      muscle: '',
  }

  const [url, setUrl] = useState();
  const [urlDesc, setUrlDesc] = useState();
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

  const getDescription = async (exerciseId) => {
    const storage = firebase.storage.ref();
    const imageRef = storage.child('descriptions/'+exerciseId+'Des.jpg');
    await imageRef.getDownloadURL().then((url) => {
      setUrlDesc(url);
    })
  }
  
  useEffect (() => {
    getExerciseByID(props.route.params.userId, props.route.params.routineId, props.route.params.exerciseId);
    getImage(props.route.params.exerciseId);
    getDescription(props.route.params.exerciseId);
  }, [])

  if (loading){
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
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
        visible={visible} 
        onDismiss={hideModal}>
          <Image style={styles.description} source={{uri: urlDesc}} />
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
      color: 'black',
      textAlign: 'justify',
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
  sliderContainer: {
      margin: 20,
  },
  description: {
      width: 315,
      height: 130,
      resizeMode: 'stretch',
      alignSelf: 'center',
      margin: 10,
  },
});

export default NormalExerciseView