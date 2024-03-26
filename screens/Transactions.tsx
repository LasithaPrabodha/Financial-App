import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransactionsList} from './TransactionsList';
import {TransactionDetails} from './TransactionDetails';

const Stack = createStackNavigator();

export const Transactions = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TransactionsList" component={TransactionsList} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
};
