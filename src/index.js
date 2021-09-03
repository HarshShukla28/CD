import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from './utils';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.transparent}
          barStyle={'light-content'}
          translucent={true}
          hidden={true}
        />
        <Stack.Navigator
          headerMode={'none'}
          keyboardHandlingEnabled={true}></Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
