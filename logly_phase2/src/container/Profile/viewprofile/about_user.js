/* eslint-disable no-unreachable */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Share, Alert, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { updateFeatured, getAnimal, updatePrivacy } from '../../../actions/AnimalModule';
import { fontSize } from 'styled-system';
import { INDIVIDUAL } from '../../../constants';

function AboutUserView(props) {

    const { userObject, accountType, updateUser } = props;

    const dispatch = useDispatch();

    return (
        <View>

            <View style={{
                flexDirection: 'row',
                paddingStart: moderateScale(50),
                paddingEnd: moderateScale(80),
                paddingTop: verticalScale(0),
                paddingBottom: verticalScale(10)

            }}>

                <Image
                    resizeMode='contain'
                    style={{
                        width: moderateScale(20),
                        height: verticalScale(20),
                        marginEnd: moderateScale(25),

                    }}
                    source={Icons.icon_profile_location_on} />
                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#464646',
                        marginStart: moderateScale(10)

                    }}
                >
                    {userObject ? userObject.city + ', ' + userObject.state : ''}
                </AutoSizeText>
            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#DCDCDC',
                    height: verticalScale(1)
                }}
            />
            <View style={{
                flexDirection: 'row',
                paddingStart: moderateScale(50),
                paddingEnd: moderateScale(80),
                paddingTop: verticalScale(10),
                paddingBottom: verticalScale(10)

            }}>

                <Image
                    resizeMode='contain'
                    style={{
                        width: moderateScale(20),
                        height: verticalScale(20),
                        marginEnd: moderateScale(25),

                    }}
                    source={Icons.icon_profile_email} />
                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#464646',
                        marginStart: moderateScale(10)

                    }}
                >
                    {userObject ? userObject.email : ''}
                </AutoSizeText>
            </View>

            <View
                style={{
                    width: '100%',
                    backgroundColor: '#DCDCDC',
                    height: verticalScale(1)
                }}
            />
            <View style={{
                flexDirection: 'row',
                paddingStart: moderateScale(50),
                paddingEnd: moderateScale(80),
                paddingTop: verticalScale(10),
                paddingBottom: verticalScale(10)

            }}>

                <Image
                    resizeMode='contain'
                    style={{
                        width: moderateScale(20),
                        height: verticalScale(20),
                        marginEnd: moderateScale(25),

                    }}
                    source={Icons.icon_profile_phone} />
                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#464646',
                        marginStart: moderateScale(10)

                    }}
                >
                    {userObject ? userObject.phone : ''}
                </AutoSizeText>
            </View>

            <View
                style={{
                    width: '100%',
                    backgroundColor: '#DCDCDC',
                    height: verticalScale(1)
                }}
            />

            <View style={{
                paddingStart: moderateScale(40),
                paddingEnd: moderateScale(80),
                paddingTop: verticalScale(10),
                paddingBottom: verticalScale(10)

            }}>

                <Text
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#464646',
                        marginStart: moderateScale(10),
                        fontSize:moderateScale(16)

                    }}
                >
                    About
                </Text>
                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.base,
                        color: '#464646',
                        marginTop:verticalScale(5),
                        marginStart: moderateScale(10)

                    }}
                >
                    {userObject.businessDetails !== null && userObject.businessDetails ? userObject.businessDetails?.businessInfo: ''}
                </AutoSizeText>

                {accountType !== INDIVIDUAL?<View>
                    <Text
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#464646',
                            marginStart: moderateScale(10),
                            fontSize: moderateScale(16),
                            marginTop:verticalScale(10)

                        }}
                    >
                        Days Open
                    </Text>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        style={{
                            fontFamily: Fonts.type.base,
                            color: '#464646',
                            marginTop: verticalScale(5),
                            marginStart: moderateScale(10)

                        }}
                    >
                        {userObject && userObject.businessDetails !== null && userObject.businessDetails?.daysOpen? getDays(userObject.businessDetails.daysOpen) : ''} 
                    </AutoSizeText>

                    <Text
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#464646',
                            marginStart: moderateScale(10),
                            fontSize: moderateScale(16),
                            marginTop: verticalScale(10)

                        }}
                    >
                        Operating Hours
                    </Text>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        style={{
                            fontFamily: Fonts.type.base,
                            color: '#464646',
                            marginTop: verticalScale(5),
                            marginStart: moderateScale(10)

                        }}
                    >
                        {userObject.businessDetails !== null && userObject.businessDetails && userObject.businessDetails.openHrStart !== null && userObject.businessDetails.openHrEnd !== null ? moment(userObject.businessDetails.openHrStart).format('hh:mm:ss A') + " - " + moment(userObject.businessDetails.openHrEnd).format('hh:mm:ss A') : ''}
                    </AutoSizeText>
                </View>:<View/>}

            </View>

        </View>

    );



    ///////////////////////   FEATURED STATUS ////////////////
    function getDays(e) {
        console.log('days open-->',e)
        let days='';
        e.forEach((value) => {
            days = days+value + ","
        })
        days=days.substring(0,days.length-1);
        return days;
    }



}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'transparent',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(46),
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%',
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base,
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(10),
    },
});

export default AboutUserView;
