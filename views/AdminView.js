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
        <ScrollView >
            <View style={styles.text}>
                <Text>Bienvenido Administrador</Text>
            </View>
            <View style={styles.button}>    
                <Button title = 'Lista de Usuarios'
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
        padding: 5,
        width: 200,
        borderStyle: 'dashed',
        alignSelf: 'center',
    },
    text:{
        alignSelf: 'center',
    },
});

export default AdminView