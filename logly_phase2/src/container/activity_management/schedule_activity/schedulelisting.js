/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';



function ScheduleListingView(props) {

    const ACTIVITY_TYPE = ['Today', 'Tomorrow', 'Upcoming']

    return (
        <View>

            <FlatList
                data={ACTIVITY_TYPE}
                contentContainerStyle={{
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('EditScheduleActivity')}
                         style={{paddingBottom:verticalScale(15)}}>

                            <View style={{ width: '100%', height: verticalScale(5), backgroundColor:'#F5F5F5'}}/>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: 'black',
                                    marginTop:verticalScale(10),
                                    marginStart:moderateScale(25)

                                }}
                            >
                                {item}
                            </AutoSizeText>
                        <View
                                
                            style={{
                                backgroundColor: '#BCFCD8',
                                padding: moderateScale(5),
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(10),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: verticalScale(12),
                                paddingBottom: verticalScale(12),
                                marginStart:moderateScale(25),
                                marginEnd: moderateScale(25)
                            }}>

                            <View style={{
                                flex: 0.9,
                                marginStart: moderateScale(12)
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#097D3B',
                               
                                    }}
                                >
                                    Cat Cleaning, Cat Wash
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#097D3B',
                      
                                    }}
                                >
                                    24 Nov, 12:30 pm, 05:30 pm
                                </AutoSizeText>


                            </View>
                            <Image
                                resizeMode='contain'
                                style={{
                                    flex: 0.1,

                                }}
                                source={Icons.icon_arrow_blue} />
                        </View>
                            <View
                                style={{
                                    backgroundColor: '#FFE7CF',
                                    padding: moderateScale(5),
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: verticalScale(12),
                                    paddingBottom: verticalScale(12),
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(25)
                                }}>

                                <View style={{
                                    flex: 0.9,
                                    marginStart: moderateScale(12)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: '#E57301',

                                        }}
                                    >
                                        Cat Cleaning, Cat Wash
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: '#E57301',

                                        }}
                                    >
                                        24 Nov, 12:30 pm, 05:30 pm
                                    </AutoSizeText>


                                </View>
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        flex: 0.1,

                                    }}
                                    source={Icons.icon_arrow_blue} />
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#F1EEFF',
                                    padding: moderateScale(5),
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: verticalScale(12),
                                    paddingBottom: verticalScale(12),
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(25)
                                }}>

                                <View style={{
                                    flex: 0.9,
                                    marginStart: moderateScale(12)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: Colors.appBgColor,

                                        }}
                                    >
                                        Cat Cleaning, Cat Wash
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: Colors.appBgColor,

                                        }}
                                    >
                                        24 Nov, 12:30 pm, 05:30 pm
                                    </AutoSizeText>


                                </View>
                                <Image
                                    resizeMode='contain'
                                    style={{
                                        flex: 0.1,

                                    }}
                                    source={Icons.icon_arrow_blue} />
                            </View>
                        </TouchableOpacity>
                    )
                }}

            />
        </View>
    );
}

export default ScheduleListingView;