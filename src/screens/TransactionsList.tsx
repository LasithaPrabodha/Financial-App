import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {ITransaction} from '../interfaces/Transaction';
import TransactionsListItem from '../components/TransactionsListItem';
import Seperator from '../components/Seperator';

export const TransactionsList = () => {
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
        ItemSeparatorComponent={Seperator}
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
        renderItem={({item}) => <TransactionsListItem {...item} />}
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
  flatList: {width: '100%'},
  emptyListText: {
    marginTop: 24,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
  },
  footerText: {
    padding: 16,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
    fontWeight: '600',
  },
});
