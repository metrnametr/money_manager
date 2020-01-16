import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Route, NativeRouter } from 'react-router-native';
import { Provider } from 'react-native-paper';

import { AppLoading } from 'expo';

import * as Font from 'expo-font';

import { theme } from './theme';
import { DrawerProvider } from './src/context/DrawerContext';

import AppNavigator from './src/navigation/AppNavigator';

import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';

// const THEME = {
//   colors: {
//     primary: theme.primaryColorDark,
//     disabled: 'white',
//     // placeholder: 'white'
//   },
//   fonts: {
//     regular: 'roboto-regular'
//   }
// }

const loadFont = async () => {
  await Font.loadAsync({
    Ionicons: require('./assets/Ionicons.ttf'),
    MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
    'roboto-light': require('./assets/RobotoCondensed-Light.ttf'),
    'roboto-regular': require('./assets/RobotoCondensed-Regular.ttf'),
    'roboto-bold': require('./assets/RobotoCondensed-Bold.ttf')
  });
};

const App = () => {
  const [ loading, setLoading ] = useState(true);
  const drawer = useRef();

  if (loading) {
    return <AppLoading startAsync={ loadFont } onFinish={ () => setLoading(false) } />;
  }
  console.log(AppNavigator);
  return (
    <View style={ { flex: 1 } }>
      <ReduxProvider store={ store }>
        <DrawerProvider>
          <Provider>
            {/* <BottomNavigation mr="mr" /> */}
            <AppNavigator />
          </Provider>
        </DrawerProvider>
      </ReduxProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default App;
