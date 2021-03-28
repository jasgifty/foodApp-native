import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavourite } from '../store/actions/meals'

export default function MealDetailsScreen(props) {
  const availableMeals = useSelector((state) => state.meals.meals)
  const mealId = props.navigation.getParam('mealId')
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId)
  const currentMealIsFav = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  )

  const dispatch = useDispatch()

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    // props.navigation.setParam({mealTitle: selectedMeal.title})
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler })
  }, [toggleFavouriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav })
  }, [currentMealIsFav])

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.listData}>
        {selectedMeal.ingredients.map((ingredient) => (
          <DefaultText style={styles.listItem} key={ingredient}>
            {ingredient}
          </DefaultText>
        ))}
      </View>
      <Text style={styles.title}>Steps</Text>
      <View style={styles.listData}>
        {selectedMeal.steps.map((step, index) => (
          <DefaultText style={styles.listItem} key={step}>
            {index + 1}. {step}
          </DefaultText>
        ))}
      </View>
      <View style={styles.screen}>
        {/* <Text>{selectedMeal.title}</Text> */}
        <Button
          title="Go To Categories"
          onPress={() => {
            props.navigation.popToTop()
          }}
        />
      </View>
    </ScrollView>
  )
}
MealDetailsScreen.navigationOptions = (navigationData) => {
  // const availableMeals = useSelector((state) => state.meals.meals)
  // const mealId = navigationData.navigation.getParam('mealId')
  // const selectedMeal = availableMeals.find((meal) => meal.id === mealId)
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const toggleFavourite = navigationData.navigation.getParam('toggleFav')
  const isFav = navigationData.navigation.getParam('isFav')
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButton
        iconName={isFav ? 'ios-star' : 'ios-star-outline'}
        onPress={toggleFavourite}
      />
    ),
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 22,
  },
  listData: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
})
