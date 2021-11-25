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
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class WelcomeRegistration extends Component {

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

                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginBottom: verticalScale(10) }}>Welcome {this.props.route.params.name}!</Text>
                <Text style={{ ...styles.generalTxt, margin: moderateScale(20), textAlign: 'center' }}>To get started, Please complete{"\n"}your account setup</Text>
                <TouchableOpacity onPress={() => {
                    this.switchToServicesScreen();
                }}>
                    <Image 
                    resizeMode="contain"
                    style={{height:verticalScale(90),width:moderateScale(90)}}
                    source={Images.img_btn_forward} marginTop={verticalScale(80)} />
                </TouchableOpacity>
            </View>
        )
    }

    switchToServicesScreen() {
        switch (this.accountType) {

            case BUS_LISTING:
                this.props.navigation.navigate("BusListing");
                break;

            case CHARITY_ID:
            case BUSINESS:
                this.props.navigation.navigate("BusProfileSetup");
                break

            case INDIVIDUAL:
                this.props.navigation.navigate("AnimalInfo");
                break;

            default:
                this.props.navigation.navigate("ServicesSetup");
                break;
        }
    }
}



export default WelcomeRegistration;

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
        color: 'white',
        fontSize: moderateScale(18),
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
        borderRadius: moderateScale(30)
    }
});