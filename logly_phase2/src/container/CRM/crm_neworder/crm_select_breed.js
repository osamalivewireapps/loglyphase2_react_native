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
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import { TextInput } from 'react-native';


function CRMAddBreedView(props) {

    const { nextScreen } = props;

    const isTablet = DeviceInfo.isTablet();
    const initialBreeder = [{ id: 0 }, { id: 1 }, { id: 2 }]
    const [isSelect, setIsSelect] = useState(-1);

    const [searchTxt, setSearchTxt] = useState('');
    const [addItems, setAddItems] = useState(initialBreeder);

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground style={{ flex: 0.9, backgroundColor: '#161D6E' }}>

                <View style={{
                    height: '100%', backgroundColor: 'white', borderBottomRightRadius: moderateScale(30),
                    justifyContent:'flex-end'
                }}>


                    <Text
                        style={{
                            fontSize: moderateScale(16),
                            marginTop: verticalScale(20),
                            marginStart: moderateScale(25),
                            fontFamily: Fonts.type.medium,
                            color: '#464646',

                        }}
                    >
                        Select Breeder
                    </Text>
                    <View style={{
                        padding: moderateScale(25),
                        paddingTop: verticalScale(10),
                        paddingBottom: 0, flexDirection: 'row', width: '100%'
                    }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>


                            <View style={{
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setSearchTxt(e)
                                    }}
                                    value={searchTxt}
                                    placeholder='Search'
                                    numberOfLines={1}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    style={{
                                        keyboardShouldPersistTaps: true,
                                        flex: 1,
                                        height: verticalScale(35),
                                        ...CRMStyles.generalTxt,
                                        color: '#777777',
                                        fontSize: moderateScale(14),
                                        marginStart: moderateScale(15)
                                    }} />
                                <Image source={Icons.icon_feather_search}
                                    resizeMode='contain'
                                    style={{
                                        height: moderateScale(15),
                                        width: moderateScale(15),
                                        margin: moderateScale(10),
                                        marginEnd: moderateScale(15)
                                    }} />

                            </View>



                        </View>
                    </View>




                    <FlatList
                        data={addItems}
                        contentContainerStyle={{
                            marginTop: verticalScale(10)
                        }}
                        renderItem={({ item, index }) => {
                            return renderBreedItem(item, index);
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            height: moderateScale(50),
                            width: moderateScale(50),
                            right: moderateScale(20),
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom:moderateScale(20)

                        }}
                        onPress={() => {
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

                </View>

              
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
                height: moderateVerticalScale(70),
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

    function addBreeder(index) {
        if (isSelect === index) {
            setIsSelect(-1)
        } else
            setIsSelect(index);
    }


}

export default CRMAddBreedView;
