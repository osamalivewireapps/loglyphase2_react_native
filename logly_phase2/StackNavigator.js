/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  LoginController, ThanksRegistrationController, BusinessOwnerController,
  BusAccountPackagesController, RegistrationAccountTypeController,
  PasswordResetController, ChangePasswordController, VerificationCodeController, RegistrationController, ForgotPasswordController
} from './src';
import SplashScreen from './src/container/Splash';
import Loader from './src/components/Loader';


function StackNavigator(props) {
  const Stack = createStackNavigator();

  return (
    <Loader>
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
          <Stack.Screen name="BusAccountPackages" component={BusAccountPackagesController} />
          <Stack.Screen name="ThanksRegistration" component={ThanksRegistrationController} />
          <Stack.Screen name="BusinessOwner" component={BusinessOwnerController} />
        </Stack.Navigator>
      </NavigationContainer>
    </Loader>
  );
}

const mapStateToProps = ({ reducer }) => {
  return {
    //loading: reducer.loader,
    //error: reducer.error,
    //isLoggedIn: reducer.isLoggedIn,
  };
};

const horizontalAnimation = {
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      }
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
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
};

export default connect(mapStateToProps)(StackNavigator);