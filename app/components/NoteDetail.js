import React, { useState } from 'react';
import {StyleSheet, Text, View, ScrollView,TouchableWithoutFeedback,KeyboardAvoidingView, Dimensions, Modal, ImageBackground, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';
import LyricsInputModal from './LyricsInputModal';
import { FontAwesome5 } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NoteDetail = props => {
    const [note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const {setNotes} = useNotes();
    const [options, setOptions] = useState(false);
    const [Scroll, setScroll]= useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if(result !== null) notes = JSON.parse(result);
        
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure!',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
      };
      const handleUpdate = async (title, desc ) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title;
                n.desc = desc;
                n.isUpdated = true;

                setNote(n);
            }
            return n;
        });

        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));

    };
    const handleOnClose = () => setShowModal(false);

    const scaleUp = async (title, desc) =>{
        var Chords = ['[C]','[C#]','[D]','[D#]','[E]','[F]','[F#]','[G]','[G#]','[A]','[A#]','[B]'];
        const result = await AsyncStorage.getItem('notes');
        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title;
                n.desc = desc;
                setNote(n);
            }
            return n;
        });

        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        
    }

    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    };

    return (
    <View>
        <ScrollView contentContainerStyle={[styles.container, 
            {marginTop: headerHeight - 10 }] } > 
            <Text style={styles.title}> {note.title} </Text>
            <Text style={styles.desc}> {note.desc} </Text>
        </ScrollView>
        
        <Modal 
        animationType="fade"
            transparent ={true}
            visible={options}
        >
        <View style={{backgroundColor: '#ffffffa', flex:1}}>        
            <View style={{backgroundColor: colors.PRIMARY,       
                            marginTop: windowHeight / 2,
                            marginLeft:10,
                            marginRight:195,
                            marginBottom: windowHeight / 6, 
                            paddingLeft: 10,
                            paddingRight: 10, 
                            paddingTop: 10,
                            paddingBottom:5,
                            borderRadius:10, 
                            flex:1}}>
                
                <View style={{  
                    backgroundColor: 'white',  
                    // flex: 1, 
                    padding: 5,
                    height: 120,
                    borderRadius: 10,
                    }}>
                    <Text style={{
                    fontSize: 25,
                    alignSelf: 'center',
                    marginBottom: 5,
                    color: '#000000aa',
                    }}>Change Scale</Text>
                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'row', 
                        justifyContent: 'space-around', 
                        padding:5, 
                        }}>
                        <RoundIconBtn antIconName='plus' color={'black'} 
                            style={{backgroundColor: colors.PRIMARY}} 
                            onPress={scaleUp} />
                        <RoundIconBtn antIconName='minus' color={'black'} 
                            style={{backgroundColor: colors.PRIMARY}} 
                            onPress={console.log('pressed')}/>
                    </View>
                </View>
                
                <TouchableOpacity style={{
                    height: 70,
                    padding:5,
                    marginTop: 5, 
                    flexDirection: 'row',
                    alignItems: 'center' , 
                    backgroundColor: "white",
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    alignContent: 'center'}} onPress={() => setOptions(false)}>
                    <Text style={{fontSize: 25, color: 'black', paddingLeft: 10}}> 
                        Close
                    </Text>
                    <RoundIconBtn antIconName='close' color='black' />
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
    
        <Modal 
        animationType="fade"
            transparent ={true}
            visible={Scroll}
        >
        <View style={{backgroundColor: '#ffffffa', flex:1
            
        }}
            >        
            <View style={{backgroundColor: colors.PRIMARY,       
                            marginTop: windowHeight / 2,
                            marginLeft:100,
                            marginRight:60,
                            marginBottom: windowHeight / 6, 
                            paddingLeft: 10,
                            paddingRight: 10, 
                            paddingTop: 10,
                            paddingBottom:5,
                            borderRadius:10, 
                            flex:1}}>
                
                <View style={{  
                    backgroundColor: 'white', 
                    padding: 5,
                    height: 120,
                    borderRadius: 10,
                    }}>
                    <Text style={{
                    fontSize: 25,
                    alignSelf: 'center',
                    marginBottom: 5,
                    color: '#000000aa',
                    }}>Set Tempo</Text>
                    <View style={{ 
                        // flex: 1, 
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        padding:5, 
                        }}>
                        <TextInput style={{ backgroundColor: colors.PRIMARY, width: 80, height: 50, marginRight: 15, borderRadius: 10, fontSize: 24,borderBottomColor: 'black', alignItems: 'center'}}>

                        </TextInput>
                        <RoundIconBtn antIconName='check' color={'black'} 
                            style={{backgroundColor: colors.PRIMARY}} 
                            onPress={console.log('pressed')}/>
                    </View>
                </View>

                <TouchableOpacity style={{
                    height: 70,
                    padding:5,
                    marginTop: 5, 
                    flexDirection: 'row',
                    alignItems: 'center' , 
                    backgroundColor: "white",
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    alignContent: 'center'
                    }} onPress={() => setScroll(false)}>
                    <Text style={{fontSize: 25, color: 'black', paddingLeft: 10}}> 
                        Close
                    </Text>
                    <RoundIconBtn antIconName='close' color='black' />
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
        

    <LyricsInputModal 
        isEdit= {isEdit} 
        note= { note }
        onClose={handleOnClose} 
        onSubmit={handleUpdate}  
        visible={showModal} />

    <Modal
        animationType="fade"
        transparent ={true}
    >
        <View style={{ flex: 1,justifyContent: 'space-evenly', alignContent: 'center', flexDirection: 'row', 
                marginTop: windowHeight / 1.19, 
                height: 105,borderRadius: 40, marginHorizontal: 10, 
                marginBottom: 10, backgroundColor: 'white', padding: 15,
                shadowColor: 'black',elevation: 3, shadowOpacity: 0.6,shadowOffset:{
                    width: 10,
                    height: 15
                }
                }} >
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} 
        onPress={() => setOptions(true)} >
        <FontAwesome5 name="cloudscale" size={36} color="black"  
        style={{backgroundColor: '#fff', padding : 12, borderRadius: 50}}
        />
        <Text style={{color: 'black', fontSize: 18}}>Scale</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {openEditModal() ; setOptions(false)}}
        style={{alignItems: 'center', justifyContent: 'center'}} 
        onPress={() => {openEditModal() ; setOptions(false)}}>
            <RoundIconBtn antIconName='edit' 
                color='black'
                size = {35}
                style={{color: 'black', backgroundColor: 'white'}}
                />
            <Text style={{color: 'black', fontSize: 18}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => setScroll(true)}
        style={{alignItems: 'center', justifyContent: 'center'}}>
            <RoundIconBtn antIconName='play' 
                color='black'
                size={35}
                style={{color: 'black',backgroundColor: 'white'}}   
                />
            <Text style={{color: 'black', fontSize: 18}}>AutoScroll</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
            <RoundIconBtn antIconName='delete' 
                color='black'
                size={35}
                onPress={() => {displayDeleteAlert() ; setOptions(false)}}
                style={{color: colors.ERROR,backgroundColor: 'white'}}   
                />
            <Text style={{color: 'black', fontSize: 18}}>Delete</Text>
        </TouchableOpacity>

        </View>
        </Modal>
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,

    },
title: {
    fontSize: 35,
    color: colors.DARK,
    fontWeight: 'bold',

    },
desc: { 
    fontSize: 25,
    opacity: 0.6,
    marginTop: 10,
    marginLeft: 2,
    
    },
btnContainer: {
    right: 15,
    bottom: 50,
    position: 'absolute',

},
modalBG: {
    zIndex: -1,
},

});


export default NoteDetail;

