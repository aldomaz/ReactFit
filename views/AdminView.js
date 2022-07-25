import React from 'react';
import firebase from '../database/firebase';
import { View, Text, StyleSheet, ScrollView , Button} from 'react-native';
import * as Analytics from 'expo-firebase-analytics';


function AdminView(props) {

    const SignOut = async () => {
        await firebase.auth
            .signOut()
            .then(() => {
                Analytics.resetAnalyticsData();
                props.navigation.navigate('LoginScreen');
            });
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.text}>Bienvenido {firebase.auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.button}>
                <Button title='Lista de Entrenadores'
                    color='red'
                    onPress={() => props.navigation.navigate('TrainerList')}>
                </Button>
            </View>
            <View style={styles.button}>
                <Button title='Lista de Clientes'
                    color='red'
                    onPress={() => props.navigation.navigate('ClientList')}>
                </Button>
            </View>
            <View style={styles.button}>
                <Button title='Cerrar Sesión'
                    color='red'
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
    buttonColor:{
        backgroundColor:'red',
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
        padding: 15,
        margin: 20,
        color: 'white',
    },
});

export default AdminView