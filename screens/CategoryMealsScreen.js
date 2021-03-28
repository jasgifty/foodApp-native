import React from 'react';

import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import { Text, View } from 'react-native';

export default function CategoryMeals(props) {
  const catId = props.navigation.getParam('categoryId');
  // const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryId.indexOf(catId) >= 0
  );
  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontFamily: 'open-sans-bold' }}>
          No item found as per filters
        </Text>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
}

CategoryMeals.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};
