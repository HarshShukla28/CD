import {create} from 'apisauce';
import {ToastAndroid} from 'react-native';
import {WEATHER_API} from '../../env';

export const LOCATION = 'LOCATION';
export const SET_LOADER = 'SET_LOADER';
export const SET_WEATHER = 'SET_WEATHER';

export const setLocation = data => ({
  type: LOCATION,
  payload: data,
});

export const setLoader = data => ({
  type: SET_LOADER,
  payload: data,
});

export const setWeather = data => ({
  type: SET_WEATHER,
  payload: data,
});

const api = create({
  baseURL: 'https://api.github.com',
});

export const getWeatherApi = data => dispatch => {
  dispatch(setLoader(true));
  api
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lng}&exclude=minutely&appid=${WEATHER_API}`,
    )
    .then(response => {
      if (response.ok) {
        console.log(response);
        dispatch(setWeather(response.data));
      } else {
        ToastAndroid.show('Something went wrong !', ToastAndroid.SHORT);
      }
      dispatch(setLoader(false));
    })
    .catch(err => {
      ToastAndroid.show('Server Error :(', ToastAndroid.SHORT);
      dispatch(setLoader(false));
    });
};
