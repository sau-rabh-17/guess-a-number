import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TitleText(props) {
  return (
      <Text style={{...style.title,...props.style}}>{props.children}</Text>
  )
}

const style = StyleSheet.create({
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
    }
})