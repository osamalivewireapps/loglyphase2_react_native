/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons, Images } from '../../../theme';

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
                            <Image source={Icons.icon_arrow_back1} style={{ marginTop: 2 }} />
                            <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: -5 }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginStart: 30,
                        marginEnd: 30, alignItems: 'center',
                        height: '100%'
                    }}>

                        <Image source={Images.img_new_password} />

                        <Text style={{
                            fontSize: 28, textAlign: 'center', padding: 10,
                            paddingTop: 25, paddingBottom: 25,
                            fontFamily: Fonts.type.bold, color: 'black'
                        }}>Enter New Password</Text>


                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            marginTop: 15, padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} />
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: 10
                                }}
                                autoCapitalize='none'
                                placeholder="New Password"
                                value={password}
                                onChangeText={(e)=>setPassword(e)} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            marginTop: 15, padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} />
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: 10
                                }}
                                autoCapitalize='none'
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={(e)=>setConfirmPassword(e)} />
                        </View>

                        <TouchableOpacity
                            onPress={(e) => openpasswordResetScreen(e)}
                            style={{
                                ...styles.styleButtons, alignSelf: 'flex-end', marginTop: 20
                            }}>
                            <Text style={{
                                fontSize: 22, textAlign: 'center', padding: 10,
                                paddingTop: 15, paddingBottom: 15,
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
        color: '#585858',
        flex: 8
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30,
        width: '100%',
    }
});

export default ChangePasswordView;
