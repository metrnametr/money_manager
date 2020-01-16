import React from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-ionicons';
import { theme } from '../../theme.js';
import { rightCashSymbol } from '../rightCashSymbol.js';

const Count = ({ count, color }) => (
  <View style={ styles.containerCount }>
    <Text style={ { color, fontWeight: '900' } }>{rightCashSymbol('USD', count)}</Text>
  </View>
);

const CategoryItem = (props) => {
  const { icon = 'add', title = 'Здоровье', count = '50', color = theme.orangeColor, transactions = [] } = props;
  const sumCount = transactions.reduce((sum, transaction) => sum + transaction.count, 0);
  return (
    <TouchableOpacity onPress={ () => console.log('1') } activeOpacity={ 1 }>
      <View style={ { ...styles.container, opacity: sumCount > 0 ? 1 : 0.3 } }>
        <Text numberOfLines={ 1 } ellipsizeMode="tail" style={ styles.text }>
          {title}
        </Text>
        <Count color={ '#ccc' } count={ count } />
        <View style={ [ styles.icon, { backgroundColor: color } ] }>
          <Icon name={ icon } ios={ `ios-${icon}` } android={ `md-${icon}` } size={ 25 } color="white" />
        </View>
        <Count color={ color } count={ sumCount } />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10
  },
  containerCount: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  icon: {
    width: Dimensions.get('window').width * 0.14,
    height: Dimensions.get('window').width * 0.14,
    margin: 5,
    borderRadius: Dimensions.get('window').width * 0.14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 12,
    maxWidth: Dimensions.get('window').width * 0.15,
    paddingTop: 3
  }
});
export default CategoryItem;
