import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'

function NormalList(props) {
    const [users, setusers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').orderBy("name").onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                if (doc.data().role === 'normal') {
                    const { name, email, role } = doc.data() 
                    users.push({
                        id: doc.id,
                        name, 
                        email,
                        role,
                    })
                }
            })

            setusers(users)
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            {
                users.map(user => {
                    return (
                        <ListItem 
                        key={user.id} 
                        containerStyle={styles.list}
                        bottomDivider onPress={() => {
                            props.navigation.navigate("NormalRoutine", {
                                userId: user.id,
                                userRole: user.role,
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

export default NormalList