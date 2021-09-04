import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/store';
import {colors, routeName} from './utils';
import {HomeScreen, SplashScreen} from './container';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar
            backgroundColor={colors.transparent}
            barStyle={'light-content'}
            translucent={true}
            hidden={true}
          />
          <Stack.Navigator headerMode={'none'} keyboardHandlingEnabled={true}>
            <Stack.Screen name={routeName.SPLASH} component={SplashScreen} />
            <Stack.Screen name={routeName.HOME} component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
