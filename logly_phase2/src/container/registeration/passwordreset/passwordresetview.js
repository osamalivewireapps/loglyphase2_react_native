/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function PasswordResetView(props) {
    const { backScreen, openLoginScreen } = props;
    console.log("thanks-reg--->", props)


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View
                style={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0,
                    paddingBottom: 50

                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back1} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginStart: moderateScale(30),
                marginEnd: moderateScale(30), alignItems: 'center',
                height: '100%'
            }}>

                <Image 
                    style={{ height: verticalScale(50), 
                    width: moderateScale(50) }}
                resizeMode="contain"
                source={Icons.icon_check_circle} />

                <Text style={{
                    fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(25), paddingBottom: verticalScale(25),
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Password Reset Successfully</Text>

                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), 
                    textAlign: 'center', 
                    paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10), 
                    paddingBottom: verticalScale(60)

                }}>You have successfully reset your password. Please use your new password to login.</Text>


                <TouchableOpacity
                    onPress={() => openLoginScreen()}
                    style={{
                        ...styles.styleButtons, alignSelf: 'flex-end', marginTop: 50
                    }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                        ...styles.generalTxt, color: 'white'
                    }}>LOGIN</Text>
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

export default PasswordResetView;
