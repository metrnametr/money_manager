import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

import AppTextBold from './ui/AppTextBold';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { TOGGLE_CURRENT_DATE } from '../actions/types';

const TimerSlider = () => {
  const [ startTime, setStartTime ] = useState(0);
  const { date } = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();

  const prevDate = moment().subtract(Math.abs(startTime), 'days').locale('ru').format('dd, DD MMMM YYYY');
  const nextDate = moment().add(startTime, 'days').locale('ru').format('dd, DD MMMM YYYY');

  const toggleTime = (newTime) => {
    setStartTime(newTime);
    if (!newTime) {
      dispatch({
        type: TOGGLE_CURRENT_DATE,
        payload: {
          date: moment().locale('ru').format('dd, DD MMMM YYYY')
        }
      });
      return;
    }
    if (newTime < 0) {
      dispatch({
        type: TOGGLE_CURRENT_DATE,
        payload: {
          date: moment().subtract(Math.abs(newTime), 'days').locale('ru').format('dd, DD MMMM YYYY')
        }
      });
      return;
    }
    dispatch({
      type: TOGGLE_CURRENT_DATE,
      payload: {
        date: moment().add(newTime, 'days').locale('ru').format('dd, DD MMMM YYYY')
      }
    });
  };

  // console.log(startTime)

  return (
    <View style={ styles.container }>
      <AntIcon
        color="white"
        size={ 18 }
        style={ styles.iconButton }
        name="left"
        onPress={ () => toggleTime(startTime - 1) }
      />
      <AppTextBold>{date}</AppTextBold>
      <AntIcon
        color="white"
        size={ 18 }
        style={ styles.iconButton }
        name="right"
        onPress={ () => toggleTime(startTime + 1) }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: theme.mainColorDark,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  iconButton: {
    color: 'white'
  }
});

export default TimerSlider;
