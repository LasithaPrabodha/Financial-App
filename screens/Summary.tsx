import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {SimpleGrid} from 'react-native-super-grid';
import {ISummaryGridItem} from '../interfaces/SummaryGridItem';
import {useNavigation} from '@react-navigation/native';

export const Summary = () => {
  const navigation = useNavigation<any>();
  const [summary, setSummary] = useState<ISummaryGridItem[]>([]);
  const transactionsService = TransactionsService.getInstance();

  useEffect(() => {
    const load = () => {
      const summaryArray = transactionsService.calculateSummary();

      setSummary(summaryArray);
    };

    load();

    const unsubscribe = navigation.addListener('tabPress', _ => load());

    return unsubscribe;
  }, [navigation, transactionsService]);

  return (
    <View style={styles.container}>
      <SimpleGrid
        listKey={'label'}
        itemDimension={130}
        data={summary}
        renderItem={({item}) => (
          <View style={styles.gridItem}>
            <Text style={[styles.text, {fontSize: 36, marginBottom: 6}]}>
              {item.number}
            </Text>
            <Text style={[styles.text, {fontSize: 24, marginBottom: 20}]}>
              {item.item}
            </Text>
            <Text style={[styles.text, {fontSize: 18}]}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030317',
  },
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
