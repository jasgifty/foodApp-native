import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, Switch } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

export default function FiltersScreen(props) {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactosFree, setIsLactosFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isGlutenFree: isGlutenFree,
      isLactosFree: isLactosFree,
      isVegan: isVegan,
      isVegetarian: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactosFree, isVegan, isVegetarian, dispatch]);

  const FilterSwitch = (props) => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.lable}</Text>
        <Switch
          trackColor={{ true: Colors.primary, false: Colors.accent }}
          thumbColor={Colors.primary}
          value={props.state}
          onValueChange={props.onChange}
        />
      </View>
    );
  };

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        lable="Gluten-Free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        lable="Lactos-Free"
        state={isLactosFree}
        onChange={(newValue) => setIsLactosFree(newValue)}
      />
      <FilterSwitch
        lable="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        lable="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
}
FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Filters',
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#f54242',
    },
    headerLeft: () => (
      <HeaderButton
        iconName="ios-menu"
        onPress={() => {
          navigationData.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <HeaderButton
        iconName="ios-search"
        onPress={navigationData.navigation.getParam('save')}
      />
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});
