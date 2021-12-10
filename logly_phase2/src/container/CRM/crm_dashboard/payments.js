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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles';
import RBSheet from 'react-native-raw-bottom-sheet';

function PaymentsView(props) {

    const ACTIVITY_TYPE = ['All Time', 'Today', 'This Week', 'Yesterday', 'Last Week']

    const [tabUpcoming, setTabUpcoming] = useState(0);//0 for upcoming or vice versa
    return (
        <View style={{}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1, minHeight: Dimensions.get('window').height }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>

                        <TouchableOpacity
                            onPress={() =>
                                setTabUpcoming(0)}
                            style={{
                                flex: 0.5,
                                borderColor: Colors.appBgColor,
                                borderWidth: 1,
                                padding: moderateScale(5),
                                borderRadius: moderateScale(20),
                                paddingTop: verticalScale(6),
                                paddingBottom: verticalScale(6),
                                backgroundColor: tabUpcoming === 0 ? Colors.appBgColor : 'white',

                            }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
                                    color: tabUpcoming === 0 ? 'white' : Colors.appBgColor,

                                }}
                            >
                                Upcoming
                            </AutoSizeText>

                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => setTabUpcoming(1)} style={{
                                flex: 0.5,
                                marginStart: moderateScale(10),
                                padding: moderateScale(5),
                                borderRadius: moderateScale(20),
                                paddingTop: verticalScale(6),
                                paddingBottom: verticalScale(6),
                                borderColor: Colors.appBgColor,
                                borderWidth: 1,
                                backgroundColor: tabUpcoming === 1 ? Colors.appBgColor : 'white',

                            }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
                                    color: tabUpcoming === 1 ? 'white' : Colors.appBgColor,

                                }}
                            >
                                Received
                            </AutoSizeText>

                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={ACTIVITY_TYPE}
                        contentContainerStyle={{
                            marginTop: verticalScale(20),
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate('CRMPaymentDetails')}}
                                    style={{
                                        backgroundColor: '#F5F5F5',
                                        padding: moderateScale(5),
                                        borderRadius: moderateScale(10),
                                        marginTop: verticalScale(10),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: verticalScale(12),
                                        paddingBottom: verticalScale(12)
                                    }}>

                                    <View style={{
                                        flex: 0.9,
                                        marginStart: moderateScale(12)
                                    }}>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>

                                            <Image
                                                resizeMode='contain'
                                                style={{
                                                    width: moderateScale(15),
                                                    height: verticalScale(15)

                                                }}
                                                source={Icons.icon_crm_paymentinvoice} />
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',
                                                    marginStart: moderateScale(10)

                                                }}
                                            >
                                                Invoice Number:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.bold,
                                                    color: Colors.appBgColor,
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                123456
                                            </AutoSizeText>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: verticalScale(5)
                                        }}>

                                            <Image
                                                resizeMode='contain'
                                                style={{
                                                    width: moderateScale(15),
                                                    height: verticalScale(15)

                                                }}
                                                source={Icons.icon_crm_daterange} />
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',
                                                    marginStart: moderateScale(10)

                                                }}
                                            >
                                                Date:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                26 Nov,2021
                                            </AutoSizeText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: verticalScale(5)
                                        }}>

                                            <Image
                                                resizeMode='contain'
                                                style={{
                                                    width: moderateScale(15),
                                                    height: verticalScale(15)

                                                }}
                                                source={Icons.icon_crm_dollar} />
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',
                                                    marginStart: moderateScale(10)

                                                }}
                                            >
                                                Amount:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                $500
                                            </AutoSizeText>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: verticalScale(5)
                                        }}>

                                            <Image
                                                resizeMode='contain'
                                                style={{
                                                    width: moderateScale(15),
                                                    height: verticalScale(15)

                                                }}
                                                source={Icons.icon_crm_user} />
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',
                                                    marginStart: moderateScale(10)

                                                }}
                                            >
                                                Client:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                Jack
                                            </AutoSizeText>
                                        </View>

                                    </View>
                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            flex: 0.1,

                                        }}
                                        source={Icons.icon_arrow_blue} />
                                </TouchableOpacity>
                            )
                        }}

                    />
                </View>
            </ScrollView>



        </View>

    );


}


export { PaymentsView };