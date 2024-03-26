import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from './Transactions';
import {ITransaction} from '../interfaces/Transaction';

type ScreenRouteProp = RouteProp<RootStackParamList, 'TransactionDetails'>;

export const TransactionDetails = () => {
  const route = useRoute<ScreenRouteProp>();
  const [product, setProduct] = useState<ITransaction>({} as ITransaction);

  const {id} = route.params;
  const transactionsService = TransactionsService.getInstance();

  useEffect(() => {
    const item = transactionsService.getItem(id);
    setProduct(item);
  }, [id, transactionsService]);

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>
        {product.currency}
        {product.amount}
      </Text>
      <Text style={styles.product}>
        {product.product} from {product.company}
      </Text>
      <Text style={styles.text}>{product.location}</Text>
      <Text style={styles.text}>on {product.date}</Text>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  amount: {color: '#bdbddd', fontSize: 56},
  text: {fontSize: 16, color: '#bdbddd'},
});
