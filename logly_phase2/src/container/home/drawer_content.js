/* eslint-disable jsx-quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, useColorScheme, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { TYPES_OF_SERVICES } from '../../constants';
import { Colors, Fonts, Icons, Images } from '../../theme';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import DeviceInfo from 'react-native-device-info';

function CustomDrawer(props) {

    const isTablet = DeviceInfo.isTablet;
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: Colors.appBgColor,
                alignItems: 'center',
                paddingStart: moderateScale(40),
                flex: 0.3, width: '100%', flexDirection: 'row'
            }}>

                <Image source={Icons.icon_edit_profile} resizeMode='contain'
                    style={{ height: moderateScale(30), width: moderateScale(30) }}
                />
                <View style={{ marginStart: moderateScale(20), marginTop: verticalScale(10) }}>

                    <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(20) }}>James Cordon</Text>
                    <Text style={{ ...styles.generalTxt }}>Edit Profile</Text>
                </View>
            </View>
            <DrawerContentScrollView {...props} style={{
                flex: 0.5,
                paddingTop:Platform.isPad?verticalScale(40):verticalScale(0)
            }}

            >

                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ ...styles.bottomDrawerSection, flex: 0.2 }}>
                <View backgroundColor='#464646' height={moderateScale(0.5)} />
                <View style={{ flexDirection: 'row', paddingStart: moderateScale(40), marginTop: verticalScale(25) }}>
                    <Image source={Icons.icon_logout} resizeMode='contain'
                        style={{ height: moderateScale(20), width: moderateScale(20) }} />
                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(20) }}>Logout</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 0,
        borderBottomColor: 'red',
        borderBottomWidth: 0,
        borderTopColor: '#f4f4f4',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default CustomDrawer;
