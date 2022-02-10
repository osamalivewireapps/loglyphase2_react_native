/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen, BusListing, ProductInfo, AnimalInfo, PolicyController, LoginController, ThanksRegistrationController, BusinessOwnerController,
  BusAccountPackagesController, RegistrationAccountTypeController,
  PasswordResetController, ChangePasswordController, VerificationCodeController, RegistrationController, ForgotPasswordController,
  WelcomeRegistration, ServicesSetup, AccountSetup, BusProfileSetup, BusProfile, TeamMemberSetup,
  TeamSetup, InventoryDashBoard, RegisterPet, PetProfile, PetDetail, SearchItem, DashBoard, FilterAnimal, ProductListing, FilterProducts,
  ProductDetail, RegisterProduct, AddContacts, ContactListing, FilterContacts, ContactDetails, PdfReader, ImageGallery,
  CRMDashBoard, CRMNewOrder, CRMAddCustomers, CRMSalesDetails, CRMPaymentDetails, CRMCustomerDetail, CRMPurchaseHistoryDetail, CrmOrderCompleted,
  GroupListing, CreateGroup, CreateActivity, AddScheduleActivity, ScheduleListingActivity, EditScheduleActivity, TeamListing, MemberDetails, AddTeamMember, ViewProfile,
  AppointmentListing, SelectServices, SelectDateServices, AllAnimal, EditProfile, TransferListing, SummaryAnimalsView
} from './src';
import SplashScreen from './src/container/Splash';
import Loader from './src/components/Loader';
import CustomDrawer from './src/container/home/drawer_content';
import { Colors, Fonts, Icons } from './src/theme';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { color } from 'react-native-reanimated';
import { Image, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import DataHandler from './src/utils/DataHandler'
import { accountType, INDIVIDUAL } from './src/constants';


function StackNavigator(props) {
  const Stack = createStackNavigator();

  const [initialRoute, setInitialRoute] = useState('');
  const [currentType, setCurrentType] = useState('');

  useEffect(() => {
    DataHandler.getAccountType().then((value) => {
      if (value) {
        setCurrentType(value);
        setInitialRoute('HomeDrawer')
      }
      else
        setInitialRoute('Splash');

    }).catch(() => setInitialRoute('Splash'));
  }, [])

  if (initialRoute) {
    return (
      <Loader>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerBackVisible: false, headerShown: false,
              ...horizontalAnimation

            }}>

            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="HomeDrawer" component={homeDrawer} />
            <Stack.Screen name="RegisterPet" component={RegisterPet} />
            <Stack.Screen name="PetProfile" component={PetProfile} />
            <Stack.Screen name="PetDetail" component={PetDetail} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="ContactDetails" component={ContactDetails} />
            <Stack.Screen name="AddScheduleActivity" component={AddScheduleActivity} />
            <Stack.Screen name="EditScheduleActivity" component={EditScheduleActivity} />
            <Stack.Screen name='SearchItem' component={SearchItem} />
            <Stack.Screen name='DashBoard' component={DashBoard} />
            <Stack.Screen name='PdfReader' component={PdfReader} />
            <Stack.Screen name='ImageGallery' component={ImageGallery} />
            <Stack.Screen name='ProductListing' component={ProductListing} />
            <Stack.Screen name='ContactListing' component={ContactListing} />
            <Stack.Screen name='FilterContacts' component={FilterContacts} />
            <Stack.Screen name='FilterProducts' component={FilterProducts} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordController} />
            <Stack.Screen name="RegisterProduct" component={RegisterProduct} />
            <Stack.Screen name="Login" component={LoginController} />
            <Stack.Screen name='CrmOrderCompleted' component={CrmOrderCompleted} />
            <Stack.Screen name="CRMDashBoard" component={CRMDashBoard} />
            <Stack.Screen name="CRMNewOrder" component={CRMNewOrder} />
            <Stack.Screen name="CRMSalesDetails" component={CRMSalesDetails} />
            <Stack.Screen name="CRMAddCustomers" component={CRMAddCustomers} />
            <Stack.Screen name="CRMPaymentDetails" component={CRMPaymentDetails} />
            <Stack.Screen name="CRMCustomerDetail" component={CRMCustomerDetail} />
            <Stack.Screen name="CRMPurchaseHistoryDetail" component={CRMPurchaseHistoryDetail} />
            <Stack.Screen name="GroupListing" component={GroupListing} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="CreateActivity" component={CreateActivity} />
            <Stack.Screen name="ScheduleListingActivity" component={ScheduleListingActivity} />
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
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='TeamMemberSetup' component={TeamMemberSetup} />
            <Stack.Screen name='TeamSetup' component={TeamSetup} />
            <Stack.Screen name='BusListing' component={BusListing} />
            <Stack.Screen name='ProductInfo' component={ProductInfo} />
            <Stack.Screen name='AnimalInfo' component={AnimalInfo} />
            <Stack.Screen name='TeamListing' component={TeamListing} />
            <Stack.Screen name='AddContacts' component={AddContacts} />
            <Stack.Screen name='AddTeamMember' component={AddTeamMember} />
            <Stack.Screen name='MemberDetails' component={MemberDetails} />
            <Stack.Screen name='InventoryDashBoard' component={InventoryDashBoard} />
            <Stack.Screen name='FilterAnimal' component={FilterAnimal} />
            <Stack.Screen name='ViewProfile' component={ViewProfile} />
            <Stack.Screen name='AppointmentListing' component={AppointmentListing} />
            <Stack.Screen name='SelectServices' component={SelectServices} />
            <Stack.Screen name='AllAnimal' component={AllAnimal} />
            <Stack.Screen name='TransferListing' component={TransferListing} />
            <Stack.Screen name='SummaryAnimalsView' component={SummaryAnimalsView} />
            <Stack.Screen name='SelectDateServices' component={SelectDateServices} />
          </Stack.Navigator>
        </NavigationContainer>
      </Loader>
    );
  } else {
    return <View />
  }

  function homeDrawer() {
    const Drawer = createDrawerNavigator();

    const isTablet = DeviceInfo.isTablet();

    DataHandler.getAccountType().then((value) => {
      setCurrentType(value)
    })
    console.log('current type--->', currentType)
    if (currentType)
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

          {currentType && currentType.toLowerCase().includes(INDIVIDUAL.toLowerCase()) ? null :
            <Drawer.Screen name='Dashboard' component={DashBoard} options={{
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
          }
          {currentType && currentType.toLowerCase().includes(INDIVIDUAL.toLowerCase()) ? null :
            <Drawer.Screen name='CRM' component={CRMDashBoard} options={{
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
            }} />}
          <Drawer.Screen name='Team Members' component={TeamListing} options={{
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

          <Drawer.Screen name='Contacts' component={ContactListing} options={{
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

          <Drawer.Screen name='Groups' component={GroupListing} options={{
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



          <Drawer.Screen name='Setup Wizard' component={WelcomeRegistration} options={{
            drawerLabelStyle: {
              fontSize: moderateScale(18)
            },
            drawerIcon: ({ color }) => (
              <Image source={Icons.icon_setup_wizard}
                resizeMode='contain'
                style={{
                  height: verticalScale(30),
                  width: moderateScale(30),
                  marginStart: moderateScale(-10)
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


        </Drawer.Navigator>
      );

    else
      return <View />


  }
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
