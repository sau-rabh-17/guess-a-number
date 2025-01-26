import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import Colors from '../Constants/Colors'

export default function Header(props) {
  return (
    <View style={style.Header}>
      <Text style={style.HeaderTitle}>{props.title}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    Header:{
        justifyContent: "center",
        alignItems: "center",
        paddingTop:30,
        height:90,
        width:'100%',
        backgroundColor:Colors.primary,
    },
    HeaderTitle:{
        color:'white',
        fontSize:18,
        fontFamily:'open-sans-bold'
    }
})