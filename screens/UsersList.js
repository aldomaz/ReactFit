import React,  {useEffect, useState} from 'react'
import {ScrollView, Button} from 'react-native'
import firebase from '../database/firebase'
import { ListItem}from 'react-native-elements'

const UsersList = (props) => {
    const [users, setusers]=useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                const {name, email} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                })
            })  
            
            setusers(users)
        })
    }, [])

    return(
        <ScrollView>
            <Button title="Create User" onPress={() => props.navigation.navigate('CreateUser')}/>
            {
                users.map(user => {
                    return(
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            props.navigation.navigate("UserDetailScreen",{
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

export default UsersList