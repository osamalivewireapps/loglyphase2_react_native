/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';



import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogBox } from 'react-native';
import { store, persistor } from './configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import StackNavigator from './StackNavigator';


class App extends React.Component {

  constructor() {
    super();

    LogBox.ignoreAllLogs();
  }

  render() {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigator />
        </PersistGate>

      </Provider>
    );
  }
}


export default App;
