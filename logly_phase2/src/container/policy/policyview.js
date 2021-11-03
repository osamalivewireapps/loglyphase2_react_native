/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Icons } from '../../theme';
import { WebView } from 'react-native-webview';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function PolicyView(props) {

    const { backScreen,header} = props;
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
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>{header}</Text>
                
            </View>
            <WebView source={{ uri: (header.startsWith("Terms of Use") ? 'https://logly.us/terms' :'https://logly.us/policy') }} />
        </View>
    )
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
        borderRadius: moderateScale(40)
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }
});

export default PolicyView;
