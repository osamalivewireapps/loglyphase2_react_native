/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import { CommonActions } from '@react-navigation/routers';


function CRMCustomerDetailView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { toggleDrawer, userObject } = props;

    const [tabs, setTab] = useState(0);


    return (
        <View style={{ flex: 1, backgroundColor: '#1CB875' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View style={{
                backgroundColor: 'white',
                //height: verticalScale(185)
            }}>
                <View style={{
                    backgroundColor: '#1CB875',
                    borderBottomLeftRadius: moderateScale(40),
                    //height: verticalScale(185)
                }}>
                    <View style={{
                        paddingBottom: verticalScale(10),
                        padding: moderateScale(25), flexDirection: 'row', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => { props.navigation.pop() }}>
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
                            <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </View>

                    </View>

                    <View
                        style={{
                            padding: moderateScale(25),
                            flexDirection: 'row',
                            paddingTop: verticalScale(10),
                            paddingBottom: verticalScale(20)
                        }}>

                        <View style={{
                            flex: 0.9,
                            marginStart: moderateScale(12)
                        }}>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start'

                            }}>

                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: moderateScale(20),
                                        height: verticalScale(20),
                                        tintColor: 'white',


                                    }}
                                    source={Icons.icon_crm_user} />
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(25)}
                                    style={{
                                        fontFamily: Fonts.type.bold,
                                        color: 'white',

                                        marginStart: moderateScale(15)

                                    }}
                                >
                                    Sterlie Max
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: verticalScale(5)
                            }}>

                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: moderateScale(13),
                                        height: verticalScale(13),
                                        marginStart: moderateScale(2),
                                        tintColor: 'white',

                                    }}
                                    source={Icons.icon_crm_email} />
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: 'white',
                                        marginStart: moderateScale(20)

                                    }}
                                >
                                    jack@gmail.com
                                </AutoSizeText>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: verticalScale(5)
                            }}>

                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: moderateScale(13),
                                        height: verticalScale(13),
                                        marginStart: moderateScale(2),
                                        tintColor: 'white',

                                    }}
                                    source={Icons.icon_crm_phone} />
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: 'white',
                                        marginStart: moderateScale(20)

                                    }}
                                >
                                    +123456789
                                </AutoSizeText>

                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: verticalScale(5),

                            }}>

                                <Image
                                    resizeMode='contain'
                                    style={{
                                        width: moderateScale(13),
                                        height: verticalScale(13),
                                        marginStart: moderateScale(2),
                                        tintColor: 'white',

                                    }}
                                    source={Icons.icon_crm_location} />
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: 'white',
                                        marginStart: moderateScale(20)

                                    }}
                                >
                                    Lake Worth , Florida
                                </AutoSizeText>

                            </View>



                        </View>
                        <Image
                            resizeMode='contain'
                            style={{
                                flex: 0.1,
                                width: moderateScale(13),
                                height: moderateScale(13),
                                marginTop: verticalScale(10)

                            }}
                            source={Icons.icon_edit_petprofile} />
                    </View>



                </View>
          </View>

           
            <ScrollView 
                style={{
                    borderTopRightRadius: moderateScale(40),
                    backgroundColor: 'white',}}
            keyboardShouldPersistTaps='handled'>
                <View style={{
                    backgroundColor: 'white',
                    padding: moderateScale(25),
                    

                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <View style={{
                            backgroundColor: '#FFD6D5',
                            borderRadius: moderateScale(15),
                            marginTop: verticalScale(5),
                            height: isTablet ? verticalScale(100) : verticalScale(80),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.4,
                            marginEnd: moderateScale(15),
                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#BC1D19',
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.bold,
                                    marginBottom: verticalScale(5),
                                }}>2
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#BC1D19',
                                    textAlign: 'center',
                                    width: '100%',
                                    paddingStart: moderateScale(4),
                                    paddingEnd: moderateScale(4),

                                }}>No.of.{'\n'}Purchases

                            </AutoSizeText>
                        </View>

                        <View style={{
                            backgroundColor: '#E1EDFF',
                            borderRadius: moderateScale(15),
                            marginTop: verticalScale(5),
                            height: isTablet ? verticalScale(100) : verticalScale(80),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.4,
                            marginEnd: moderateScale(15),
                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#003482',
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.bold,
                                    marginBottom: verticalScale(5),
                                }}>$1234.02
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#003482',
                                    textAlign: 'center',
                                    width: '100%',
                                    paddingStart: moderateScale(4),
                                    paddingEnd: moderateScale(4),

                                }}>Total purchase{'\n'}Amount

                            </AutoSizeText>
                        </View>
                    </View>

                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#003482',
                            width: '100%',
                            marginTop: verticalScale(25),
                            marginBottom: verticalScale(5),
                            fontSize: moderateScale(18),
                            paddingStart: moderateScale(4),
                            paddingEnd: moderateScale(4),

                        }}>Purchase History

                    </Text>

                    <FlatList
                        data={['', '']}
                        contentContainerStyle={{
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('CRMPurchaseHistoryDetail')}
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
                                                    height: verticalScale(15),

                                                }}
                                                source={Icons.icon_crm_paymentinvoice} />
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.bold,
                                                    color: Colors.appBgColor,
                                                    marginStart: moderateScale(10)

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
                                                Sold on:
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
                                                Sold Amount:
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
    )
}

export default CRMCustomerDetailView;
