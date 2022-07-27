import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet , ActivityIndicator, View } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem , FAB } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';

const TrainerList = (props) => {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
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
                title="Añadir Entrenador"
                titleStyle = {styles.titleButton}
                color='red'
                upperCase
                onPress={() => props.navigation.navigate('CreateTrainer')}
                icon={{ name: 'add', color: 'white' , size: 20}}
            />
            <Searchbar
                inputStyle={{fontSize: 16}}
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
        borderWidth: 1,
        borderRadius: 20,
        width: '98%',
        alignSelf: 'center',
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
        marginTop: 300,
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

export default TrainerList