import React, { useEffect, useState } from 'react'
import { ScrollView, Button, Text } from 'react-native'
import firebase from '../database/firebase'
import { ListItem } from 'react-native-elements'

function CustomerList(props) {
    const [users, setusers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                if (doc.data().role === 'premium' || doc.data().role === 'normal') {
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
        <ScrollView>
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            props.navigation.navigate("AssignRoutine", {
                                userId: user.id
                            })
                        }}>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default CustomerList