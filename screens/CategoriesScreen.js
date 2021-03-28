import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import HeaderButton from '../components/HeaderButton'

export default function CategoriesScreen(props) {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          props.navigation.navigate('CategoryMeals', {
            categoryId: itemData.item.id,
          })
        }
      />
    )
  }
  return (
    <FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
  )
}

CategoriesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => {
          navigationData.navigation.toggleDrawer()
        }}
      />
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
