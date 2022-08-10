import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet , ActivityIndicator, View, Text } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

function NormalList(props) {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
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
            setFilteredDataSource(users);
            setusers(users);
            setLoading(false);
        })
    }, [])

    if (loading){
        return(
            <ScrollView backgroundColor='black'>
                <View>
                    <ActivityIndicator 
                    style={styles.loading}
                    size='large' color="red" />
                    <Text style={{fontSize: 12, alignSelf: 'center', color: 'white'}}>Cargando...</Text>
                </View>
            </ScrollView>
        );
    }

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
                            props.navigation.navigate("NormalRoutine", {
                                userId: user.id,
                            })
                        }}>
                            <ListItem.Chevron />
                            <ListItem.Content>
                                <ListItem.Title style={styles.text}>{user.name}</ListItem.Title>
                                <ListItem.Subtitle style={styles.text2}>{user.email}</ListItem.Subtitle>
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
    text2:{
        color: 'lightgray',
        fontSize: 12,
    },
    loading: {
        marginTop: 300,
    },
});

export default NormalList