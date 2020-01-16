import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NavBar from '../components/NavBar';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { theme } from '../../theme';
import AppHeaderIcon from '../components/ui/AppHeaderIcon';
import ContainerCategory from '../containers/ContainerCategory';
import moment from 'moment';

import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  {
    id: '1',
    icon: 'drive-eta',
    type: 'expenses',
    title: 'Автомобиль',
    color: '#FF9800',
    count: 50
  },
  {
    id: '2',
    icon: 'home',
    type: 'expenses',
    title: 'Дом',
    color: '#FF5722',
    count: 150
  },
  {
    id: '3',
    icon: 'local-dining',
    type: 'expenses',
    title: 'Еда',
    color: '#607D8B',
    count: 17000
  },
  {
    id: '4',
    icon: 'local-taxi',
    type: 'expenses',
    title: 'Такси',
    color: '#4CAF50',
    count: 1700
  },
  {
    id: '5',
    icon: 'local-pizza',
    type: 'expenses',
    title: 'Пицца',
    color: '#8BC34A',
    count: 11700
  },
  {
    id: '6',
    icon: 'child-friendly',
    type: 'expenses',
    title: 'Дети',
    color: '#F44336',
    count: 700
  },
  {
    id: '7',
    icon: 'public',
    type: 'expenses',
    title: 'Мир',
    color: '#03A9F4',
    count: 700
  },
  {
    id: '8',
    type: 'expenses',
    icon: 'shopping-cart',
    title: 'Покупки',
    color: '#673AB7',
    count: 700
  },

  {
    id: '5',
    icon: 'local-pizza',
    type: 'expenses',
    title: 'Пицца',
    color: '#8BC34A',
    count: 11700
  },
  {
    id: '6',
    icon: 'child-friendly',
    type: 'expenses',
    title: 'Дети',
    color: '#F44336',
    count: 700
  },
  {
    id: '7',
    icon: 'public',
    type: 'expenses',
    title: 'Мир',
    color: '#03A9F4',
    count: 700
  },
  {
    id: '8',
    type: 'expenses',
    icon: 'shopping-cart',
    title: 'Покупки',
    color: '#673AB7',
    count: 700
  }
];

const categoriesFinance = [
  {
    id: '8',
    type: 'finance',
    icon: 'credit-card',
    title: 'Зарплата',
    color: theme.primaryColorDark,
    count: 700
  }
];

const MainScreen = (props) => {
  const [ typeCategory, setTypeCategory ] = useState(true);
  return (
    <View style={ { backgroundColor: theme.mainColorDark, flex: 1 } }>
      <LinearGradient
        colors={ [
          // '#a770ef',
          // '#cf8bf3',
          // '#fdb99b'

          // '#3494e6',
          // '#ec6ead',

          '#43c6ac',
          '#191654'
        ] }
        style={ { flex: 4 } }
      >
        <NavBar title="Transations Screen" />
        <ContainerCategory
          finance={ typeCategory }
          categories={ typeCategory ? categories : categoriesFinance }
          toggleCategory={ () => setTypeCategory(!typeCategory) }
        />
      </LinearGradient>
    </View>
  );
};

MainScreen.navigationOptions = ({ navigation }) => {
  return {
    header: null,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
        <Item title="goBack" iconName="md-menu" onPress={ () => navigation.goBack() } />
        {/* <HiddenItem title="hidden in overflow menu" onPress={ () => alert('hidden in overflow') } /> */}
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
    // backgroundColor: theme.mainColorDark
  }
});

export default MainScreen;
