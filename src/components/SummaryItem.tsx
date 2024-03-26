import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ISummaryGridItem} from '../interfaces/SummaryGridItem';

export default function SummaryItem({
  number,
  label,
  item,
}: Readonly<ISummaryGridItem>) {
  return (
    <View style={styles.gridItem}>
      <Text style={[styles.text, {fontSize: 32, marginBottom: 6}]}>
        {number}
      </Text>
      <Text style={[styles.text, {fontSize: 24, marginBottom: 20}]}>
        {item}
      </Text>
      <Text style={[styles.text, {fontSize: 16}]}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 24, width: '100%', textAlign: 'center'},
  gridItem: {
    margin: 8,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
