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
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>Welcome</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Sign in to continue</Text>
            </View>
            <View style={{
                flex: 4, justifyContent: 'center', marginStart: 30,
                marginEnd: 30
            }}>

                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                    , shadowColor: validateEmail ? 'black' : 'darkred',
                    shadowOpacity: validateEmail ? 0.25 : 1
                }}>

                    <Image source={Icons.icon_email} />
                    <TextInput placeholder="Email" style={{
                        ...styles.styleTextInput,
                        marginStart: 10,
                        paddingEnd:20

                    }}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        onChangeText={(e) => setEmail(e)}
                        value={enterEmail} />
                </View>
                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row',
                    marginTop: 15, padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                    , shadowColor: validatePassword ? 'black' : 'darkred',
                    shadowOpacity: validatePassword ? 0.25 : 1
                }}>

                    <Image source={Icons.icon_lock} />
                    <InputPasswordToggle
                        inputStyle={{
                            ...styles.styleTextInput,
                            marginStart: 10,
                        }}
                        autoCapitalize='none'
                        placeholder="Password"
                        value={enterPassword}
                        onChangeText={(e) => setPassword(e)} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 15, alignItems: 'center',
                    paddingStart: 15,
                    paddingEnd: 0
                }}>

                    <CheckBox
                        onClick={() => {
                            setCheckTerms(!checkTerms)
                        }}
                        style={{ flex: 1 }}
                        isChecked={checkTerms}
                        rightText={"Remember me"}
                        rightTextStyle={{ ...styles.generalTxt, fontSize: 14, color: 'black', marginStart: 5 }}
                    />

                    <TouchableOpacity onPress={() => { openForgotScreen() }}>
                        <Text style={{ ...styles.generalTxt, fontSize: 14, color: '#0467B2' }}>Forgot Password? </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{
                flex: 2, marginStart: 30,
                marginEnd: 30
            }}>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0
                }} onPress={(e) => loginScreen(e)}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingStart: 127, paddingEnd: 127,
                        paddingTop: 15, paddingBottom: 15,
                        ...styles.generalTxt
                    }}>NEXT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,marginTop:10
                }} onPress={(e) => openRegisterScreen(e)}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingTop: 15, paddingBottom: 15,
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
                    marginTop: 10,paddingBottom:20

                }}>
                    {/* <Text
                        numberOfLines={1}
                        style={{
                            ...styles.generalTxt, fontSize: 14, color: 'black',
                            textAlign: 'center', marginTop: 15
                        }}> */}
                    <Text style={{
                        ...styles.generalTxt, fontSize: 14, color: 'black',
                        textAlign: 'center'
                    }}

                    >Please look into </Text>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={(e) => openPolicyScreen(TERMS)}>
                        <Text
                            style={{
                                ...styles.generalTxt, fontSize: 14,
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor,
                            }}>Terms of Use</Text>
                    </TouchableOpacity>
                    <Text style={{
                        ...styles.generalTxt, fontSize: 14, color: 'black',
                        textAlign: 'center'
                    }}> and </Text>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={(e) => openPolicyScreen(POLICY)}>
                        <Text
                            style={{
                                ...styles.generalTxt, fontSize: 14,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 40
    },
    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }
});

export default LoginView;
