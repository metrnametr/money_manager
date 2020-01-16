import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MainScreen from '../screens/MainScreen';
import CashScreen from '../screens/CashScreen';

import CreateBankScreen from '../screens/CreateBankScreen';

import { theme } from '../../theme';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        // headerLeft:(<Button onPress={() => navigation.openDrawer()} title="qwe" />),
        // header: null
      })
    }
  },
  {
    ...config,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.mainColorDark
      }
    }
  }
);

MainStack.navigationOptions = {
  tabBarLabel: 'Transaction',
  tabBarIcon: ({ focused }) => (
    <AntIcon
      // focused={focused}
      name="sync"
      color="white"
      size={ 16 }
    />
  ),
  activeColor: 'white',
  barStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: '91%',
    left: 0,
    right: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  }
};

MainStack.path = '';

const CashStack = createStackNavigator(
  {
    Cash: {
      screen: CashScreen,
      navigationOptions: () => ({
        // header: null,
      })
    },
    AddCashScreen: {
      screen: CreateBankScreen
    }
  },
  {
    ...config,
    initialRouteName: 'Cash',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.mainColorDark
      }
    }
  }
);

CashStack.navigationOptions = ({ navigation, focused }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: 'Bank',
    tabBarIcon: () => (
      <AntIcon
        // focused={focused}
        name="bank"
        color="white"
        size={ 16 }
      />
    ),
    tabBarVisible,
    barStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: '91%',
      left: 0,
      right: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  };
};

CashStack.path = '';

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Main: { screen: MainStack },
    Cash: { screen: CashStack }
  },
  {
    shifting: true,
    barStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      paddingTop: 20
    }
  }
);

export default MainTabNavigator;
