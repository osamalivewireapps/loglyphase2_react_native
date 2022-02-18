/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import styles from "./styleMain";
import Images from '../../theme/Images'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from "../../theme";

function QrScan(props) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />

            <TouchableOpacity onPress={() => {
                props.navigation.goBack();
            }}>
                <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ margin:moderateScale(25),height: moderateScale(45), width: moderateScale(45) }} />
            </TouchableOpacity>


            <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={Images.scan} style={{ width: moderateScale(250), height: verticalScale(250), marginTop: Dimensions.get('window').height * 0.13, }} />

                <View style={{ position: "absolute", bottom: verticalScale(25) }}>
                    <View >
                        <Text style={{ ...styles.subHeading, textAlign: "center" }}>Start Scanning </Text>
                        <Text style={{ ...styles.greyColor, textAlign: "center" }}>Place QR code inside the frame to scan.Please </Text>
                        <Text style={{ ...styles.greyColor, textAlign: "center" }}>avoid shake to get results quickly. </Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.appBgColor,
                        borderRadius: moderateScale(30),
                        margin: verticalScale(25),
                        marginTop: verticalScale(30)
                    }} onPress={() => {
                        props.navigation.navigate('QrScanning')
                    }}>
                        <Text style={{
                            color: 'white',
                            fontFamily: Fonts.type.base,
                            fontSize: moderateScale(20),
                            textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(12),
                            paddingBottom: verticalScale(12),

                        }}>Scan Now</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

export default QrScan;
