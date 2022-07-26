import React , { useEffect } from 'react';
import { FAB } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../database/firebase';
import { View, Text, StyleSheet, ScrollView , Pressable , Alert , Image } from 'react-native';

function AdminView(props) {

    const SignOut = async () => {
        await firebase.auth
        .signOut()
        .then(() => {
            props.navigation.navigate('LoginScreen');
        });
    }

    useEffect(() => {
        props.navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert("Deseas cerrar sesión", "¿Estás Seguro?", [
                {text: 'Sí', onPress: () => {
                SignOut(),
                props.navigation.dispatch(e.data.action)}},
                {text: 'No', onPress: () => console.log('false')},
            ])
        })
    });

    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row', alignSelf: 'center', padding: 10}}>
                <Image style={styles.image} 
                source={require('react-native-firebase/resources/logo.png')}/>
                <Text style={styles.text}>ReactFit</Text>
            </View>
            <Pressable style={styles.icon}>
                <MaterialCommunityIcons name={'account-cog-outline'} 
                size={130} 
                color="red"/>
            </Pressable>
            <View style={styles.view}>
                <Text style={styles.text}>Bienvenido</Text>
                <Text style={styles.text}>{firebase.auth.currentUser.displayName}</Text>
            </View>
            <View style={styles.view}>
                <FAB style = {styles.button}
                    visible={true}
                    title="Lista de Entrenadores"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => props.navigation.navigate('TrainerList')}
                    icon={{ name: 'list', color: 'white' }}
                />
                <FAB style = {styles.button}
                    visible={true}
                    title="Lista de Clientes"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => props.navigation.navigate('ClientList')}
                    icon={{ name: 'list', color: 'white' }}
                />
                <FAB style = {styles.button}
                    visible={true}
                    title="Cambiar Contraseña"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => props.navigation.navigate('ChangePassword')}
                    icon={{ name: 'edit', color: 'white' }}
                />
                <FAB style = {styles.button}
                    visible={true}
                    title="Cerrar Sesión"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => SignOut()}
                    icon={{ name: 'logout', color: 'white' }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        margin: 3,
        color: 'white',
    },
    button:{
        margin: 10,
        width: '100%',
        alignSelf: 'center'
    },
    titleButton:{
        fontSize: 14,
        fontWeight: 'bold',
        width: '80%'
    },
    view: {
        flex: 1,
        padding: 15,
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginRight: 10,
    },
    icon:{
        paddingTop: 10,
        alignItems: 'center',
        opacity: 0.8,
    },
});

export default AdminView