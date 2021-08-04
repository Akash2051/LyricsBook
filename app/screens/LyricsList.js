import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image , StatusBar, Keyboard,TouchableWithoutFeedback, ScrollView } from 'react-native';
import colors from '../misc/colors';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import RoundIconBtn from '../components/RoundIconBtn';
import Note from '../components/Note';
import LyricsInputModal from '../components/LyricsInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react/cjs/react.development';
import { NavigationRouteContext } from '@react-navigation/native';
import { useNotes } from '../context/NoteProvider';
import SearchBar from '../components/SearchBar';
import NotFound from '../components/NotFound';


const LyricsList = ({user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false)
    const {notes, setNotes, findNotes} = useNotes();


    const findGreet = () => {
        const hrs = new Date().getHours();
        if(hrs ===0 || hrs < 12 ) return setGreet('Morning');
        if(hrs ===13 || hrs < 17 ) return setGreet('Afternoon');
        setGreet('Evening');

    };
    useEffect(() => {
        findGreet();
    }, []);

    const handleOnSubmit = async (title, desc) => {
        const note = {id: Date.now(), title, desc, time: Date.now() };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    };

    const openNote = (note) => {
        navigation.navigate('NoteDetail', { note })

    };
    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if(!text.trim()){
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes()
        }
        const filterNotes = notes.filter(note => {
            if(note.title.toLowerCase().includes(text.toLowerCase())){
                return note;
            }
        })

        if(filterNotes.length){
            setNotes([...filterNotes]);
        }else {
            setResultNotFound(true);
        }
    };
    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findNotes()
    }
    return (
        <>

        <StatusBar barStyle='light-content' backgroundColor={colors.DARK}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.header}>{'Good'} {greet} {user.name}</Text>
            {notes.length ? 
            (
            <SearchBar 
            value={searchQuery} 
            onChangeText={handleOnSearchInput}
            onClear={handleOnClear}
            />
            )
             : null
             }

        {
        resultNotFound ? <NotFound/> :
        <FlatList 
            nestedScrollEnabled
            data={notes}
            numColumns={2}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                 marginBottom: 15,
                 marginTop: 15,
            }}
            keyExtractor= { item => item.id.toString()} 
            renderItem={({item}) => (
                <Note onPress={() => openNote(item)}  item={item}/> 
            )}    
        />
        }
        {!notes.length ? (
        <View 
            style={[
                StyleSheet.absoluteFillObject, 
                styles.emptyHeaderContainer
            ]}
        > 
            <Text style={styles.emptyHeader}>ADD LYRICS </Text>
        </View>) : null }
        </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn 
            onPress={() => setModalVisible(true)} 
            antIconName='plus' 
            size={42}
            style={styles.addBtn}/>
        <LyricsInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
        />
        
        </>
        );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginBottom:10,
        zIndex:  1,
        backgroundColor: 'white'
    },
    searchbar:{
        borderWidth: 0.5,
        borderColor: '#000',
        height: 45,
        borderRadius: 50,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15,
        marginVertical: 15,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 15,


    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 

    },
    emptyHeader:{
        fontSize: 28,
        opacity: 0.5,
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1,
        backgroundColor: colors.PRIMARY,
        color: 'black'
    }

});

export default LyricsList;


