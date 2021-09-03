import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {getCurrentPosition, styles} from '../utils';

export const SplashScreen = () => {
  useEffect(() => {
    getCurrentPosition();
  }, []);
  return (
    <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={styles.logo}>Weather</Text>
    </SafeAreaView>
  );
};
