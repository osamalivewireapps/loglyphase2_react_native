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
import { TextInput } from 'react-native';


function CRMOrderSummary(props) {

    console.log("props-add-animal------->", props)
    const { nextScreen } = props;

    const isTablet = DeviceInfo.isTablet();
    const initialBreeder = [{ id: 0 }, { id: 1 }, { id: 2 }]
    const [isSelect, setIsSelect] = useState(-1);

  
    return (
        <View style={{ flex: 1 }}>

            <ImageBackground style={{ flex: 0.9, backgroundColor: '#161D6E' }}>

                <ScrollView
                    style={{ height: '100%', backgroundColor: 'white', borderBottomRightRadius: moderateScale(30) }}
                    keyboardShouldPersistTaps='handled'>
                    <View style={{ height: '100%' }}>


                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                marginTop: verticalScale(20),
                                marginStart: moderateScale(25),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',

                            }}
                        >
                            Breeder Information
                        </Text>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',
                                marginTop:verticalScale(10),
                                marginStart: moderateScale(25)

                            }}
                        >
                            Jack
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',
                                marginStart: moderateScale(25)

                            }}
                        >
                            Jack@gmail.com
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#404040',
                                marginStart: moderateScale(25)

                            }}
                        >
                            +12343434
                        </AutoSizeText>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            marginTop:verticalScale(10),
                            height: 1,
                            marginBottom: verticalScale(15)
                        }} />

                        <View style={{
                            ...CRMStyles.boxcontainer,
                            shadowOpacity: 0.09,
                            height: verticalScale(65),
                            borderRadius: moderateScale(15),
                            flexDirection: 'row', alignItems: 'center',
                            marginStart: moderateScale(25),
                            marginEnd: moderateScale(25),

                        }}>
                            <Image
                                source={Icons.icon_paw}
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
                            marginTop: verticalScale(10),
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
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',

                                }}
                            >
                                Discount
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
                            paddingBottom: moderateScale(5)
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
                            paddingTop:verticalScale(5),
                            padding: moderateScale(25),
                            paddingBottom: moderateScale(5)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',

                                }}
                            >
                                Total Amount
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
                                $10
                            </AutoSizeText>
                        </View>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            height: 1,
                        }} />

                    </View>
                </ScrollView>

            </ImageBackground>


            <View style={{
                flex: 0.15,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#161D6E',
                paddingStart: moderateScale(25),
                paddingEnd: moderateScale(25)
            }}>

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(16)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: 'white',
                        flex: 0.2,

                    }}
                >

                </AutoSizeText>

                <View style={{
                    flexDirection: 'row',
                    paddingEnd: moderateScale(15),
                    flex: 0.8,
                    justifyContent: 'center',
                }}>


                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(16)}
                        style={{
                            fontFamily: Fonts.type.bold,
                            color: 'white',
                            marginStart: moderateScale(5)

                        }}
                    >
                        Continue
                    </AutoSizeText>



                </View>

                <TouchableOpacity
                    style={{
                        flex: 0.2,
                    }}
                    onPress={(e) => nextScreen(e)}>
                    <Image resizeMode='contain'
                        source={Icons.icon_blue_forwardbtn}
                        style={{
                            width: moderateScale(50),
                            height: verticalScale(50)
                        }}
                    />

                </TouchableOpacity>
            </View>
        </View>
    );


    function renderBreedItem(item, index) {

        return (
            <View style={{
                ...CRMStyles.boxcontainer,
                shadowOpacity: 0.1,
                marginTop: verticalScale(10),
                height: verticalScale(65),
                borderRadius: moderateScale(15),
                flexDirection: 'row', alignItems: 'center', marginStart: moderateScale(25),
                marginEnd: moderateScale(25),
            }}>
                <Image
                    source={Images.img_friend_sample}
                    resizeMode='cover'
                    style={{
                        width: moderateScale(75),
                        height: '100%',
                        borderRadius: moderateScale(15)
                        , marginEnd: moderateScale(15)
                    }}
                />

                <TouchableOpacity
                    onPress={() => addBreeder(index)}
                    style={{
                        flex: 0.95,
                    }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'center'
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: Colors.appBgColor,

                                }}
                            >
                                Nagtile
                            </AutoSizeText>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: verticalScale(5)
                        }}>

                            <Image
                                resizeMode='contain'
                                style={{
                                    width: moderateScale(13),
                                    height: verticalScale(13)

                                }}
                                source={Icons.icon_crm_email} />
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                Jack@gmail.com
                            </AutoSizeText>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: verticalScale(5)
                        }}>

                            <Image
                                resizeMode='contain'
                                style={{
                                    width: moderateScale(13),
                                    height: verticalScale(13)

                                }}
                                source={Icons.icon_crm_phone} />
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                +123456789
                            </AutoSizeText>

                        </View>

                    </View>



                </TouchableOpacity>

                <Image
                    source={isSelect === index ? Icons.icon_check_circle_green : Icons.icon_uncheck_paackage}
                    resizeMode='contain'
                    style={{
                        width: moderateScale(15),
                        height: moderateScale(15),
                    }}
                />
            </View>
        )
    }




}

export default CRMOrderSummary;
