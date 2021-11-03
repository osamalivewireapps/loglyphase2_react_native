/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function ThanksRegistrationView(props) {
    const { backScreen, loginScreen } = props;

    return (
        <View style={{
            flex: 1, backgroundColor: 'white', alignItems: 'center',

            paddingStart: moderateScale(30),
            paddingBottom: moderateScale(30),
            paddingEnd: moderateScale(30)
        }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View style={{
                alignItems: 'center',
                flex: 9, justifyContent: 'center'
            }}>

                <Image source={Images.img_fireworks} resizeMode="contain"
                       style={{height:verticalScale(120),width:moderateScale(120)}} />

                <Text style={{
                    fontSize: moderateScale(28), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(25), paddingBottom: verticalScale(25),
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Thank you for Registration</Text>






            </View>
            <TouchableOpacity
                onPress={() => loginScreen()}
                style={{
                    ...styles.styleButtons,

                }}>
                <Text style={{
                    fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                    ...styles.generalTxt, color: 'white'
                }}>LOGIN</Text>
            </TouchableOpacity>

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

export default ThanksRegistrationView;
