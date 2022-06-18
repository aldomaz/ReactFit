import { async } from '@firebase/util';
import React from 'react';
import firebase from '../database/firebase';
import { View , Text, StyleSheet, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';

function AdminView(props) {
    
    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {props.navigation.navigate('LoginScreen')});
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.text}>Bienvenido {firebase.auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.button}>    
                <Button title = 'Lista de Clientes'
                    color='#19AC52'
                    onPress={() => props.navigation.navigate('UsersList')}> 
                </Button>
            </View>
            <View style={styles.button}>    
                <Button title = 'Lista de Clientes'
                    color='#19AC52'
                    onPress={() => props.navigation.navigate('UsersList')}> 
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

export default AdminView