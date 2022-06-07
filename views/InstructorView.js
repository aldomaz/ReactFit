import { async } from '@firebase/util';
import React from 'react';
import firebase from '../database/firebase';
import { View , Text, ScrollView, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

function InstructorView(props) {

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <ScrollView >
            <View style={styles.text}>
                <Text>Bienvenido Instructor</Text>
            </View>
            <View style={styles.button}>
                <Button title = 'Cerrar Sesión'
                    onPress={() => SignOut()}> 
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button:{
        margin: 5,
        padding: 10,
    },
    text:{
        alignSelf: 'center',
    },
});

export default InstructorView