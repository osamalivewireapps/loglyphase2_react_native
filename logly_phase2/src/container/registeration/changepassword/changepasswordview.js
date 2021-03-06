/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function ChangePasswordView(props) {
    const { backScreen, openpasswordResetScreen,
        password, confirmPassword,
        setPassword, setConfirmPassword   } = props;

 
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    flex={1}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}

                >
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
                        resizeMode='contain'
                            style={{ height: verticalScale(120), width: moderateScale(100) }}
                        source={Images.img_new_password} />

                        <Text style={{
                            fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(25), paddingBottom: verticalScale(25),
                            fontFamily: Fonts.type.bold, color: 'black'
                        }}>Enter New Password</Text>


                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            marginTop: verticalScale(15), padding: moderateScale(20), paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} style={{ height: moderateScale(17), width: moderateScale(15) }} />
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: moderateScale(10)
                                }}
                                autoCapitalize='none'
                                placeholder="New Password"
                                value={password}
                                maxLength={30}
                                onChangeText={(e)=>setPassword(e)} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            marginTop: verticalScale(15), padding: moderateScale(20), paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} style={{ height: moderateScale(17), width: moderateScale(15) }} />
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: moderateScale(10)
                                }}
                                maxLength={30}
                                autoCapitalize='none'
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={(e)=>setConfirmPassword(e)} />
                        </View>

                        <TouchableOpacity
                            onPress={(e) => openpasswordResetScreen(e)}
                            style={{
                                ...styles.styleButtons, alignSelf: 'flex-end', marginTop: verticalScale(20)
                            }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                                paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                                ...styles.generalTxt, color: 'white'
                            }}>UPDATE</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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

export default ChangePasswordView;
