import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CashList from '../containers/CashList';
import NavBar from '../components/NavBar';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { theme } from '../../theme';
import AppHeaderIcon from '../components/ui/AppHeaderIcon';
import AppText from '../components/ui/AppText';

import { LinearGradient } from 'expo-linear-gradient';

// const wallets = [
//   {
//     id: '1',
//     title: 'Наличные',
//     cash: 7444,
//     typeCurrency: 'USD',
//     typeCash: 'money',
//     description: 'Мой самый первый кошелек',
//     icon: 'money',
//     categories: [
//       {

//       }
//     ]
//   }
// ];

const CashScreen = (props) => {
  const { navigation } = props;
  const { navigate, setParams } = navigation;
  const { wallets } = useSelector((state) => state.cash);

  const walletsMoney = wallets.filter((itm) => itm.typeCash === 'money');
  const walletsCredit = wallets.filter((itm) => itm.typeCash === 'credit');

  const goToEditWallet = (id) => {
    navigate('AddCashScreen', { walletId: id });
  };

  return (
    <View style={ { backgroundColor: theme.mainColorDark, flex: 1 } }>
      <NavBar title="cash screen" />
      <View style={ { flex: 4, backgroundColor: theme.mainColor } }>
        <LinearGradient
          colors={ [
            // '#a770ef',
            // '#cf8bf3',
            // '#fdb99b'

            // '#3494e6',
            // '#ec6ead',

            // '#43c6ac',
            // '#191654',

            '#c33764',
            '#1d2671'
          ] }
          style={ { flex: 4, paddingTop: 110 } }
        >
          <ScrollView style={ { flex: 1 } }>
            {walletsMoney.length ? (
              <CashList goToEditWallet={ goToEditWallet } wallets={ walletsMoney } title="Счета" />
            ) : null}
            {walletsCredit.length ? (
              <CashList goToEditWallet={ goToEditWallet } wallets={ walletsCredit } title="Накопления" />
            ) : null}
            {!wallets.length ? (
              <View style={ { marginTop: 20, alignItems: 'center', justifyContent: 'center' } }>
                <AppText style={ { color: 'white', fontSize: 20 } }>Нет счетов</AppText>
              </View>
            ) : null}
          </ScrollView>
        </LinearGradient>
      </View>

      <FAB style={ styles.fab } icon="plus" onPress={ () => navigate('AddCashScreen') } />
    </View>
  );
};

CashScreen.navigationOptions = ({ navigation }) => {
  return {
    header: null,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
        <Item title="goBack" iconName="md-menu" onPress={ () => navigation.goBack() } />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 64,
    right: 0,
    bottom: 0,
    // flex: 1,
    backgroundColor: theme.primaryColorDark
  }
});

export default CashScreen;
