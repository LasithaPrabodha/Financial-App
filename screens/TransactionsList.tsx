import * as React from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const transactions = Array.from(Array(100).keys()).map(val => ({
  id: val,
  name: 'Amazon Purchase',
  type: 'Debit Retail',
  icon: 'shopping-cart',
  amount: 5.65,
}));

export const TransactionsList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={transactions}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No transactions</Text>
        }
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('TransactionDetails')}>
            <MaterialIcon name={item.icon} size={24} color={'black'} />
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text>${item.amount}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flatList: {width: '100%'},
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 1,
  },
  transactionName: {marginLeft: 12, flex: 1},
  emptyListText: {marginTop: 24, width: '100%', textAlign: 'center'},
});
