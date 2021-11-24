/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen, BusListing, ProductInfo, AnimalInfo, PolicyController, LoginController, ThanksRegistrationController, BusinessOwnerController,
  BusAccountPackagesController, RegistrationAccountTypeController,
  PasswordResetController, ChangePasswordController, VerificationCodeController, RegistrationController, ForgotPasswordController,
  WelcomeRegistration, ServicesSetup, AccountSetup, BusProfileSetup, BusProfile, TeamMemberSetup,
  TeamSetup, InventoryDashBoard, RegisterPet, PetProfile, PetDetail, SearchItem, DashBoard, FilterAnimal
} from './src';
import SplashScreen from './src/container/Splash';
import Loader from './src/components/Loader';
import CustomDrawer from './src/container/home/drawer_content';
import { Colors, Fonts, Icons } from './src/theme';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { color } from 'react-native-reanimated';
import { Image, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';



function StackNavigator(props) {
  const Stack = createStackNavigator();

  return (
    <Loader>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerBackVisible: false, headerShown: false,
          ...horizontalAnimation

        }}>

          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="HomeDrawer" component={homeDrawer} />
          <Stack.Screen name="RegisterPet" component={RegisterPet} />
          <Stack.Screen name="PetProfile" component={PetProfile} />
          <Stack.Screen name="PetDetail" component={PetDetail} />
          <Stack.Screen name='SearchItem' component={SearchItem} />
          <Stack.Screen name='DashBoard' component={DashBoard} />
          
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
          <Stack.Screen name="PolicyScreen" component={PolicyController} />
          <Stack.Screen name="WelcomeRegistration" component={WelcomeRegistration} />
          <Stack.Screen name="ServicesSetup" component={ServicesSetup} />
          <Stack.Screen name='AccountSetup' component={AccountSetup} />
          <Stack.Screen name='BusProfileSetup' component={BusProfileSetup} />
          <Stack.Screen name='BusProfile' component={BusProfile} />
          <Stack.Screen name='TeamMemberSetup' component={TeamMemberSetup} />
          <Stack.Screen name='TeamSetup' component={TeamSetup} />
          <Stack.Screen name='BusListing' component={BusListing} />
          <Stack.Screen name='ProductInfo' component={ProductInfo} />
          <Stack.Screen name='AnimalInfo' component={AnimalInfo} />

          <Stack.Screen name='InventoryDashBoard' component={InventoryDashBoard} />
          <Stack.Screen name='FilterAnimal' component={FilterAnimal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Loader>
  );
}

function homeDrawer() {
  const Drawer = createDrawerNavigator();

  const isTablet = DeviceInfo.isTablet();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerBackVisible: false, headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '85%',
        },
        drawerActiveTintColor: Colors.appBgColor,
        drawerInactiveTintColor: '#464646',
        drawerItemStyle: { marginStart: moderateScale(30), marginBottom: isTablet ? verticalScale(15) : 0 },
        drawerActiveBackgroundColor: 'transparent',
        drawerInActiveBackgroundColor: 'transparent',
        ...horizontalAnimation

      }}

    >

      <Drawer.Screen name='Home' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18),
        },

        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_feather_home} r

            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />

      <Drawer.Screen name='DashBoard' component={DashBoard} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_material_dashboard}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />
      <Drawer.Screen name='Groups' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18),
        },

        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_groups} r

            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />
      <Drawer.Screen name='Subscription' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_subs}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />
      <Drawer.Screen name='Contacts' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_contacts}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />
      <Drawer.Screen name='Settings' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_settings}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}
          />),
      }} />
      <Drawer.Screen name='CRM' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_crm}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}
          />),
      }} />
      <Drawer.Screen name='Team Member' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_team_member}
            resizeMode='contain'
            style={{
              height: verticalScale(20),
              width: moderateScale(20)
            }}

          />),
      }} />

      <Drawer.Screen name='Setup Wizard' component={HomeScreen} options={{
        drawerLabelStyle: {
          fontSize: moderateScale(18)
        },
        drawerIcon: ({ color }) => (
          <Image source={Icons.icon_setup_wizard}
            resizeMode='contain'
            style={{
              height: verticalScale(30),
              width: moderateScale(30),
              marginStart:moderateScale(-10)
            }}

          />),
      }} />

      

    </Drawer.Navigator>
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
