/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import OtpInputs from 'react-native-otp-inputs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';

function VerificationCodeView(props) {
    const { backScreen, openEnterPasswordScreen, pinLength,
        verificationCode, setPinCode, resendCode } = props;


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
            <View style={{
                marginStart: 30,
                marginEnd: 30, alignItems: 'center',
                height: '100%'
            }}>


                <Text style={{
                    fontSize: 28, textAlign: 'center', padding: 10,
                    paddingTop: 25, paddingBottom: 25,
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Enter the Verification Code</Text>

                <Text style={{
                    ...styles.generalTxt,
                    fontSize: 20, textAlign: 'center', paddingStart: 10,
                    paddingEnd: 10, paddingBottom: 60

                }}>Please check your email. We sent you a verification code.</Text>

                <OtpInputs
                    defaultValue={verificationCode}
                    autofillFromClipboard={true}
                    handleChange={(code) => setPinCode(code)}
                    numberOfInputs={pinLength}
                    style={{
                        width: '100%', height: 45, paddingStart: 0,
                        justifyContent:'center',
                        paddingEnd: 0, flexDirection: 'row', color: 'black',

                    }}
                    focusStyles={styles.borderStyleHighLighted}
                    keyboardType="numbers-and-punctuation"
                    inputStyles={{ textAlign: 'center' }}
                    inputContainerStyles={{ ...styles.underlineStyleBase, marginStart: 3,paddingTop:0}}

                />

                <TouchableOpacity onPress={(e) => resendCode()}>
                    <Text style={{
                        ...styles.generalTxt,
                        marginTop: 20,
                        fontSize: 22, textAlign: 'center', paddingStart: 30,
                        paddingEnd: 30, color: 'green',
              
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
        borderColor: "#03DAC6",

    },

    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        color: 'black',
        fontSize:18,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});

export default VerificationCodeView;
