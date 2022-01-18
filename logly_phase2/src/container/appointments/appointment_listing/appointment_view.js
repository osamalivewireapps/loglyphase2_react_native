/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import { FlatList } from 'react-native-gesture-handler';
import { RegisterPetView } from './registerpet';
import ViewPager from '@react-native-community/viewpager';
import { BusAccountList } from './busaccountlist';

function AppointmentListingView(props) {

    const [searchTxt, setSearchTxt] = useState('');

    const isTablet = DeviceInfo.isTablet();
    const pagerRef = useRef(null);
    const [pageNumber, setPageNumber] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'black',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { backScreen() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>


                        <TouchableOpacity onPress={() => {
                            const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                            });

                            props.navigation.dispatch(resetAction);

                        }}>


                            <Image source={Icons.icon_header_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{
                    paddingTop: 0,
                    padding: moderateScale(25),
                    flexDirection: 'row', width: '100%'
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            marginEnd: moderateScale(20),
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10)
                        }}>

                            <TextInput
                                onChangeText={(e) => {
                                    setSearchTxt(e)
                                }}
                                value={searchTxt}
                                placeholder='Search and Select the Business'
                                numberOfLines={1}
                                keyboardType='default'
                                autoCapitalize='none'
                                style={{
                                    keyboardShouldPersistTaps: true,
                                    flex: 0.9,
                                    height: verticalScale(40),
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    fontSize: moderateScale(14),
                                }} />
                            <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                        </View>

                        <TouchableOpacity onPress={() => { }}>
                            <Image source={Icons.icon_filter_list} resizeMode='contain' style={{ height: moderateScale(20), width: moderateScale(20) }} />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
            <View style={{ flex: 1, padding: moderateScale(25)}}>

                <ViewPager

                    style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>

                    <View key={0}>
                        <BusAccountList {...props} nextScreen={()=>nextScreen()}/>
                    </View>

                    <View key={1}>
                        <RegisterPetView {...props} />
                    </View>
                </ViewPager>
    
            </View>
        </View>
    );


    function nextScreen(e) {
        if (pageNumber + 1 < 2) {

            pagerRef.current.setPage(pageNumber + 1);
            setPageNumber(pageNumber + 1)


        } else {
            setTimeout(() => {
                setPageNumber(0)

            }, 1000)
            props.navigation.pop()
        }


    }

    function backScreen(e) {
        if (pageNumber > 0) {
            pagerRef.current.setPage(pageNumber - 1);
            setPageNumber(pageNumber - 1)
        }
        else {
            props.navigation.pop()
        }
    }



}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'black',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%'
    },
    generalTxt: {
        color: 'white',
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
        borderRadius: moderateScale(30)
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});

export default AppointmentListingView;