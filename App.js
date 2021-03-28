import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import MealsNavigator from './navigation/MealsNavigator'
import { LogBox } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import mealsReducer from './store/reducers/meals'

const rootReducer = combineReducers({
  meals: mealsReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  LogBox.ignoreLogs([
    'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo- constants).',
  ])
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
