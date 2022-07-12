import React, { useEffect, useState } from 'react'
import { ScrollView, Button , StyleSheet } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

const TrainerList = (props) => {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').orderBy("name").onSnapshot(querySnapshot => {
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

            setFilteredDataSource(users)
            setusers(users)
        })
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = users.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          setFilteredDataSource(users);
          setSearch(text);
        }
      };

    return (
        <ScrollView style={styles.container}>
            <Button title="Añadir Entrenador" 
            color = {'red'}
            onPress={() => props.navigation.navigate('CreateTrainer')}/>
            <Searchbar
                placeholder="Buscar cliente"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                maxLength ={50}
            />
            {
                filteredDataSource.map(user => {
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