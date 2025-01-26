import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import React, {useState, useEffect} from 'react';
import GameOverScreen from './screens/GameOverScreen';
import * as Fonts from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const fetchFonts=()=>{
  return Fonts.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState(); 
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setDataLoaded(true);
      } catch (e) {
        console.log(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    SplashScreen.preventAutoHideAsync();
    loadFonts();
  }, []);

  if (!dataLoaded) {
    return null;
  }

  function configureNewGameHandler(){
    setGuessRounds(0);
    setUserNumber(null);
  }
   

  function StartGameHandler(selectedNumber){
    setUserNumber(selectedNumber);
  }

  function gameOverHandler(rounds){
    setGuessRounds(rounds); 
  }

  let content = <StartGameScreen onStartGame={StartGameHandler}/>
  
  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0){
    content = <GameOverScreen rounds = {guessRounds} number ={userNumber} restartGame={configureNewGameHandler}/>
  }
  return (
    <View style={styles.container}>
      <Header title="Guess the number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
