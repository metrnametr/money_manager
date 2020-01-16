import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

const { Item } = Menu;

import CurrentCashButton from '../components/CurrentCashButton';
import CashItem from '../components/CashItem';
import CashList from './CashList';
import { theme } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { rightCashSymbol } from '../rightCashSymbol';
import { TOGGLE_CURRENT_WALLET } from '../actions/types';

const MenuItem = ({ title, icon, cash, typeCurrency, onPress }) => (
  <TouchableOpacity onPress={ onPress }>
    <View style={ styles.walletItem }>
      <View style={ styles.iconContainer }>
        <AntIcon size={ 24 } name={ icon } color="white" />
      </View>

      <View>
        <View>
          <Text style={ styles.text }>{title}</Text>
        </View>
        <View>
          <Text style={ styles.text }>{rightCashSymbol(typeCurrency, cash)}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const MenuCurrentCash = (props) => {
  const [ visible, setVisible ] = useState(false);
  const { wallets } = useSelector((state) => state.cash);
  const dispatch = useDispatch();
  const allCash = wallets.reduce((sumCash, { cash }) => sumCash + cash, 0);

  const toggleCurrentWallet = (id) => {
    dispatch({
      type: TOGGLE_CURRENT_WALLET,
      payload: {
        id
      }
    });
    setVisible(false);
  };

  return (
    <Menu
      visible={ visible }
      onDismiss={ () => setVisible(false) }
      style={ styles.menu }
      contentStyle={ styles.menu }
      anchor={ <CurrentCashButton onPress={ () => setVisible(true) } /> }
    >
      <ScrollView style={ styles.scroll }>
        <MenuItem
          cash={ allCash }
          title="Все деньги"
          icon="database"
          typeCurrency="USD"
          onPress={ () => toggleCurrentWallet(null) }
        />
        {wallets.map((wallet) => (
          <MenuItem
            key={ wallet.id }
            cash={ wallet.cash }
            title={ wallet.title }
            icon={ wallet.icon }
            typeCurrency={ wallet.typeCurrency }
            onPress={ () => toggleCurrentWallet(wallet.id) }
          />
        ))}
      </ScrollView>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: theme.mainColorDark
  },
  menuItem: {
    backgroundColor: theme.mainColor,
    color: 'white',
    marginBottom: 0,
    paddingBottom: 0
  },
  menuItemBottom: {
    paddingTop: 0,
    marginTop: 0
  },
  text: {
    color: 'white'
  },
  walletItem: {
    width: Dimensions.get('window').width * 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  iconContainer: {
    marginRight: 15
  },
  scroll: {
    maxHeight: Dimensions.get('window').height * 0.4
  }
});
export default MenuCurrentCash;
