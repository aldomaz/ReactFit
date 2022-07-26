import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {View, StyleSheet, TextInput, ScrollView , Alert, Text , Pressable} from 'react-native'
import { ActivityIndicator } from 'react-native'
import { FAB } from 'react-native-elements'
import firebase from '../database/firebase'

const UserDetailScreen = (props) =>{
    
    const initialState = {
        id: '',
        name: '',
        email: '',
        role: '',
    }

    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(loading?true:false)

    const getUserByID = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    }

    useEffect (() => {
        getUserByID(props.route.params.userId);
    }, [])

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value})
    }

    const deleteUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        if(user.role === 'instructor'){
            setUser(initialState);
            props.navigation.navigate('UsersList');
        }else{
            setUser(initialState);
            props.navigation.navigate('ClientList');
        }
    }

    const updateUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.update({
            name: user.name,
            email: user.email,
            role: user.role,
        })
        if(user.role === 'instructor'){
            setUser(initialState);
            props.navigation.navigate('UsersList');
        }else{
            setUser(initialState);
            props.navigation.navigate('ClientList');
        }
    }

    const deleteConfirmationAlert = () => {
        Alert.alert("Eliminar Usuario", "¿Estás Seguro?", [
            {text: 'Sí', onPress: () => deleteUser()},
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
                </View>
            </ScrollView>
        );
    }

    return(
        <ScrollView style = {styles.container}>
            <Pressable style={styles.icon}>
                <MaterialCommunityIcons name={'account-edit'} 
                size={130} 
                color="red"/>
            </Pressable>
            <Text style = {styles.title}>Nombre y Apellido</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                placeholder='Name User'
                value={user.name}
                onChangeText={(value) => handleChangeText('name', value)} />
            </View> 
            <Text style = {styles.title}>Email</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                placeholder='Email User' 
                value={user.email}
                onChangeText={(value) => handleChangeText('email', value)}/>
            </View>
            <Text style = {styles.title}>Rol</Text>
            <View style = {styles.inputGroup}>
                <TextInput 
                style = {{color: 'black'}}
                editable={false}
                placeholder='Rol User' 
                value={user.role}
                onChangeText={(value) => handleChangeText('role', value)}/>
            </View>
            <View style={{marginTop: 20}}>
                <FAB style = {styles.button}
                    visible={true}
                    title="Actualizar Datos"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => updateUser()}
                    icon={{ name: 'update', color: 'white' , size: 20}}
                />
                <FAB style = {styles.button}
                    visible={true}
                    title="Eliminar Usuario"
                    titleStyle = {styles.titleButton}
                    color='red'
                    upperCase
                    onPress={() => deleteConfirmationAlert()}
                    icon={{ name: 'delete', color: 'white' , size: 20}}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignSelf: 'auto',
        backgroundColor: 'black',
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'red',
        padding: 10,
        fontSize: 20,
    },    
    title:{
        paddingLeft: 10,
        marginTop: 6,
        color: 'lightgray',
        fontSize: 10,
    },
    button:{
        margin: 10,
        width: '90%',
        alignSelf: 'center',
    },
    titleButton:{
        fontSize: 14,
        fontWeight: 'bold',
        width: '80%'
    },
    icon:{
        padding: 25,
        alignItems: 'center',
        opacity: 0.8,
    },
    loading: {
        marginTop: 300,
    },
});

export default UserDetailScreen