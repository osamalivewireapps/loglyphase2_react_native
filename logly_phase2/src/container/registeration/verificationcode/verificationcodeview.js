/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import OtpInputs from 'react-native-otp-inputs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function VerificationCodeView(props) {
    const { backScreen, openEnterPasswordScreen, pinLength,
        verificationCode, setPinCode, resendCode, isRegisterCodeVerification,
        verificationSmsCode, setPinSMSCode, routeEmail } = props;


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
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{
                    marginStart: moderateScale(30),
                    marginEnd: moderateScale(30), alignItems: 'center',
                    height: '100%'
                }}>


                    <Text style={{
                        fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: moderateScale(25), paddingBottom: moderateScale(25),
                        fontFamily: Fonts.type.bold, color: 'black'
                    }}>Enter Verification Code</Text>

                    <Text style={{
                        ...styles.generalTxt,
                        fontSize: moderateScale(16), textAlign: 'center',
                        paddingStart: moderateScale(10),
                        paddingEnd: moderateScale(10), 
                        paddingBottom: verticalScale(60)

                    }}>{isRegisterCodeVerification ? 'Please check your Email and Phone. We sent you a verification code.' : 'Please check your email. We sent you a verification code.'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontSize: moderateScale(16), textAlign: 'center',
                            paddingEnd: moderateScale(20)

                        }}>
                            {isRegisterCodeVerification ? 'Email Code:' : (routeEmail ? 'Email Code:' : 'Phone Code:')}
                        </Text>
                        <OtpInputs
                            defaultValue={verificationCode}
                            autofillFromClipboard={true}
                            handleChange={(code) => setPinCode(code)}
                            numberOfInputs={pinLength}
                            style={{
                                height: moderateScale(45), 
                                paddingStart: 0,
                                justifyContent: 'center',
                                paddingEnd: 0, flexDirection: 'row', color: 'black',

                            }}
                            focusStyles={styles.borderStyleHighLighted}
                            keyboardType="numbers-and-punctuation"
                            inputStyles={{ textAlign: 'center',fontSize:moderateScale(16) }}
                            inputContainerStyles={{ ...styles.underlineStyleBase, marginStart: moderateScale(3), paddingTop: (Platform.OS === "ios" ? verticalScale(12) : 0) }}

                        />
                    </View>

                    {isRegisterCodeVerification ?
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20 }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(16), textAlign: 'center',
                                paddingEnd: moderateScale(20)

                            }}>
                                Phone Code:
                            </Text>
                            <OtpInputs
                                defaultValue={verificationSmsCode}
                                autofillFromClipboard={true}
                                handleChange={(code) => setPinSMSCode(code)}
                                numberOfInputs={pinLength}
                                style={{
                                    height: moderateScale(45), paddingStart: 0,
                                    justifyContent: 'center',
                                    paddingEnd: 0, flexDirection: 'row', color: 'black',

                                }}
                                focusStyles={styles.borderStyleHighLighted}
                                keyboardType="numbers-and-punctuation"
                                inputStyles={{ textAlign: 'center', fontSize: moderateScale(16) }}
                                inputContainerStyles={{ ...styles.underlineStyleBase, marginStart: moderateScale(3), paddingTop: (Platform.OS === "ios" ? verticalScale(12) : 0) }}

                            /></View>
                        : <View />}

                    <TouchableOpacity onPress={(e) => resendCode()}>
                        <Text style={{
                            ...styles.generalTxt,
                            marginTop: verticalScale(40),
                            fontSize: moderateScale(22), textAlign: 'center', paddingStart: moderateScale(30),
                            paddingEnd: moderateScale(30), color: 'green',
                            marginBottom: verticalScale(20)

                        }}>Resend Verification Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => openEnterPasswordScreen()}
                        style={{
                            ...styles.styleButtons, alignSelf: 'flex-end',
                            marginTop: verticalScale(20)
                        }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                            ...styles.generalTxt, color: 'white'
                        }}>CONTINUE</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
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
    },
    borderStyleBase: {
        width: moderateScale(30),
        height: verticalScale(45)
    },

    borderStyleHighLighted: {
        borderBottomColor: "#03DAC6",

    },

    underlineStyleBase: {
        width: moderateScale(30),
        height: verticalScale(45),
        borderWidth: moderateScale(1),
        borderColor: 'white',
        borderBottomColor: 'black',
        color: 'black',
        fontSize: moderateScale(18),
    },

    underlineStyleHighLighted: {
        borderBottomColor: "#03DAC6",
    },
});

export default VerificationCodeView;
