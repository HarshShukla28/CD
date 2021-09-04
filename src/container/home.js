import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Linking,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../components/loader';
import {getWeatherApi, setLocation} from '../redux/actions/app';
import moment from 'moment';
navigator.geolocation = require('@react-native-community/geolocation');
import {colors, images, styles} from '../utils';

export const HomeScreen = () => {
  const {location, weather, loading} = useSelector(state => state);
  const [detail, setDetail] = useState(-1);
  const height = useRef(new Animated.Value(0)).current;
  const conHeight = useRef(new Animated.Value(0)).current;
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
    dispatch(
      getWeatherApi({lat: obj.latitude, lng: obj.longitude}, () => {
        Animated.timing(conHeight, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
          }
        });
      }),
    );
  }

  useEffect(() => {
    if (detail != -1) {
      Animated.timing(height, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [detail]);

  function showDetail(index) {
    if (index != -1) {
      Animated.timing(height, {
        toValue: 0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        if (index == detail) {
          setDetail(-1);
        } else {
          setDetail(index);
        }
      });
    } else {
      setDetail(index);
    }
  }

  function getImage(type) {
    switch (type) {
      case 'Clear':
        return images.sunny;
      case 'Rain':
        return images.rain;
      case 'Clouds':
        return images.cloudy;
      case 'Snow':
        return images.cloudy;
      default:
        return images.ambigous;
    }
  }

  console.log(conHeight, 'conHeight');

  return (
    <SafeAreaView style={styles.box}>
      <Loader loading={loading} />
      <Animated.ScrollView
        style={{
          maxHeight: conHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('screen').height],
          }),
          opacity: conHeight.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.1, 1],
          }),
        }}>
        <View style={local.main}>
          <View style={local.listView}>
            <Text style={local.title}>Current Weather</Text>
            <Text style={local.title}>{moment().format(' MMM, DD')}</Text>
          </View>

          {weather && weather.current && (
            <View style={{flex: 1}}>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 20,
                  flex: 1,
                }}>
                <Image
                  style={{height: 60, width: 60, resizeMode: 'cover'}}
                  source={getImage(weather.current.weather[0].main)}
                />
                <Text style={local.description}>
                  {weather.current.weather[0].description}
                </Text>
              </View>

              <View
                style={{
                  marginBottom: 20,
                }}>
                <View style={local.row}>
                  <Text style={[local.description, {width: '50%'}]}>
                    Temperature
                  </Text>
                  <Text style={[local.description, {textTransform: 'none'}]}>
                    {weather.current.temp}° C
                  </Text>
                  <Image style={local.icons} source={images.temp} />
                </View>

                <View style={local.row}>
                  <Text style={[local.description, {width: '50%'}]}>
                    Wind Speed
                  </Text>
                  <Text style={[local.description, {textTransform: 'none'}]}>
                    {weather.current.wind_speed} m/s
                  </Text>
                  <Image style={local.icons} source={images.wind} />
                </View>

                <View style={local.row}>
                  <Text style={[local.description, {width: '50%'}]}>
                    Humidity
                  </Text>
                  <Text style={[local.description, {textTransform: 'none'}]}>
                    {weather.current.humidity}%
                  </Text>
                  <Image style={local.icons} source={images.humid} />
                </View>

                <View style={local.row}>
                  <Text style={[local.description, {width: '50%'}]}>
                    Feels like
                  </Text>
                  <Text style={[local.description, {textTransform: 'none'}]}>
                    {weather.current.feels_like}° C
                  </Text>
                  <Image style={local.icons} source={images.weather} />
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={local.main}>
          <FlatList
            data={weather && weather.daily}
            keyExtractor={(item, index) => index + 'Forecast'}
            renderItem={({item, index}) => {
              if (index && index <= 5) {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        showDetail(index);
                      }}>
                      <View style={local.listView}>
                        <View style={local.row}>
                          <Image
                            style={local.icons}
                            source={getImage(item.weather[0].main)}
                          />
                          <Text style={local.description}>
                            {item.weather[0].description}
                          </Text>
                        </View>
                        <Text
                          style={[local.description, {fontStyle: 'italic'}]}>
                          {moment(item.dt * 1000).format(' MMM, DD')}
                        </Text>
                      </View>

                      {index == detail && (
                        <Animated.View
                          style={{
                            maxHeight: height.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 60],
                            }),
                            opacity: height.interpolate({
                              inputRange: [0, 0.5, 1],
                              outputRange: [0, 0.1, 1],
                            }),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                            }}>
                            <View style={local.row}>
                              <Image
                                style={local.smallIcons}
                                source={images.temp}
                              />
                              <Text
                                style={[
                                  local.description,
                                  {textTransform: 'none'},
                                ]}>
                                {item.temp.min}° C - {item.temp.max}° C
                              </Text>
                            </View>
                            <View style={[local.row, {marginHorizontal: 10}]}>
                              <Image
                                style={local.smallIcons}
                                source={images.wind}
                              />
                              <Text
                                style={[
                                  local.description,
                                  {textTransform: 'none'},
                                ]}>
                                {item.wind_speed} m/s
                              </Text>
                            </View>
                            <View style={local.row}>
                              <Image
                                style={local.smallIcons}
                                source={images.humid}
                              />
                              <Text
                                style={[
                                  local.description,
                                  {textTransform: 'none'},
                                ]}>
                                {item.humidity}%
                              </Text>
                            </View>
                          </View>
                        </Animated.View>
                      )}
                    </TouchableOpacity>
                    {index < 5 && <View style={local.seprator} />}
                  </>
                );
              } else {
                return null;
              }
            }}
          />
        </View>
      </Animated.ScrollView>
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
    width: '100%',
    height: 0,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 10,
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    fontStyle: 'italic',
    marginVertical: 20,
  },
  description: {
    color: colors.primary,
    fontSize: 18,
    textTransform: 'capitalize',
    marginHorizontal: 10,
  },
  icons: {
    height: 35,
    width: 35,
    resizeMode: 'cover',
  },
  smallIcons: {
    height: 20,
    width: 20,
    resizeMode: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});
