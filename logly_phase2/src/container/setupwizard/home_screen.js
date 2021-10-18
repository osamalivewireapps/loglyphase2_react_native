/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
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
import { BUSINESS, BUS_LISTING, BUS_SER_PROVIDER, CHARITY_ID, INDIVIDUAL } from '../../constants';
import { Colors, Fonts, Images } from '../../theme';
import DataHandler from '../../utils/DataHandler';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.appBgColor, justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginBottom: 0 }}>Home Screen</Text>
                <Text style={{ ...styles.generalTxt, margin: 0, textAlign: 'center' }}></Text>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Login");
                }}>
                    <Image source={Images.img_btn_forward} marginTop={0} />
                </TouchableOpacity>
            </View>
        )
    }

    
}



export default HomeScreen;

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