import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransactionsList} from './TransactionsList';
import {TransactionDetails} from './TransactionDetails';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetails: {id: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export const Transactions = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#030317',
        },
        headerTintColor: '#bdbddd',
      }}>
      <Stack.Screen
        name="TransactionList"
        options={{title: 'Transaction List'}}
        component={TransactionsList}
      />
      <Stack.Screen
        name="TransactionDetails"
        options={{title: 'Transaction Details'}}
        component={TransactionDetails}
      />
    </Stack.Navigator>
  );
};
