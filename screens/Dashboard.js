import React , {useState} from 'react'
import firebase from '../database/firebase'
import { View , ActivityIndicator, ScrollView , StyleSheet , Text } from 'react-native'
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
        <ScrollView backgroundColor='black'>
            {user.userRole === 'admin' ? <AdminView navigation={props.navigation}/> 
            : (user.userRole === 'premium' ? <PremiumView navigation={props.navigation}/> 
            : (user.userRole === 'instructor' ? <InstructorView navigation={props.navigation}/> 
            : (user.userRole === 'normal' ? <NormalView navigation={props.navigation}/> : setUserWithDbAndRol())))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginTop: 300,
    },
});

export default Dashboard