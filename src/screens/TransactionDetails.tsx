import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from './Transactions';
import {Transaction} from '../interfaces/Transaction';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TransactionDetails'>;

export const TransactionDetails = () => {
  const route = useRoute<ScreenRouteProp>();
  const [product, setProduct] = useState<Transaction>({} as Transaction);

  const {id} = route.params;
  const transactionsService = TransactionsService.getInstance();

  useEffect(() => {
    const item = transactionsService.getItem(id);
    setProduct(item);
  }, [id, transactionsService]);

  const date = useMemo(() => {
    return new Date(product.date).toDateString();
  }, [product.date]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You bought</Text>
      <Text style={styles.product}>
        {product.product} from {product.company}
      </Text>
      <Text style={styles.text}>for</Text>
      <Text style={styles.amount}>
        {product.currency}
        {product.amount}
      </Text>
      <Text style={styles.text}>{product.location}</Text>
      <Text style={styles.text}>on {date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030317',
    paddingHorizontal: 16,
  },
  product: {
    color: '#bdbddd',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  amount: {color: '#bdbddd', fontSize: 56, marginBottom: 24, lineHeight: 70},
  text: {fontSize: 16, color: '#bdbddd'},
});
