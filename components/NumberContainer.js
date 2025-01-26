import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../Constants/Colors'

export default function NumberContainer(props) {
  return (
    <View style={style.container}>
      <Text style={style.number}>{props.children}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:Colors.primary,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center',

    },
    number:{
        color : Colors.primary,
        fontSize: 22,
    },
})