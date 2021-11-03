/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import InputPasswordToggle from '../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../theme';
import CheckBox from 'react-native-check-box';
import { Platform } from 'react-native';
import { POLICY, TERMS } from './../../constants';
import { Button } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function LoginView(props) {
    const { openRegisterScreen, backScreen, openForgotScreen, openPolicyScreen,
        enterEmail, validateEmail, setEmail,
        enterPassword, validatePassword, setPassword,
        checkTerms, setCheckTerms, loginScreen } = props;


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(40),
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>Welcome</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10) }}>Sign in to continue</Text>
            </View>
            <View style={{
                flex: 4, justifyContent: 'center',
                marginStart: moderateScale(30),
                marginEnd: moderateScale(30)
            }}>

                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row',
                    padding: moderateScale(20), paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                    , shadowColor: validateEmail ? 'black' : 'darkred',
                    shadowOpacity: validateEmail ? 0.25 : 1
                }}>

                    <Image source={Icons.icon_email} style={{ height: verticalScale(10), width: moderateScale(15) }} />
                    <TextInput placeholder="Email" style={{
                        ...styles.styleTextInput,
                        marginStart: moderateScale(10),
                        paddingEnd: moderateScale(20)

                    }}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        onChangeText={(e) => setEmail(e)}
                        value={enterEmail} />
                </View>
                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row',
                    marginTop: verticalScale(15), padding: moderateScale(20), paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                    , shadowColor: validatePassword ? 'black' : 'darkred',
                    shadowOpacity: validatePassword ? 0.25 : 1
                }}>

                    <Image source={Icons.icon_lock} style={{ height: verticalScale(16), width: moderateScale(15) }} />
                    <InputPasswordToggle
                        inputStyle={{
                            ...styles.styleTextInput,
                            marginStart: moderateScale(10),
                        }}
                        autoCapitalize='none'
                        placeholder="Password"
                        value={enterPassword}
                        onChangeText={(e) => setPassword(e)} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: verticalScale(15), alignItems: 'center',
                    paddingStart: moderateScale(15),
                    paddingEnd: 0
                }}>

                    <CheckBox
                        onClick={() => {
                            setCheckTerms(!checkTerms)
                        }}
                        style={{ flex: 1 }}
                        isChecked={checkTerms}
                        rightText={"Remember me"}
                        rightTextStyle={{ ...styles.generalTxt, fontSize: moderateScale(14), color: 'black', marginStart: moderateScale(5) }}
                    />

                    <TouchableOpacity onPress={() => { openForgotScreen() }}>
                        <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#0467B2' }}>Forgot Password? </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{
                flex: 2, marginStart: moderateScale(30),
                marginEnd: moderateScale(30)
            }}>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0
                }} onPress={(e) => loginScreen(e)}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: verticalScale(10),
                        paddingStart: 127, paddingEnd: 127,
                        paddingTop: verticalScale(10),
                        paddingBottom: verticalScale(10),
                        ...styles.generalTxt
                    }}>NEXT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0, marginTop: verticalScale(10)
                }} onPress={(e) => openRegisterScreen(e)}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center',
                        padding: verticalScale(10),
                        paddingTop: verticalScale(10),
                        paddingBottom: verticalScale(10),
                        ...styles.generalTxt
                    }}>NEW TO LOGLY</Text>
                </TouchableOpacity>

                {/* <View style={{
                    flex: 1, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row'

                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.generalTxt, fontSize: 14, color: 'black',
                            textAlign: 'center'
                        }}>
                        Don't have an account yet? </Text>
                    <TouchableOpacity style={{}} onPress={() => { openRegisterScreen() }}>
                        <Text
                            style={{
                                ...styles.generalTxt, fontSize: 14,
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor,
                                backgroundColor: 'white'


                            }}>Register Here</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{
                    flex: 1, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row',
                    marginTop: verticalScale(10), paddingBottom: verticalScale(20)

                }}>
                    {/* <Text
                        numberOfLines={1}
                        style={{
                            ...styles.generalTxt, fontSize: 14, color: 'black',
                            textAlign: 'center', marginTop: 15
                        }}> */}
                    <Text style={{
                        ...styles.generalTxt, fontSize: moderateScale(14), color: 'black',
                        textAlign: 'center'
                    }}

                    >Please look into </Text>
                    <TouchableOpacity style={{ marginTop: verticalScale(-2) }} onPress={(e) => openPolicyScreen(TERMS)}>
                        <Text
                            style={{
                                ...styles.generalTxt, fontSize: moderateScale(14),
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor,
                            }}>Terms of Use</Text>
                    </TouchableOpacity>
                    <Text style={{
                        ...styles.generalTxt, fontSize: moderateScale(14), color: 'black',
                        textAlign: 'center'
                    }}> and </Text>
                    <TouchableOpacity style={{ marginTop: verticalScale(-2) }} onPress={(e) => openPolicyScreen(POLICY)}>
                        <Text
                            style={{
                                ...styles.generalTxt, fontSize: moderateScale(14),
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor
                            }}>Privacy Policy</Text>
                    </TouchableOpacity>
                    {/* </Text> */}

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(40),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(40),
        width:'100%'
    },
    generalTxt: {
        color: 'white',
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
        borderRadius: moderateScale(30)
    }
});

export default LoginView;
