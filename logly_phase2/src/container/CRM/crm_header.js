/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import CRMStyles from './crm_styles';

function CRMHeaderView(props) {

   
    const isTablet = DeviceInfo.isTablet();

    const { name,icon,bgColor } = props;

   
    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{
                backgroundColor: bgColor,
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(160)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.backScreen ?props.backScreen():props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => {
                            const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                            });

                            props.navigation.dispatch(resetAction);

                        }}>


                            <Image source={Icons.icon_header_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(25)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.medium
                        }}>
                        {name}

                    </AutoSizeText>
                    <Image source={icon} resizeMode='contain'
                        style={props.iconStyles ? props.iconStyles:{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
        </View>
    )
}

export default CRMHeaderView;
