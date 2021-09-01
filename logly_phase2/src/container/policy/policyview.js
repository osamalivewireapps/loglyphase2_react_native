/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Icons } from '../../theme';
import { WebView } from 'react-native-webview';


function PolicyView(props) {

    const { backScreen,header} = props;
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
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 0 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>{header}</Text>
                
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
        color: '#585858'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }
});

export default PolicyView;
