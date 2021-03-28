import React from 'react'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function FavouritesScreen(props) {
  const favMeals = useSelector((state) => state.meals.favouriteMeals)
  // const favMeals = availableMeals.filter(
  //   (meal) => meal.id === 'm1' || meal.id === 'm2'
  // )
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text} numberOfLines={2}>
          No favourite meals found. Start adding some!
        </Text>
        <Button
          title="Go to categories"
          onPress={() => props.navigation.navigate('Meals')}
        />
      </View>
    )
  }
  return <MealList listData={favMeals} navigation={props.navigation} />
}
FavouritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Your Favourites',
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
  },
})
