import React, {useEffect} from 'react';
import {SafeAreaView, Text, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getWeatherApi, setLocation} from '../redux/actions/app';
import {routeName, styles} from '../utils';
navigator.geolocation = require('@react-native-community/geolocation');

export const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      location => {
        dispatch(setLocation(location));
        gotoHome();
      },
      err => {
        ToastAndroid.show('Something went wrong !', ToastAndroid.SHORT);
        gotoHome();
      },
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
    );
  }, []);
  function gotoHome() {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: routeName.HOME}],
      });
    }, 2000);
  }
  return (
    <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={styles.logo}>Weather</Text>
    </SafeAreaView>
  );
};
