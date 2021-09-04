import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import Animation from 'lottie-react-native';
import {styles} from '../utils';

export const Loader = props => {
  const {loading} = props;

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <Animation
          source={require('../assets/splashy-loader.json')}
          style={{
            width: 100,
            height: 100,
          }}
          loop={true}
          autoPlay={true}
        />
      </View>
    </Modal>
  );
};
