import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { theme } from '../../theme.js';
import CategoryItem from '../components/CategoryItem';
import CurrencyCircle from '../components/CurrencyCircle';
import { useSelector } from 'react-redux';

const transactions = [
  {
    id: '1',
    type: 'expenses',
    count: 100,
    date: moment().locale('ru').format('dd, DD MMMM YYYY'),
    categoryId: '7',
    senderCashId: '1'
  },
  {
    id: '2',
    type: 'expenses',
    count: 100,
    date: moment().subtract(Math.abs(-1), 'days').locale('ru').format('dd, DD MMMM YYYY'),
    categoryId: '3',
    senderCashId: '1'
  },
  {
    id: '3',
    type: 'finance',
    count: 100,
    date: moment().subtract(Math.abs(-1), 'days').locale('ru').format('dd, DD MMMM YYYY'),
    categoryId: '8',
    senderCashId: '1'
  }
];

const ContainerCurrency = ({ categories, toggleCategory, finance }) => {
  const { date } = useSelector((state) => state.currentDate);
  const filterTransations = transactions.filter(({ type }) => (finance ? type === 'expenses' : type === 'finance'));
  const newCategories = categories.reduce((categoriesAcc, category) => {
    const newFillterTransactions = filterTransations.filter(
      (filterTransation) => filterTransation.categoryId === category.id && filterTransation.date === date
    );
    return [
      ...categoriesAcc,
      {
        ...category,
        transactions: newFillterTransactions
      }
    ];
  }, []);

  const financeCount = transactions.reduce(
    (sum, item) => (item.type === 'finance' && item.date === date ? sum + item.count : sum + 0),
    0
  );
  const expensesCount = transactions.reduce(
    (sum, item) => (item.type === 'expenses' && item.date === date ? sum + item.count : sum + 0),
    0
  );
  return (
    <View style={ styles.container }>
      <View style={ styles.rowContainer }>
        {newCategories
          .slice(0, 4)
          .map((category) => (
            <CategoryItem
              key={ category.id }
              title={ category.title }
              icon={ category.icon }
              count={ category.count }
              color={ category.color }
              transactions={ category.transactions }
            />
          ))}
      </View>

      <View style={ styles.columnContainer }>
        <View style={ { justifyContent: 'space-around' } }>
          {newCategories
            .slice(4, 6)
            .map((category) => (
              <CategoryItem
                key={ category.id }
                title={ category.title }
                icon={ category.icon }
                count={ category.count }
                color={ category.color }
                transactions={ category.transactions }
              />
            ))}
        </View>
        <CurrencyCircle
          financeCount={ financeCount }
          expensesCount={ expensesCount }
          finance={ finance }
          toggleCategory={ toggleCategory }
        />
        <View style={ { justifyContent: 'space-around' } }>
          {newCategories
            .slice(6, 8)
            .map((category) => (
              <CategoryItem
                key={ category.id }
                title={ category.title }
                icon={ category.icon }
                count={ category.count }
                color={ category.color }
                transactions={ category.transactions }
              />
            ))}
        </View>
      </View>

      <View style={ styles.rowContainer }>
        {newCategories
          .slice(8, 12)
          .map((category) => (
            <CategoryItem
              key={ category.id }
              title={ category.title }
              icon={ category.icon }
              count={ category.count }
              color={ category.color }
              transactions={ category.transactions }
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    // flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    // paddingVertical: 5,
    // backgroundColor: theme.mainColor,
    paddingTop: 110,
    paddingBottom: 60
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative'
  },
  columnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default ContainerCurrency;
