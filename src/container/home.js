import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/loader';
import {getWeatherApi, setLocation} from '../redux/actions/app';
navigator.geolocation = require('@react-native-community/geolocation');
import {styles} from '../utils';

export const HomeScreen = () => {
  const {location, weather, loading} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (location && location.coords) {
      getWeather(location.coords);
    } else {
      navigator.geolocation.getCurrentPosition(
        location => {
          dispatch(setLocation(location));
          getWeather(location.coords);
        },
        err => {
          Alert.alert(
            'Location Error!',
            "We couldn't access your location. Please check your connection & GPS",
            [
              {
                text: 'Setting',
                onPress: () => {
                  Linking.openSettings();
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {},
              },
            ],
          );
        },
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
  }, []);

  function getWeather(obj) {
    dispatch(getWeatherApi({lat: obj.latitude, lng: obj.longitude}));
  }

  return (
    <SafeAreaView style={styles.box}>
      <Loader loading={loading} />
      <View style={local.main}>
        <Text style={styles.heading}>Delhi</Text>
      </View>
      <View style={local.main}>
        <FlatList
          data={[1, 2]}
          keyExtractor={(item, index) => index + 'Forecast'}
          renderItem={() => {
            <View style={local.listView}></View>;
          }}
          ItemSeparatorComponent={() => {
            return <View />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const local = StyleSheet.create({
  main: {
    flex: 1,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seprator: {
    height: 0,
    borderWidth: 1,
    width: '100%',
  },
});
