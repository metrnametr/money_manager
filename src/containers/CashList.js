import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux';
import CashItem from '../components/CashItem';

import { theme } from '../../theme';
import { REMOVE_WALLET } from '../actions/types';

const { Section, Subheader } = List;

const CashList = (props) => {
  const { wallets, title, goToEditWallet, style } = props;
  const [ openControl, setOpenControl ] = useState(false);

  const dispatch = useDispatch();

  const removeItem = (id) => {
    dispatch({
      type: REMOVE_WALLET,
      payload: {
        id
      }
    });
  };

  return (
    <Section style={ { ...styles.list, style } }>
      <Subheader style={ styles.titleList }>{title}</Subheader>
      {/* <CashItem title="Title" icon="wallet" />
        <CashItem title="Title" icon="wallet" /> */}
      <SwipeListView
        data={ wallets }
        renderItem={ ({ item }, rowMap) => (
          <CashItem
            title={ item.title }
            cash={ item.cash }
            typeCurrency={ item.typeCurrency }
            description={ item.description }
            icon="wallet"
          />
        ) }
        renderHiddenItem={ ({ item }, rowMap) => (
          <View style={ { ...styles.rowBack } }>
            <View style={ styles.rowBackLeft }>
              <IconButton
                icon="circle-edit-outline"
                color={ theme.primaryColor }
                onPress={ () => goToEditWallet(item.id) }
              />
            </View>
            <View>
              <IconButton icon="close" color={ theme.dangerColor } onPress={ () => removeItem(item.id) } />
            </View>
          </View>
        ) }
        // leftOpenValue={ 75 }
        rightOpenValue={ -100 }
        previewOpenValue={ -40 }
        onRowClose={ () => setOpenControl(false) }
        onRowOpen={ () => setOpenControl(true) }
      />
      {/* {wallets.map((item) => (
        <CashItem title={ item.title } cash={ item.cash } typeCurrency={ item.typeCurrency } description={ item.description } icon="wallet" />
      ))} */}
    </Section>
  );
};

const styles = StyleSheet.create({
  list: {},
  titleList: {
    color: 'white'
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    // borderBottomColor: '#eee',
    // borderBottomWidth: 0.5,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  rowBackLeft: {
    // padding: 10
    // borderColor: 'white',
    // borderWidth: .5,
  },
  trash: {}
});

export default CashList;
