import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import Animation from 'lottie-react-native';
import {styles} from '../utils';

export const Loader = props => {
  const {loading} = props;

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={local.activityIndicatorWrapper}>
          <Animation
            source={require('../assets/pizza.json')}
            style={{
              width: 120,
              height: 120,
            }}
            loop={true}
            autoPlay={true}
          />
        </View>
      </View>
    </Modal>
  );
};

const local = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
