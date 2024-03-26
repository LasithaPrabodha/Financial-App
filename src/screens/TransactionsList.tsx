import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  FlatListProps,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TransactionsService from '../services/TransactionsService';
import {ITransaction} from '../interfaces/Transaction';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Transactions';
import {StackNavigationProp} from '@react-navigation/stack';

const Separator = (_: FlatListProps<ITransaction>) => (
  <View style={styles.separator} />
);

export const TransactionsList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const transactionsService = TransactionsService.getInstance();
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const list = transactionsService.generateList(10);
    setTransactions(list);
  }, [transactionsService]);

  const loadMoreResults = () => {
    setLoadingMore(true);

    setTimeout(() => {
      const newList = transactionsService.loadMore(10);
      setTransactions(newList);
    }, 1000);
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={transactions}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No transactions</Text>
        }
        ItemSeparatorComponent={Separator}
        onEndReachedThreshold={0.01}
        onEndReached={_ => {
          loadMoreResults();
        }}
        ListFooterComponent={
          <View>
            {loadingMore && (
              <Text style={styles.footerText}>Loading More...</Text>
            )}
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('TransactionDetails', {id: item.id})
            }>
            <MaterialIcon
              style={styles.icon}
              name={item.icon}
              size={24}
              color={'#90a0d9'}
            />
            <View style={styles.itemText}>
              <Text style={styles.transactionName}>{item.company}</Text>
              <Text style={styles.transactionType}>{item.product}</Text>
            </View>
            <Text style={styles.amount}>
              {item.currency}
              {item.amount}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030317',
  },
  icon: {marginTop: 4},
  itemText: {display: 'flex', flex: 1, marginLeft: 12},
  flatList: {width: '100%'},
  separator: {
    height: 1,
    width: '93%',
    backgroundColor: '#eeeeee40',
    marginHorizontal: 14,
  },
  item: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  transactionName: {color: '#90a0d9', fontSize: 20, marginBottom: 4},
  transactionType: {color: '#bdbddd'},
  emptyListText: {
    marginTop: 24,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
  },
  amount: {
    color: '#bdbddd',
    fontSize: 22,
  },
  footerText: {
    padding: 16,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
    fontWeight: '600',
  },
});
