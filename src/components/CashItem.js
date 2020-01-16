import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import getSymbolFromCurrency from 'currency-symbol-map';
import numeral from 'numeral';
import { theme } from '../../theme';

import AppTextLight from './ui/AppTextLight';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { rightCashSymbol } from '../rightCashSymbol';

const { Item, Icon } = List;

const CashItem = (props) => {
  const { title, icon, cash, typeCurrency, description } = props;
  return (
    <View style={ styles.listItemContainer }>
      <Item
        style={ styles.listItem }
        titleStyle={ { color: 'white' } }
        title={ title }
        left={ () => <AntIcon size={ 28 } style={ styles.itemIcon } name={ icon } color={ theme.primaryColor } /> }
        right={ () => (
          <AppTextLight style={ styles.countText } numberOfLines={ 1 }>
            {rightCashSymbol(typeCurrency, cash)}
          </AppTextLight>
        ) }
        description={ description || 'Not yet' }
        descriptionStyle={ { color: theme.primaryColor } }
        titleNumberOfLines={ 1 }
        descriptionNumberOfLines={ 1 }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255, .7)',
    marginBottom: 5,
    borderRadius: 3
  },
  countText: {
    // color: 'white',
    paddingBottom: 10,
    fontSize: 20,
    letterSpacing: 1,
    alignSelf: 'flex-end',
    color: theme.primaryColor
  },
  listItem: {
    width: '100%',
    color: 'white'
  },
  itemIcon: {
    backgroundColor: 'transparent',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'center'
  }
});

export default CashItem;
