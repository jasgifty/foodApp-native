import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
} from 'react-native'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CustomHeaderButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.headerButton}>
        <Ionicons
          name={props.iconName}
          size={23}
          color={
            Platform.OS === 'android'
              ? props.iconName === 'ios-star'
                ? 'red'
                : 'white'
              : Colors.primary
          }
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  headerButton: {
    padding: 10,
  },
})
