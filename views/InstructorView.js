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
            <View >
                <Text style={styles.text}>Bienvenido {firebase.auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.button}>
                <Button title = 'Asignar Rutina'
                    onPress={() => props.navigation.navigate('CustomerList')}> 
                </Button>
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
        padding: 10,
    },
    text:{
        alignSelf: 'center',
        fontSize: 20,
        padding: 15,
    },
    container:
    {
        alignContent: 'center',
        paddingVertical: 12,
    },
});

export default InstructorView