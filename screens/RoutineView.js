import React,  {useEffect, useState} from 'react'
import firebase from '../database/firebase'
import { ListItem }from 'react-native-elements'
import { View , Text, StyleSheet, ScrollView, Button} from 'react-native';

function RoutineView(props) {
    const [users, setusers]=useState([])

    useEffect(() => {
        firebase.db.collection('users').doc(firebase.auth.currentUser.uid).collection('routines').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                const {routine} = doc.data()
                users.push({
                    id: doc.id,
                    routine,
                })
            })  
            setusers(users)
        })
    }, [])

    return (
        <ScrollView>
            {
                users.map(user => {
                    return(
                        <ListItem key={user.id} bottomDivider>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>{user.routine}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default RoutineView