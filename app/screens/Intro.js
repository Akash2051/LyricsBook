import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, StatusBar, View, Dimensions,  } from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';

const Intro = ({onFinish}) => {
    const [name, setName] = useState(' ');
    const handleOnCHangeText = (text) => {
        setName(text);
    };
    const handleSubmit =async () => {
        const user = { name: name }
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
    }
    return (
        <>
            <StatusBar hidden/>
            <View style={styles.container}>
                <Text style= {styles.Introtext}>Enter Your Name to Continue</Text>
                <TextInput value={name} 
                onChangeText={handleOnCHangeText} 
                placeholder = 'Enter Name'
                style={styles.TextInput}
                />
                { name.trim().length >3 ? (
                <RoundIconBtn antIconName= 'arrow-right' onPress={handleSubmit}/>
                ) : null}
            </View>
        </>
    );
};
// const width = Dimensions.get('window') - 50;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Introtext: {
        fontSize: 20,
        marginBottom: 5,
        opacity: 0.5,
        alignContent: 'center',

    },
    TextInput: {
        borderWidth: 1,
        borderColor: '#000',
        color: colors.DARK,
        width: 370,
        height: 50,
        borderRadius: 50,
        paddingLeft: 15,
        fontSize: 18,
        marginBottom: 15,
        
    },
})

export default Intro;