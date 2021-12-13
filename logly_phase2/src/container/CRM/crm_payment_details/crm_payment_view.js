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
import CRMHeaderView from '../crm_header';


function CRMPaymentDetailsView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { toggleDrawer, userObject } = props;

    const [tabs, setTab] = useState(0);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <CRMHeaderView
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }}
                name="Payments" icon={Icons.icon_crm_payment_details} bgColor='#CD1818'
                {...props}
            />
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ paddingTop: moderateScale(30) }}>

                    <Text
                        style={{
                            fontSize: moderateScale(16),
                            marginBottom: verticalScale(20),
                            marginStart: moderateScale(25),
                            fontFamily: Fonts.type.medium,
                            color: '#464646',

                        }}
                    >
                        Sales Details
                    </Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', 
                        marginStart: moderateScale(25),
                        marginEnd: moderateScale(25)
                    }}>
                        <Image
                            source={Images.img_friend_sample}
                            resizeMode='cover'
                            style={{
                                width: moderateScale(65),
                                height: verticalScale(55),
                                borderRadius: moderateScale(15)
                                , marginEnd: moderateScale(15)
                            }}
                        />

                        <View style={{
                            flex: 1, alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Order ID
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#404040',
                                        flex: 1,
                                        textAlign: 'right',
                                        marginStart: moderateScale(10)

                                    }}
                                >
                                    123456
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Sold on
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#404040',
                                        flex: 1,
                                        textAlign: 'right',
                                        marginStart: moderateScale(10)

                                    }}
                                >
                                    26 Nov, 2021
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Sold to
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: '#404040',
                                        flex: 1,
                                        textAlign: 'right',
                                        marginStart: moderateScale(10)

                                    }}
                                >
                                    Jack
                                </AutoSizeText>
                            </View>
                        </View>

                    </View>

                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
                        height: 1,
                        marginTop: verticalScale(10),
                        marginBottom: verticalScale(10)
                    }} />

                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: '#404040',
                            fontFamily: Fonts.type.bold,
                            paddingStart: moderateScale(35),
                            marginBottom: verticalScale(15)
                        }}>
                        Order Summary

                    </AutoSizeText>



                    <View style={{
                        ...CRMStyles.boxcontainer,
                        shadowOpacity: 0.09,
                        height: verticalScale(65),
                        borderRadius: moderateScale(15),
                        flexDirection: 'row', alignItems: 'center', marginStart: moderateScale(25),
                        marginEnd: moderateScale(25),

                    }}>
                        <Image
                            source={Images.img_user_placeholder}
                            resizeMode='cover'
                            style={{
                                width: moderateScale(65),
                                height: '100%',
                                borderRadius: moderateScale(15)
                                , marginEnd: moderateScale(15)
                            }}
                        />

                        <View style={{
                            flex: 1, alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingEnd: moderateScale(15)
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(16)}
                                    style={{
                                        fontFamily: Fonts.type.bold,
                                        color: '#464646',

                                    }}
                                >
                                    Nagtile
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: Colors.appBgColor,
                                        flex: 1,
                                        textAlign: 'right',
                                        marginStart: moderateScale(10)

                                    }}
                                >
                                    $100
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingEnd: moderateScale(15),
                                width: '100%',
                                alignItems: 'flex-end',
                                height: verticalScale(16),
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',
                                        flex: 1

                                    }}
                                >
                                    Parrot
                                </AutoSizeText>
                                <View style={{
                                    backgroundColor: '#E27F0E',
                                    justifyContent: 'center',
                                    paddingStart: moderateScale(5),
                                    paddingEnd: moderateScale(5),
                                    borderRadius: moderateScale(10)
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: 'white',

                                        }}
                                    >
                                        1
                                    </AutoSizeText>
                                </View>
                            </View>

                        </View>

                    </View>

                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
                        height: 1,
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(20)
                    }} />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingStart: moderateScale(25),
                        paddingEnd: moderateScale(25),
                        paddingBottom: moderateScale(10)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',

                            }}
                        >
                            Discounted amount
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#A1A1A1',
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            $0
                        </AutoSizeText>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingStart: moderateScale(25),
                        paddingEnd: moderateScale(25),
                        paddingBottom: moderateScale(10)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',

                            }}
                        >
                            Sub Total
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#A1A1A1',
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            $100
                        </AutoSizeText>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingStart: moderateScale(25),
                        paddingEnd: moderateScale(25),
                        paddingBottom: moderateScale(10)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',

                            }}
                        >
                            Salex Tax @10 %
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#A1A1A1',
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            $10
                        </AutoSizeText>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingStart: moderateScale(25),
                        paddingEnd: moderateScale(25),
                        paddingBottom: moderateScale(10)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',

                            }}
                        >
                            Tax Amount
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#A1A1A1',
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            $10
                        </AutoSizeText>
                    </View>

                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
                        height: 1,
                        marginBottom: verticalScale(10)
                    }} />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingStart: moderateScale(25),
                        paddingEnd: moderateScale(25),
                        paddingBottom: moderateScale(10)
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
                            Total Amount
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.bold,
                                color: Colors.appBgColor,
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            $111.250
                        </AutoSizeText>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.pop()
                        }}
                        style={{
                            ...CRMStyles.styleButtons, marginTop: verticalScale(50),
                            backgroundColor: Colors.appBgColor,
                            marginStart:moderateScale(35),
                            marginEnd: moderateScale(35),
                        }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                            ...CRMStyles.generalTxt, color: 'white'
                        }}>SEND REMINDER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            props.navigation.pop();
                        }}
                        style={{
                            ...CRMStyles.styleButtons, marginTop: verticalScale(10),
                            marginStart: moderateScale(35),
                            marginEnd: moderateScale(35),
                        }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(0), paddingBottom: verticalScale(10),
                            ...CRMStyles.generalTxt, color: Colors.appBgColor
                        }}>MARK AS PAID</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}

export default CRMPaymentDetailsView;
