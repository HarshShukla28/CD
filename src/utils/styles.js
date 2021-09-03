import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0 ,0 ,0, 0.4)',
  },
  box: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
  },
  heading: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '700',
  },
});
