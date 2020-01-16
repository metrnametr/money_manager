import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { rightCashSymbol } from '../rightCashSymbol';

const CurrencyCircle = ({ toggleCategory, finance, financeCount, expensesCount }) => {
  const title = finance ? 'Расходы' : 'Доходы';
  // const financeCount = 111;
  // const expensesCount = 222;
  return (
    <TouchableOpacity onPress={ toggleCategory } style={ styles.circle }>
      <View style={ styles.circle }>
        <Text style={ styles.title }>{title}</Text>
        <Text style={ { ...styles.finance, color: finance ? theme.dangerColor : theme.primaryColor } }>
          {rightCashSymbol('USD', finance ? expensesCount : financeCount)}
        </Text>
        <Text style={ { ...styles.expenses, color: finance ? theme.primaryColor : theme.dangerColor } }>
          {rightCashSymbol('USD', finance ? financeCount : expensesCount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    // width: Dimensions.get('window').width * 0.17,
    // height: Dimensions.get('window').width * 0.17,
    // backgroundColor: theme.orangeColor,
    // margin: 5,
    // borderRadius: Dimensions.get('window').width * 0.17,
    // position: "absolute",
    // left: Dimensions.get('window').width * 0.24,
    // top: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'tra',
    borderWidth: 10,
    borderColor: theme.primaryColor
  },
  text: {
    color: theme.purpleColor,
    fontSize: 20,
    fontWeight: '100',
    fontFamily: 'roboto-light'
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '100',
    fontFamily: 'roboto-regular'
  },
  finance: {
    fontSize: 20,
    color: theme.primaryColor
  },
  expenses: {
    fontSize: 16,
    color: theme.dangerColor,
    opacity: 0.7
  }
});

export default CurrencyCircle;
