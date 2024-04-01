import React from 'react';
import {StatusBar, StyleSheet, TouchableHighlight, View} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Transactions} from './screens/Transactions';
import {Summary} from './screens/Summary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AddTransaction} from './screens/AddTransaction';

const AddTransactionButton = ({children, onPress}: BottomTabBarButtonProps) => (
  <TouchableHighlight style={styles.roundedButton} onPress={onPress}>
    <View style={styles.roundedButtonView}>{children}</View>
  </TouchableHighlight>
);

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#030317" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Transactions') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Summary') {
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ba2d23',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{headerShown: false, tabBarLabelStyle: {display: 'flex'}}}
        />
        <Tab.Screen
          name="Add"
          component={AddTransaction}
          options={{
            title: 'Add New Transaction',
            tabBarIcon: _ => (
              <Ionicons name={'add'} size={32} color={'white'} />
            ),
            tabBarButton: props => <AddTransactionButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Summary"
          component={Summary}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#030317',
            },
            headerTintColor: '#bdbddd',
            tabBarLabelStyle: {display: 'flex'},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  roundedButton: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedButtonView: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: '#ba2d23',
  },
});

export default App;
