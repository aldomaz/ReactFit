import React, { useEffect, useState } from 'react'
import { ScrollView, Button, StyleSheet , ActivityIndicator, View, Text   } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem , FAB } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

function ClientList(props) {
    const [users, setusers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        firebase.db.collection('users').orderBy("name").onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                if (doc.data().role === 'normal' || doc.data().role === 'premium') {
                    const { name, email } = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        email,
                    })
                }
            })
            setFilteredDataSource(users);
            setusers(users);
            setLoading(false);
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

    return (
        <ScrollView style={styles.container}>
            <FAB style = {styles.button}
                visible={true}
                title="Añadir Cliente"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => props.navigation.navigate('CreateUser')}
                icon={{ name: 'add', color: 'white' , size: 20}}
            />
            <Searchbar
                style={styles.searchbar}
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
                                <ListItem.Subtitle style={styles.subtext}>{user.email}</ListItem.Subtitle>
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
    searchbar:{
        borderWidth: 2,
        borderRadius: 20,
        width: '98%',
        alignSelf: 'center',
        borderColor: 'red',
    },
    list: {
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    subtext: {
        padding: 2,
        color: 'lightgray',
        fontSize: 10,
    },
    loading: {
        position: 'absolute',
        margin: 0
    },
    button:{
        margin: 10,
        width: '60%',
        alignSelf: 'center',
    },
    titleButton:{
        fontSize: 12,
        fontWeight: 'bold',
        width: '80%'
    },
});

export default ClientList