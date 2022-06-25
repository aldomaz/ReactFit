import React , {useState} from 'react'
import firebase from '../database/firebase'
import { View , ActivityIndicator, ScrollView , StyleSheet, StatusBar } from 'react-native'
import AdminView from '../views/AdminView';
import PremiumView from '../views/PremiumView';
import InstructorView from '../views/InstructorView';
import NormalView from '../views/NormalView';

function Dashboard(props) {

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        id: '',
        email: '',
        userRole: '',
    });

    const getRol = async (uid) => {
        const docuRef = firebase.db.collection('users').doc(uid);
        const docuCifrada = await  docuRef.get();
        const infoUsuario = docuCifrada.data().role;
        return infoUsuario;
    }

    const setUserWithDbAndRol = () =>{
            setLoading(true);
            getRol(firebase.auth.currentUser.uid).then((rol) => {
                const userData = {
                    id: firebase.auth.currentUser.uid,
                    email: firebase.auth.currentUser.email,
                    userRole: rol,
                };
                setUser(userData);
                console.log("userData final", userData);
                setLoading(false);
            });
    }

    if (loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        );
    }


    return (
        <ScrollView backgroundColor='black'>
            {user.userRole === 'admin' ? <AdminView navigation={props.navigation}/> 
            : (user.userRole === 'premium' ? <PremiumView navigation={props.navigation}/> 
            : (user.userRole === 'instructor' ? <InstructorView navigation={props.navigation}/> 
            : (user.userRole === 'normal' ? <NormalView navigation={props.navigation}/> : setUserWithDbAndRol())))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',
        padding: 10,
        fontSize: 20,
    },
    button: {
        margin: 10,
        color:'red',
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 30,
        padding: 15,
        margin: 20,
        color: 'white',
    },
});

export default Dashboard