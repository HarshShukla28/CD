import Geolocation from '@react-native-community/geolocation';

export function getCurrentPosition() {
  Geolocation.getCurrentPosition(
    location => {
      console.log(location);
    },
    err => {
      console.log('Something went wrong');
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
  );
}
