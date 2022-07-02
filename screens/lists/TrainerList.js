import React, { useEffect, useState } from 'react'
import { ScrollView, Button , StyleSheet } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'

const TrainerList = (props) => {
    const [users, setusers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                if (doc.data().role === 'instructor') {
                    const { name, email } = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        email,
                    })
                }
            })

            setusers(users)
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Button title="Añadir Entrenador" 
            color = {'red'}
            onPress={() => props.navigation.navigate('CreateTrainer')}/>
            {
                users.map(user => {
                    return (
                        <ListItem 
                        key={user.id} 
                        containerStyle={styles.list}
                        bottomDivider onPress={() => {
                            props.navigation.navigate("UserDetailScreen", {
                                userId: user.id
                            })
                        }}>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title style={styles.text}>{user.name}</ListItem.Title>
                                <ListItem.Subtitle style={styles.text}>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    list: {
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
    },
});

export default TrainerList