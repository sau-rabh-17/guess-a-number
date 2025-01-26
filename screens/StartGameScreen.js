import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Card from '../components/Card'
import Colors from '../Constants/Colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

export default function StartGameScreen(props) {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmedInput, setconfirmedInput] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);


  const updateLayout = () =>{
    setButtonWidth(Dimensions.get('window').width/4);
  }  

  Dimensions.addEventListener('change',updateLayout);

 useEffect(()=>{
  const updateLayout = () =>{
    setButtonWidth(Dimensions.get('window').width/4);
  } ;

  const dimAdd = Dimensions.addEventListener('change',updateLayout);
  return()=>{
    dimAdd.remove();
  }
 })

  function numberInputHandler(inputText){
    setEnteredValue(inputText.replace(/[^0-9]/g,''));
  }

  function resetInputHandler(){
    setEnteredValue('');
    setconfirmedInput(false);
  }

  function comfirmedInputHandler(){
    const chosenNumber = parseInt(enteredValue);

    if(chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert(
        'Invalid Number!!!',
        'Enter a number between 0 and 100',
        [{text:'okay',style:'destructive',onPress:resetInputHandler}],
      )
      return;
    }
    setconfirmedInput(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }

  let comfirmedInputText;

  if(confirmedInput){
    comfirmedInputText = (
      <Card style={style.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
    }}>
    <View style={style.container}>
      <Text style={style.title}>Start New Game</Text>
      <Card style={style.inputContainer}>
        <Text>Select a Number !!!</Text>
        <Input 
          style={style.input} 
          blurOnSubmit 
          autoCapitalize="none" 
          autoCorrect={false} 
          keyboardType="numeric" 
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
          />
        <View style={style.buttonContainer}>
            <View 
              style={{width: buttonWidth}}>
                <Button  
                  title="RESET" 
                  color={Colors.secondary} 
                  onPress={resetInputHandler}
                />
            </View>
            <View 
               style={{width: buttonWidth}}>
                <Button  
                   title="Confirm" 
                   color={Colors.primary} 
                   onPress={comfirmedInputHandler}
                />
            </View>
        </View>
      </Card>
      {comfirmedInputText}
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        padding : 10,
        alignItems:"center",
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:'80%',
        minWidth:300,
        maxWidth:'95%',
        //maxWidth:"80%",
        alignItems:"center",
    },
    buttonContainer:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    input:{
      width:50,
      textAlign:'center',
    },
    summaryContainer:{
      marginTop:20,
      alignItems:'center',
    }
})