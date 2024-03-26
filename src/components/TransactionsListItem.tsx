import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../screens/Transactions';
import {ITransaction} from '../interfaces/Transaction';

export default function TransactionsListItem({
  icon,
  id,
  company,
  product,
  currency,
  amount,
}: Readonly<ITransaction>) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('TransactionDetails', {id})}>
      <MaterialIcon
        style={styles.icon}
        name={icon}
        size={24}
        color={'#90a0d9'}
      />
      <View style={styles.itemText}>
        <Text style={styles.transactionName}>{company}</Text>
        <Text style={styles.transactionType}>{product}</Text>
      </View>
      <Text style={styles.amount}>
        {currency}
        {amount}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {marginTop: 4},
  itemText: {display: 'flex', flex: 1, marginHorizontal: 12},
  item: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  transactionName: {color: '#90a0d9', fontSize: 20, marginBottom: 4},
  transactionType: {color: '#bdbddd'},
  amount: {
    color: '#bdbddd',
    fontSize: 22,
  },
});
