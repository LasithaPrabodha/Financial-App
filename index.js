import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {PaperProvider, MD3DarkTheme} from 'react-native-paper';
import App from './src/App';
import {name as appName} from './app.json';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Main() {
  return (
    <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
      theme={MD3DarkTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
