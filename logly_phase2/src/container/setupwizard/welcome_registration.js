/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts, Images } from '../../theme';

class WelcomeRegistration extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.appBgColor, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginBottom: 10 }}>Welcome !</Text>
                <Text style={{ ...styles.generalTxt, margin: 20, textAlign: 'center' }}>To get started, Please complete your account setup</Text>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("ServicesSetup");
                }}>
                    <Image source={Images.img_btn_forward} marginTop={80} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default WelcomeRegistration;

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