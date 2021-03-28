import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  ImageBackground,
} from 'react-native'
import DefaultText from './DefaultText'

export default function MealItem(props) {
  return (
    <TouchableOpacity onPress={props.onSelectMeal}>
      <View style={styles.mealItem}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {props.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <DefaultText>{props.duration}m</DefaultText>
          <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  mealRow: {
    flexDirection: 'row',
    // flex: 1,
  },
  mealHeader: {
    height: '85%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  mealDetail: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
