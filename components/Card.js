import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Card(props) {
  return (
    <View style={{...style.card,...props.style}}>
      {props.children}
    </View>
  )
}

const style = StyleSheet.create({
    card:{
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:.26,
        shadowRadius:6,
        backgroundColor:'white',
        elevation:8,
        padding:20,
        borderRadius:10,
    }
})