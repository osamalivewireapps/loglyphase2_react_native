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
                    <Image source={Icons.icon_arrow_back1} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps={true}>
            <View style={{
                marginStart: 30,
                marginEnd: 30, alignItems: 'center',
                height: '100%'
            }}>


                <Text style={{
                    fontSize: 28, textAlign: 'center', padding: 10,
                    paddingTop: 25, paddingBottom: 25,
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Enter Verification Code</Text>

                <Text style={{
                    ...styles.generalTxt,
                    fontSize: 16, textAlign: 'center', paddingStart: 10,
                    paddingEnd: 10, paddingBottom: 60

                }}>{isRegisterCodeVerification ? 'Please check your Email and Phone. We sent you a verification code.' : 'Please check your email. We sent you a verification code.'}</Text>
                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontSize: 16, textAlign: 'center', 
                        paddingEnd:20

                    }}>
                            {isRegisterCodeVerification ? 'Email Code:' : (routeEmail?'Email Code:':'Phone Code:')}
                    </Text>
                    <OtpInputs
                        defaultValue={verificationCode}
                        autofillFromClipboard={true}
                        handleChange={(code) => setPinCode(code)}
                        numberOfInputs={pinLength}
                        style={{
                            height: 45, paddingStart: 0,
                            justifyContent: 'center',
                            paddingEnd: 0, flexDirection: 'row', color: 'black',

                        }}
                        focusStyles={styles.borderStyleHighLighted}
                        keyboardType="numbers-and-punctuation"
                        inputStyles={{ textAlign: 'center' }}
                        inputContainerStyles={{ ...styles.underlineStyleBase, marginStart: 3, paddingTop: (Platform.OS === "ios" ? 12 : 0) }}

                    />
                </View>

                {isRegisterCodeVerification ?
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end',marginTop:20 }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontSize: 16, textAlign: 'center',
                            paddingEnd: 20

                        }}>
                            Phone Code:
                        </Text>
                    <OtpInputs
                        defaultValue={verificationSmsCode}
                        autofillFromClipboard={true}
                        handleChange={(code) => setPinSMSCode(code)}
                        numberOfInputs={pinLength}
                            style={{
                                height: 45, paddingStart: 0,
                                justifyContent: 'center',
                                paddingEnd: 0, flexDirection: 'row', color: 'black',

                            }}
                        focusStyles={styles.borderStyleHighLighted}
                        keyboardType="numbers-and-punctuation"
                        inputStyles={{ textAlign: 'center' }}
                        inputContainerStyles={{ ...styles.underlineStyleBase, marginStart: 3, paddingTop: (Platform.OS === "ios" ? 12 : 0) }}

                    /></View>
                    : <View />}

                <TouchableOpacity onPress={(e) => resendCode()}>
                    <Text style={{
                        ...styles.generalTxt,
                        marginTop: 40,
                        fontSize: 22, textAlign: 'center', paddingStart: 30,
                        paddingEnd: 30, color: 'green',
                        marginBottom:20

                    }}>Resend Verification Code</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => openEnterPasswordScreen()}
                    style={{
                        ...styles.styleButtons, alignSelf: 'flex-end',
                        marginTop: 20
                    }}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingTop: 15, paddingBottom: 15,
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
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        backgroundColor: 'yellow'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30,
        width: '100%',
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderBottomColor: "#03DAC6",

    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 1,
        borderColor: 'white',
        borderBottomColor:'black',
        color: 'black',
        fontSize: 18,
    },

    underlineStyleHighLighted: {
        borderBottomColor: "#03DAC6",
    },
});

export default VerificationCodeView;
