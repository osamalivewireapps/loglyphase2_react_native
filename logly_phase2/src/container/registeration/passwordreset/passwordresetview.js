/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';

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
                    <Image source={Icons.icon_arrow_back1} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginStart: 30,
                marginEnd: 30, alignItems: 'center',
                height: '100%'
            }}>

                <Image source={Icons.icon_check_circle} />

                <Text style={{
                    fontSize: 28, textAlign: 'center', padding: 10,
                    paddingTop: 25, paddingBottom: 25,
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Passwords Reset Succesfully</Text>

                <Text style={{
                    ...styles.generalTxt,
                    fontSize: 20, textAlign: 'center', paddingStart: 10,
                    paddingEnd: 10, paddingBottom: 60

                }}>You have successfully resets your password. Please use your new password to login.</Text>


                <TouchableOpacity
                    onPress={() => openLoginScreen()}
                    style={{
                        ...styles.styleButtons, alignSelf: 'flex-end', marginTop: 50
                    }}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingTop: 15, paddingBottom: 15,
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
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30,
        width: '100%',
    },

});

export default PasswordResetView;
