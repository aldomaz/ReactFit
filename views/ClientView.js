import { async } from '@firebase/util';
import React from 'react';
import firebase from '../database/firebase';
import { View , Text} from 'react-native';
import { Button } from 'react-native-elements';

function ClientView() {

    return (
        <View>
            <Text>Bienvenido Cliente</Text>
        </View>
    )
}

export default ClientView