import React from 'react';
import firebase from '../database/firebase';
import { View , Text, ScrollView, StyleSheet, Button} from 'react-native';

function InstructorView(props) {

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>Bienvenido</Text>
                <Text style={styles.text}>{firebase.auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.button}>
                <Button title = 'Ver Clientes Premium'
                    color= 'red'
                    onPress={() => props.navigation.navigate('PremiumList')}> 
                </Button>
            </View>
            <View style={styles.button}>
                <Button title = 'Ver Clientes Normales'
                    color= 'red'
                    onPress={() => props.navigation.navigate('NormalList')}> 
                </Button>
            </View>
            <View style={styles.button}>
                <Button title = 'Cerrar Sesión'
                    color= 'red'
                    onPress={() => SignOut()}> 
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    view: {
        flex: 1,
        padding: 15,
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
    },
    button: {
        margin: 10,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 30,
        margin: 3,
        color: 'white',
    },
});

export default InstructorView