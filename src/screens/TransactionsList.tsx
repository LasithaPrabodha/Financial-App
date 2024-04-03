import React, {useEffect, useRef, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import TransactionsService from '../services/TransactionsService';
import {TransactionWithId} from '../interfaces/Transaction';
import TransactionsListItem from '../components/TransactionsListItem';
import Seperator from '../components/Seperator';
import {useNavigation} from '@react-navigation/native';

export const TransactionsList = () => {
  const navigation = useNavigation<any>();
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);
  const transactionsService = TransactionsService.getInstance();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const canMomentum = useRef(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      const list = await transactionsService.loadList();
      setTransactions(list);
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation, transactionsService]);

  const onMomentumScrollBegin = () => {
    canMomentum.current = true;
  };

  const onMomentumScrollEnd = () => {
    if (canMomentum.current) {
      loadMoreResults();
    }

    canMomentum.current = false;
  };

  const loadMoreResults = async () => {
    if (loading || transactionsService.reachedEnd) {
      return;
    }

    setLoadingMore(true);

    const newList = await transactionsService.loadMore(10);
    setTransactions(newList);
    setLoadingMore(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={transactions}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ListEmptyComponent={
          <View>
            {!loading && (
              <Text style={styles.emptyListText}>No transactions</Text>
            )}
          </View>
        }
        ItemSeparatorComponent={Seperator}
        onEndReachedThreshold={0.01}
        ListFooterComponent={
          <View>
            {loadingMore && (
              <Text style={styles.footerText}>Loading More...</Text>
            )}
          </View>
        }
        renderItem={({item}) => <TransactionsListItem {...item} />}
        keyExtractor={item => item.id!}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 50,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
    fontWeight: '600',
  },
});
