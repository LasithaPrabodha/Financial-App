import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '93%',
    backgroundColor: '#eeeeee40',
    marginHorizontal: 14,
  },
});

const Seperator = () => <View style={styles.separator} />;

export default Seperator;
