import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import Colors from '../Constants/Colors'

export default function MainButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={style.button}>
                <Text style={style.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary,
        paddingHorizontal:30,
        paddingVertical:12,
        borderRadius:20,
    },
    buttonText:{
        fontFamily:'open-sans',
        fontSize:18,
        color:'white',
    },
})