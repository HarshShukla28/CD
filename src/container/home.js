import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';
import {getCurrentPosition, styles} from '../utils';

export const HomeScreen = () => {
  useEffect(() => {
    getCurrentPosition();
  }, []);
  return (
    <SafeAreaView style={styles.box}>
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
