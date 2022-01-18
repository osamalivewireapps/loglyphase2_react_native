/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, FlatList, Dimensions, Image } from "react-native";
import { AutoSizeText } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

export const BusAccountList = (props) => {

    return (
        <View>
            <AutoSizeText
                numberOfLines={1}
                minFontSize={moderateScale(12)}
                fontSize={moderateScale(14)}
                style={{
                    fontFamily: Fonts.type.medium,
                    color: '#404040',
                    marginBottom: verticalScale(10)

                }}
            >
                Business Account List
            </AutoSizeText>

            <FlatList
                data={['', '', '', '', '', '', '', '', '', '', '', '']}
                contentContainerStyle={{
                    minHeight: Dimensions.get('screen').height / 2

                }}
                renderItem={({ item, index }) => {
                    return renderBusAccounts(item, index);
                }}
            />
        </View>
    );

    function renderBusAccounts(item, index) {

        return (

            <View

                style={{
                    ...styles.boxcontainer,
                    shadowColor: 'white',
                    shadowOpacity: 1,
                    marginTop: verticalScale(10),
                    borderRadius: moderateScale(15),
                    paddingBottom: verticalScale(10)

                }}>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image
                        source={Images.img_friend_sample}
                        resizeMode='cover'
                        style={{
                            width: moderateScale(60),
                            height: '100%',
                            minHeight: verticalScale(50),
                            borderRadius: moderateScale(10)
                            , marginEnd: moderateScale(15)
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            flex: 0.95,
                        }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',


                        }}>
                            <View style={{
                                width: '100%',
                                paddingEnd: moderateScale(15),
                                alignItems: 'flex-start'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#404040',

                                    }}
                                >
                                    Business Name
                                </AutoSizeText>


                            </View>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                marginTop: verticalScale(5),

                                alignItems: 'center',
                            }}>

                                <Text
                                    numberOfLines={1}

                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',
                                        fontSize: moderateScale(12)

                                    }}
                                >
                                    Category:
                                </Text>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#404040',
                                        marginStart: moderateScale(5)

                                    }}
                                >
                                    Pet Grooming
                                </AutoSizeText>

                            </View>


                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                            }}>
                                <Text
                                    numberOfLines={1}

                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',
                                        fontSize: moderateScale(12),

                                    }}
                                >
                                    Distance:
                                </Text>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#404040',
                                        marginStart: moderateScale(5)

                                    }}
                                >
                                    1.2 Kilometers
                                </AutoSizeText>

                            </View>


                        </View>



                    </TouchableOpacity>

                    {/**
                    if rating is 5 so full star 
                    otherwise corner star 
                    */}

                    <View style={{
                    }}>
                        <Image
                            source={Icons.icon_starImageCorner}
                            resizeMode='contain'
                            style={{
                                width: moderateScale(15),
                                height: moderateScale(15),
                            }}
                        />

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(10)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',

                            }}
                        >
                            4.1
                        </AutoSizeText>
                    </View>



                </View>

                <View style={{
                    marginTop: verticalScale(10),
                    marginBottom: verticalScale(10),
                    backgroundColor: '#D9D9D9', width: '100%', height: verticalScale(1)
                }} />


                <TouchableOpacity style={{
                    ...styles.styleButtons,
                    borderRadius: moderateScale(10),
                    alignSelf: 'center'


                }} onPress={() => { props.nextScreen()}}>
                    <Text style={{
                        textAlign: 'center',
                        padding: moderateScale(20),
                        paddingTop: moderateScale(5),
                        paddingBottom: moderateScale(5),
                        ...styles.generalTxt,
                        fontSize: moderateScale(14)
                    }}>Book an Appointment</Text>
                </TouchableOpacity>
            </View>
        )
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


