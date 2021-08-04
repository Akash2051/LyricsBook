import React, { useState, useEffect } from 'react'
import { View, Text,TextInput, Modal,StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const LyricsInputModal = ({visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const handleModalClose = () => {
        Keyboard.dismiss();
    };


    useEffect(() => {
        if(isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        }
    }, [isEdit]);


    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesc(text);
    };
    const handleSubmit = () => {
        if(!title.trim() && !desc.trim()) return onClose();

        if(isEdit){
            onSubmit(title, desc);
        }else{
            onSubmit(title, desc);
            setTitle('')
            setDesc('')
        }
        onClose();

    };
 
    const closeModal = () => {
        if(!isEdit){
        setTitle('')
        setDesc('')
     }
        onClose();
    };

    return (
        <>
        <StatusBar hidden/>
        <Modal visible={visible} animationType='fade'>
            <View style={styles.container}>
            <TextInput 
                value= {title}
                placeholder='Title' 
                style={styles.title} 
                onChangeText={(text) => handleOnChangeText(text, 'title')} />
            <TextInput 
            value = {desc}
            multiline 
            placeholder='Lyrics' 
            style={styles.descr} 
            onChangeText= {(text) => handleOnChangeText(text, 'desc')}/>
            <View  style={styles.btncontainer}>
                <RoundIconBtn antIconName='check' color='black' style={{backgroundColor: colors.PRIMARY}} onPress={handleSubmit}/>
               {title.trim() || desc.trim() ? (
               
               <RoundIconBtn  
                style={{marginLeft: 20,backgroundColor: colors.PRIMARY}} 
                antIconName='close' 
                color= {colors.ERROR}
                onPress={closeModal}
                /> 
                ): null }
            </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },

    input:{
        color: colors.DARK,
    },
    title: {
        borderBottomColor: colors.DARK,
        borderBottomWidth: 2,
        height: 34,
        fontSize: 28,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    descr: {
        borderBottomColor: colors.DARK,
        borderBottomWidth: 2,
        fontSize: 20,
        height: 100,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,

    },

})

export default LyricsInputModal;
