import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

function PremiumList(props) {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').orderBy('name').onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                if (doc.data().role === 'premium') {
                    const { name, email, role } = doc.data()
                    users.push({
                        id: doc.id,
                        name, 
                        email,
                        role,
                    })
                }
            })

            setFilteredDataSource(users)
            setusers(users)
        })
    }, [])

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = users.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredDataSource(users);
          setSearch(text);
        }
      };

    return (
        <ScrollView style={styles.container}>
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
                            props.navigation.navigate("PremiumInfo", {
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

export default PremiumList