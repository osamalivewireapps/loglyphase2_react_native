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
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThanksRegistrationController, BusinessOwnerController, BusAccountPackagesController, RegistrationAccountTypeController, PasswordResetController, ChangePasswordController, VerificationCodeController, LoginController, RegistrationController, ForgotPasswordController } from './src';
import SplashScreen from './src/container/Splash';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerBackVisible: false, headerShown: false,
        }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordController} />
          <Stack.Screen name="Login" component={LoginController} />
          <Stack.Screen name="Registration" component={RegistrationController} />
          <Stack.Screen name="VerificationCode" component={VerificationCodeController} />
          <Stack.Screen name="PasswordReset" component={PasswordResetController} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordController} />
          <Stack.Screen name="RegisterAccountType" component={RegistrationAccountTypeController} />
          <Stack.Screen name="ThanksRegistration" component={ThanksRegistrationController} />
          <Stack.Screen name="BusinessOwner" component={BusinessOwnerController} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const horizontalAnimation = {
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 3000,
      }
    },
    close: {
      animation: 'timing',
      config: {
        duration: 3000,
      }
    }

  }
};

const bottomAnimation = {
  ...TransitionPresets.FadeFromBottomAndroid,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 500,
      }
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500,
      }
    }

  }
}

export default App;
