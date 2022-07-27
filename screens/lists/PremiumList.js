import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet , ActivityIndicator, View } from 'react-native'
import firebase from '../../database/firebase'
import { List , Searchbar } from 'react-native-paper';

function PremiumList(props) {
    const [users, setusers] = useState([])
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true); 
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
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
            <View style={{marginHorizontal: 10, width:'90%', alignSelf: 'center'}}>
            {
                filteredDataSource.map(user => {
                    return (
                        <List.Section
                        key={user.id} 
                        bottomDivider>
                        <List.Accordion
                        style={styles.listcontainer}
                        right={props => <List.Icon {...props} icon="menu-down" color="red"/>}
                        titleStyle={{color: 'white'}}
                        title={user.name}
                        onPress={handlePress}>
                            <List.Item
                            style={styles.list}
                            right={props => <List.Icon {...props} icon="menu-right" color="red"/>}
                            titleStyle={{color: 'white'}}
                            title='Asignar Ejercicio'
                            onPress={() => {
                                props.navigation.navigate("PremiumInfo", {
                                    userId: user.id,
                                    userRole: user.role,
                                });
                            }}/>
                            <List.Item
                            style={styles.list}
                            right={props => <List.Icon {...props} icon="menu-right" color="red"/>}
                            titleStyle={{color: 'white'}}
                            title='Ver Seguimiento'
                            onPress={() => {
                                props.navigation.navigate("TrackingView", {
                                    userId: user.id,
                                    userRole: user.role,
                                })
                            }}/>
                        </List.Accordion>
                        </List.Section>
                    )
                })
            }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    listcontainer: {
        padding: 1,
        backgroundColor: 'black',
    },
    list: {
        padding: 1,
        width: '95%',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
    },
    loading: {
        marginTop: 300,
    },
});

export default PremiumList