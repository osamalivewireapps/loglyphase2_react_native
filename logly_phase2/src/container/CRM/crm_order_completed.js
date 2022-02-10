/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Colors, Fonts, Icons } from '../../theme';
import CRMStyles from './crm_styles'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { CommonActions } from '@react-navigation/routers';

function CrmOrderCompleted(props) {


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View style={{
                marginStart: moderateScale(30),
                marginEnd: moderateScale(30), alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
            }}>

                <Image
                    style={{
                        height: verticalScale(65),
                        width: moderateScale(65)
                    }}
                    resizeMode="contain"
                    source={Icons.icon_check_circle} />

                <Text style={{
                    fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                    fontFamily: Fonts.type.bold, color: '#404040'
                }}>Order Completed</Text>

                <Text style={{
                    ...CRMStyles.generalTxt,
                    color:'#A1A1A1',
                    fontSize: moderateScale(16),
                    textAlign: 'center',
                    paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10),
                    paddingBottom: verticalScale(60)

                }}>Your order has been booked  successfully</Text>


                <TouchableOpacity
                    onPress={() => {
                        const resetAction = CommonActions.reset({
                            index: 2,
                            routes: [{ name: "Splash" }, { name: "HomeDrawer" },{ name: "CRMNewOrder" }],
                        });

                        props.navigation.dispatch(resetAction);
                    }}
                    style={{
                        ...CRMStyles.styleButtons,  marginTop: verticalScale(50),
                        backgroundColor:Colors.appBgColor,
                        width:'90%'
                    }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                        ...CRMStyles.generalTxt, color: 'white'
                    }}>BOOK ANOTHER ORDER</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        const resetAction = CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                        });

                        props.navigation.dispatch(resetAction);
                    }}
                    style={{
                        ...CRMStyles.styleButtons, marginTop: verticalScale(20),
                        width: '90%'
                    }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(0), paddingBottom: verticalScale(10),
                        ...CRMStyles.generalTxt, color: Colors.appBgColor
                    }}>GO BACK HOME</Text>
                </TouchableOpacity>


            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 40,
        width: '100%'
    },
    generalTxt: {
        color: 'black',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30),
        width: '100%',
    }

});

export default CrmOrderCompleted;
