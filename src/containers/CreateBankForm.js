import React, { useState, useRef, useEffect, useCallback } from 'react';
import numeral from 'numeral';
import { keys, map, isEmpty } from 'lodash';
import getSymbolFromCurrency from 'currency-symbol-map';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Portal, Dialog, List, Switch, IconButton } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const { block, set, greaterThan, lessThan, Value, cond, sub } = Animated;

import { theme } from '../../theme';

import AppText from '../components/ui/AppText';
import AppRadioButton from '../components/ui/AppRadioButton';

const typeOfCash = {
  money: 'Кошелек',
  credit: 'Накопления'
};

const currencyType = {
  USD: 'Доллар',
  EUR: 'Евро',
  RUB: 'Российский рубль',
  BYN: 'Белорусский рубль'
};

const ModalTypeCash = ({ visibleChangeType, checkedTypeCash, setCheckedTypeCash, setVisibleChangeType }) => {
  const checkAndDismiss = (value) => {
    setCheckedTypeCash(value);
    setVisibleChangeType(false);
  };
  return (
    <Portal>
      <Dialog
        style={ { backgroundColor: theme.mainColorDark } }
        visible={ visibleChangeType }
        onDismiss={ () => setVisibleChangeType(false) }
      >
        <Dialog.Title style={ styles.dialogTitle }>Тип кошелька</Dialog.Title>
        <Dialog.Content>
          {/* {map(keys(currencyType), (key) => <AppRadioButton key={key} checked={ checkedTypeCash } value={key} text={currencyType[key]} onPress={ () => setCheckedTypeCash(key) } />)} */}
          <AppRadioButton
            checked={ checkedTypeCash }
            value="money"
            text="Счет"
            onPress={ (value) => checkAndDismiss(value) }
          />
          <AppRadioButton
            checked={ checkedTypeCash }
            value="credit"
            text="Накопления"
            onPress={ (value) => checkAndDismiss(value) }
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const ModalTypeCurrency = ({
  visibleChangeCurrency,
  checkedTypeCurrency,
  setCheckedTypeCurrency,
  setVisibleChangeCurrency
}) => {
  const [ checkItem, setCheckItem ] = useState(checkedTypeCurrency);
  const successModal = () => {
    setCheckedTypeCurrency(checkItem);
    setVisibleChangeCurrency(false);
  };
  return (
    <Portal>
      <Dialog
        style={ { backgroundColor: theme.mainColorDark } }
        visible={ visibleChangeCurrency }
        onDismiss={ () => setVisibleChangeCurrency(false) }
        style={ { flex: 1, backgroundColor: theme.mainColorDark } }
      >
        <Dialog.Title style={ styles.dialogTitle }>Валюта счета</Dialog.Title>
        <Dialog.Content style={ { flex: 3 } }>
          <View style={ { flex: 1 } }>
            <Dialog.ScrollArea>
              <ScrollView>
                {map(keys(currencyType), (key) => (
                  <AppRadioButton
                    key={ key }
                    checked={ checkItem }
                    value={ key }
                    text={ currencyType[key] }
                    onPress={ () => setCheckItem(key) }
                  />
                ))}
              </ScrollView>
            </Dialog.ScrollArea>
          </View>
          {/* <AppRadioButton checked={ checkedTypeCurrency } value="money" text="Счет" onPress={ (value) => setCheckedTypeCurrency(value) } />
          <AppRadioButton checked={ checkedTypeCurrency } value="credit" text="Накопления" onPress={ (value) => setCheckedTypeCurrency(value) } /> */}
        </Dialog.Content>
        <Dialog.Actions style={ { borderTopWidth: 0.2, borderTopColor: '#999' } }>
          <IconButton icon="check" size={ 30 } color={ theme.primaryColorDark } onPress={ successModal } />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const ModalDesription = ({ visibleDescription, toggleDescription, descriptionValue, setDescriptionValue }) => {
  const [ value, setValue ] = useState(descriptionValue);
  const successModal = () => {
    setDescriptionValue(value);
    toggleDescription(false);
  };
  return (
    <Portal>
      <Dialog
        style={ { backgroundColor: theme.mainColorDark } }
        visible={ visibleDescription }
        onDismiss={ () => toggleDescription(false) }
      >
        <Dialog.Title style={ styles.dialogTitle }>Описание</Dialog.Title>
        <Dialog.Content>
          <TextInput
            underlineColor={ theme.primaryColor }
            theme={ {
              colors: {
                primary: theme.primaryColorDark,
                text: 'white',
                placeholder: theme.primaryColor
              }
            } }
            value={ value }
            style={ { backgroundColor: theme.mainColorDark } }
            onChangeText={ setValue }
          />
        </Dialog.Content>
        <Dialog.Actions>
          <IconButton icon="check" size={ 30 } color={ theme.primaryColorDark } onPress={ successModal } />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const { Section, Subheader, Item } = List;

const CreateBankForm = (props) => {
  const { navigation, wallet } = props;

  const [ visibleChangeType, setVisibleChangeType ] = useState(false);
  const [ visibleDescription, setVisibleDescription ] = useState(false);
  const [ visibleChangeCurrency, setVisibleChangeCurrency ] = useState(false);

  const [ titleValue, setTitleValue ] = useState('');
  const [ descriptionValue, setDescriptionValue ] = useState('');
  const [ checkedTypeCash, setCheckedTypeCash ] = useState('money');
  const [ checkedTypeCurrency, setCheckedTypeCurrency ] = useState('USD');

  useEffect(
    () => {
      if (!isEmpty(wallet)) {
        const { title, description, typeCash, typeCurrency } = wallet;
        setTitleValue(title);
        setDescriptionValue(description);
        setCheckedTypeCash(typeCash);
        setCheckedTypeCurrency(typeCurrency);
      }
    },
    [ wallet ]
  );

  useEffect(
    () => {
      navigation.setParams({
        wallet: {
          id: wallet ? wallet.id : Math.random().toString(),
          title: titleValue,
          cash: Math.ceil(Math.random() * 100),
          typeCurrency: checkedTypeCurrency,
          typeCash: checkedTypeCash,
          description: descriptionValue,
          icon: 'money',
          categories: [ {} ]
        },
        edit: !isEmpty(wallet)
      });
    },
    [ titleValue, descriptionValue, checkedTypeCash, checkedTypeCurrency ]
  );

  const bottomRef = useRef();
  const trans = new Value(0);
  const untraversedPos = new Value(0);
  const prevTrans = new Value(0);
  const headerPos = block([
    cond(lessThan(untraversedPos, sub(trans, 100)), set(untraversedPos, sub(trans, 100))),
    cond(greaterThan(untraversedPos, trans), set(untraversedPos, trans)),
    set(prevTrans, trans),
    untraversedPos
  ]);

  const renderBottomSheetContent = () => (
    <Animated.View
      style={ {
        height: '100%',
        padding: 20,
        backgroundColor: '#2c2c2fAA',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        transform: [
          {
            translateY: headerPos
          }
        ]
      } }
    >
      <AppText>Text</AppText>
    </Animated.View>
  );
  return (
    <View style={ { ...styles.form, flex: 4 } }>
      <TextInput
        label="Название"
        style={ { ...styles.input, paddingHorizontal: 10 } }
        mode="outlined"
        onChangeText={ setTitleValue }
        value={ titleValue }
        theme={ {
          colors: {
            primary: theme.primaryColorDark,
            text: 'white',
            placeholder: theme.primaryColor
          }
        } }
      />
      <View style={ { flex: 4 } }>
        <ScrollView snapToStart={ true } snapToOffsets={ [ -10 ] }>
          <Section style={ styles.list }>
            <Subheader style={ styles.listTitle }>Счет</Subheader>
            <Item
              onPress={ () => setVisibleChangeType(true) }
              style={ styles.listItem }
              titleStyle={ { color: 'white' } }
              title="Тип"
              description={ typeOfCash[checkedTypeCash] }
              descriptionStyle={ styles.descriptionList }
            />
            <Item
              onPress={ () => setVisibleChangeCurrency(true) }
              style={ styles.listItem }
              titleStyle={ { color: 'white' } }
              title="Валюта"
              description={ `${checkedTypeCurrency} ${getSymbolFromCurrency(checkedTypeCurrency)}` }
              descriptionStyle={ styles.descriptionList }
            />
            <Item
              onPress={ () => setVisibleDescription(true) }
              style={ { ...styles.listItem, borderBottomWidth: 0 } }
              titleStyle={ { color: 'white' } }
              title="Описание"
              description={ descriptionValue || '...' }
              descriptionNumberOfLines={ 1 }
              descriptionStyle={ styles.descriptionList }
            />
          </Section>
          <Section style={ styles.list }>
            <Subheader style={ styles.listTitle }>Баланс</Subheader>
            <Item
              onPress={ () => setVisibleChangeType(true) }
              style={ { ...styles.listItem, paddingBottom: 15 } }
              titleStyle={ { color: 'white' } }
              title="Остаток на счете"
              right={ () => (
                <AppText
                  style={ {
                    alignSelf: 'center',
                    fontSize: 20
                  } }
                >
                  {getSymbolFromCurrency(checkedTypeCurrency)}
                  {numeral(1200).format('0,00')}
                </AppText>
              ) }
            />
            <Item
              onPress={ () => setVisibleChangeType(true) }
              style={ { ...styles.listItem, paddingBottom: 15 } }
              titleStyle={ { color: 'white' } }
              title="Кредитный лимит"
              right={ () => (
                <AppText
                  style={ {
                    alignSelf: 'center',
                    fontSize: 20
                  } }
                >
                  {getSymbolFromCurrency(checkedTypeCurrency)}
                  {numeral(1200).format('0,00')}
                </AppText>
              ) }
            />
            <Item
              onPress={ () => setVisibleChangeType(true) }
              style={ { ...styles.listItem, borderBottomWidth: 0, paddingBottom: 15 } }
              titleStyle={ { color: 'white' } }
              title="Учитывать в общем балансе"
              right={ () => <Switch /> }
            />
          </Section>
        </ScrollView>
      </View>
      <ModalTypeCash
        visibleChangeType={ visibleChangeType }
        checkedTypeCash={ checkedTypeCash }
        setCheckedTypeCash={ setCheckedTypeCash }
        setVisibleChangeType={ setVisibleChangeType }
      />
      <ModalTypeCurrency
        visibleChangeCurrency={ visibleChangeCurrency }
        checkedTypeCurrency={ checkedTypeCurrency }
        setCheckedTypeCurrency={ setCheckedTypeCurrency }
        setVisibleChangeCurrency={ setVisibleChangeCurrency }
      />
      <ModalDesription
        visibleDescription={ visibleDescription }
        toggleDescription={ setVisibleDescription }
        descriptionValue={ descriptionValue }
        setDescriptionValue={ setDescriptionValue }
      />
      <BottomSheet
        ref={ bottomRef }
        snapPoints={ [ 600, 0, 100, -1000 ] }
        renderContent={ renderBottomSheetContent }
        // renderHeader = { renderBottomSheetHeader }
        borderRadius={ 50 }
        contentPosition={ trans }
        initialSnap={ 3 }
        enabledGestureInteraction={ false }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 10
  },
  input: {
    borderRadius: 10,
    // borderColor: theme.orangeColor,
    backgroundColor: theme.mainColor
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItem: {
    color: 'white',
    borderBottomColor: '#999',
    borderBottomWidth: 0.2
  },
  descriptionList: {
    color: theme.primaryColor
  },
  list: {
    backgroundColor: theme.mainColorDark
    // paddingBottom: 10,
  },
  listTitle: {
    color: 'white'
  },
  dialogTitle: {
    color: 'white'
  }
});

export default CreateBankForm;
