/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, Icons, Images } from '../../../theme';

function ThanksRegistrationView(props) {
    const { backScreen, loginScreen } = props;

    return (
        <View style={{
            flex: 1, backgroundColor: 'white', alignItems: 'center',

            paddingStart: 30,
            paddingBottom: 30,
            paddingEnd: 30
        }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View style={{
                alignItems: 'center',
                flex: 9, justifyContent: 'center'
            }}>

                <Image source={Images.img_fireworks} />

                <Text style={{
                    fontSize: 28, textAlign: 'center', padding: 10,
                    paddingTop: 25, paddingBottom: 25,
                    fontFamily: Fonts.type.bold, color: 'black'
                }}>Thank you for Registration</Text>






            </View>
            <TouchableOpacity
                onPress={() => loginScreen()}
                style={{
                    ...styles.styleButtons,

                }}>
                <Text style={{
                    fontSize: 22, textAlign: 'center', padding: 10,
                    paddingTop: 15, paddingBottom: 15,
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

export default ThanksRegistrationView;
