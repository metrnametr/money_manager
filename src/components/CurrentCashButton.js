import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { rightCashSymbol } from '../rightCashSymbol';

const CurrentCashButton = ({ onPress, title }) => {
  const { currentWalletId, wallets } = useSelector((state) => state.cash);
  const walletItem = currentWalletId
    ? wallets.find((wallet) => wallet.id === currentWalletId)
    : {
      cash: wallets.reduce((sumCash, { cash }) => sumCash + cash, 0),
      title: 'Общий баланс',
      typeCurrency: 'USD'
    };
  return (
    <TouchableOpacity onPress={ onPress }>
      <View style={ styles.wrapper }>
        <View style={ styles.container }>
          <Text style={ { color: 'white' } }>{walletItem && walletItem.title}</Text>
          <Icon name="arrow-drop-down" color="white" size={ 18 } />
        </View>

        <Text style={ { color: 'white', fontSize: 16 } }>
          {rightCashSymbol(walletItem.typeCurrency, walletItem.cash)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'center'
  }
});

export default CurrentCashButton;
