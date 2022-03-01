/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { SalesHistoryView } from './saleshostory';
import CRMStyles from './../crm_styles'
import { PaymentsView } from './payments';
import { CustomersCRMView } from './customers';


function CRMDashBoardView(props) {


    const isTablet = Platform.isTV;

    const { userObject } = props;

    const [tabs, setTab] = useState(0);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{ padding: moderateScale(25), flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }}>
                    <Image source={Icons.icon_burger_menu} resizeMode='contain' style={{ height: moderateScale(25), width: moderateScale(25) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                        <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('QrScan')} style={{ height: moderateScale(45), width: moderateScale(45) }}>

                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={{
                ...CRMStyles.generalTxt,
                fontFamily: Fonts.type.bold,
                fontSize: moderateScale(30),
                marginStart: moderateScale(25)
            }}>CRM</Text>

            <View style={{
                flexDirection: 'row',
                marginTop: verticalScale(25),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: verticalScale(15)
            }}>

                <TouchableOpacity
                    onPress={() => setTab(0)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...CRMStyles.generalTxt,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Sales History</Text>

                    {tabs === 0 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: '#BEBEBE',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => setTab(1)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...CRMStyles.generalTxt,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Payments</Text>
                    {tabs === 1 ? getHorizontalLine() : <View />}
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: '#BEBEBE',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => setTab(2)}

                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...CRMStyles.generalTxt,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Customers</Text>
                    {tabs === 2 ? getHorizontalLine() : <View />}
                </TouchableOpacity>
            </View>
            {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
                <View style={{ padding: moderateScale(25), paddingTop: 0,flex:1 }}>


                    {getInnerScreens()}

                </View>
            {/* </ScrollView> */}

            {tabs === 0 || tabs === 2 ?
                <TouchableOpacity
                    style={{
                        height: moderateScale(50),
                        width: moderateScale(50),
                        top: Dimensions.get('screen').height - (Platform.OS === 'ios' ? verticalScale(80) : verticalScale(120)),
                        right: moderateScale(20),
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}
                    onPress={() => {
                        if (tabs === 0)
                            props.navigation.navigate('CRMNewOrder')
                        else if (tabs === 2)
                            props.navigation.navigate('CRMAddCustomers')
                    }}>
                    <Image backgroundColor={Colors.appBgColor}
                        style={{
                            height: moderateScale(50),
                            width: moderateScale(50),
                            borderRadius: moderateScale(50),
                            position: 'absolute'

                        }}

                    />
                    <Image
                        source={Icons.icon_white_plus}
                        style={{
                            height: moderateScale(20),
                            width: moderateScale(20),
                        }}>

                    </Image>
                </TouchableOpacity>
                : <View />}

        </View>);

    function getInnerScreens() {
        switch (tabs) {
            case 0:
                return <SalesHistoryView {...props} />;

            case 1:
                return <PaymentsView {...props} />;

            case 2:
                return <CustomersCRMView {...props} />;

        }
    }
    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: '#F3950D',
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
        )
    }
}



export default CRMDashBoardView;