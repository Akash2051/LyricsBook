import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../misc/colors';

const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
    return (
        <AntDesign name={antIconName} 
                    size={size || 30} 
                    color={color || Colors.PRIMARY} 
                    style = {[styles.icon, { ...style }]} 
                    onPress={onPress}
            />
        );
};

const styles = StyleSheet.create({
    icon: {
        padding: 15,
        borderRadius: 50,
    }
})

export default RoundIconBtn;
        
