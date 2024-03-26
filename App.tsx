import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Transactions} from './src/screens/Transactions';
import {Summary} from './src/screens/Summary';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor="#030317" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Transactions') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Summary') {
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ba2d23',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{headerShown: false}}
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
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
