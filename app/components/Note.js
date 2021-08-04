import React from 'react';
import { View, Text, Dimensions ,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../misc/colors';


const Note = ({item, onPress}) => {
    const{title, desc}= item;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text numberOfLines={1}  style={styles.header}>{title}</Text>
            <Text numberOfLines={2}  style={styles.subHeader}>{desc}</Text>
        </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width -40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2,
        padding: 8,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 15,
        color: 'black',
    },
});

export default Note;