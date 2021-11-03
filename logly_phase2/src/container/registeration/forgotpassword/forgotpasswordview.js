/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts, Icons } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

function ForgotPasswordView(props) {
    const { backScreen, openVerificationCodeScreen,
        userEmail, setEmail, sendCodePhone } = props;
    const [serviceTypeIndex, setServiceTypeIndex] = useState(0);


    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
                behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
            >

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

                        <Image resizeMode='contain' source={Icons.icon_forgotpassword_lock} style={{ height: verticalScale(120), width: moderateScale(100) }} />

                        <Text style={{
                            fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(25), paddingBottom: verticalScale(25),
                            fontFamily: Fonts.type.bold, color: 'black'
                        }}>Reset your Password</Text>

                        {sendCodePhone.email.length > 0 ? getSendCodeView() : getForgetPasswordView()}

                        <TouchableOpacity
                            onPress={(e) => openVerificationCodeScreen(serviceTypeIndex)}
                            style={{
                                ...styles.styleButtons, alignSelf: 'flex-end', marginTop: verticalScale(20)
                            }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                                paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                                ...styles.generalTxt, color: 'white'
                            }}>CONTINUE</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    );

    function getForgetPasswordView() {
        return (
            <View>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10), paddingBottom: verticalScale(60)

                }}>Please enter the registered email
                    address below.</Text>

                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row',
                    padding: moderateScale(20), paddingTop: 0,
                    paddingBottom: 0, alignItems: 'center',
                    marginBottom: moderateScale(30)
                }}>

                    <Image source={Icons.icon_email}
                        style={{ height: verticalScale(10), width: moderateScale(15) }} />
                    <TextInput placeholder="Email" style={{
                        ...styles.styleTextInput,
                        marginStart: moderateScale(10),
                        flex: 1
                    }}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        onChangeText={(e) => setEmail(e)}
                        value={userEmail} />
                </View>
            </View>
        )
    }

    function getSendCodeView() {
        return (
            <View marginTop={verticalScale(25)}>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10), paddingBottom: moderateScale(50)

                }}>How do you want to get the code to reset your password?</Text>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image
                        resizeMode='contain'
                        style={{ height: verticalScale(10), width: moderateScale(12) }}
                        source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Image
                        resizeMode='contain'
                        source={Icons.icon_blue_email} style={{
                            height: verticalScale(10), width: moderateScale(12),
                            marginStart: moderateScale(15), marginEnd: moderateScale(15), marginTop: 0
                        }} />
                    <Text style={{ ...styles.generalTxt, fontSize: moderateScale(18), paddingTop: verticalScale(15) }}>{sendCodePhone.formattedEmail}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(25), marginBottom: moderateScale(50) }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image
                        resizeMode='contain'
                        style={{ height: verticalScale(10), width: moderateScale(12) }}
                        source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Image
                        resizeMode='contain'
                        source={Icons.icon_blue_mobile} style={{
                            height: verticalScale(15), width: moderateScale(12),
                            marginStart: moderateScale(15), marginEnd: moderateScale(15), marginTop: 0
                        }} />
                    <Text style={{ ...styles.generalTxt, fontSize: moderateScale(18), paddingTop: verticalScale(15) }}>{sendCodePhone.formattedPhone}</Text>
                </TouchableOpacity>

            </View>
        )
    }
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

export default ForgotPasswordView;
