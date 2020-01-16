import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CreateBankForm from '../containers/CreateBankForm';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { theme } from '../../theme';
import AppHeaderIcon from '../components/ui/AppHeaderIcon';
import { ADD_WALLET, SET_WALLET } from '../actions/types';

const CreateBankScreen = (props) => {
  const [ wallet, setWallet ] = useState(null);
  const { navigation } = props;
  const dispatch = useDispatch();
  const saveForm = (saveItem, edit) => {
    if (edit) {
      dispatch({
        type: SET_WALLET,
        payload: {
          wallet: saveItem
        }
      });
    } else {
      dispatch({
        type: ADD_WALLET,
        payload: {
          wallet: saveItem
        }
      });
    }
    navigation.goBack();
  };

  const { wallets } = useSelector((state) => state.cash);

  useEffect(() => {
    const walletId = navigation.getParam('walletId');
    if (walletId) {
      const wallet = wallets.find((item) => item.id === walletId);
      setWallet(wallet);
    }
    navigation.setParams({ save: saveForm });
  }, []);

  return (
    <View style={ styles.container }>
      {/* <NavBar title="Create bank" /> */}
      <CreateBankForm wallet={ wallet } navigation={ navigation } />
    </View>
  );
};

CreateBankScreen.navigationOptions = ({ navigation }) => {
  const save = navigation.getParam('save');
  const wallet = navigation.getParam('wallet');
  const edit = navigation.getParam('edit');
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
        <Item title="check" iconName="md-checkmark" onPress={ () => save(wallet, edit) } />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
        <Item title="goBack" iconName="md-arrow-round-back" onPress={ () => navigation.goBack() } />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor
    // paddingHorizontal: 10
  }
});

export default CreateBankScreen;
