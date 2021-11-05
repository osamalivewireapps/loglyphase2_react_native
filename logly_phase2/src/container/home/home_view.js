/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { TYPES_OF_SERVICES } from '../../constants';
import { Colors, Fonts, Icons, Images } from '../../theme';

function HomeView(props) {

    const { toggleDrawer} = props;
    const PET_ACTIVITY = [{ bg: Images.img_pet_profile, txt: 'Pet Profile' }, { bg: Images.img_activity, txt: 'Activity' }]

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ padding: moderateScale(25) }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { toggleDrawer.toggleDrawer()}}>
                            <Image source={Icons.icon_burger_menu} resizeMode='contain' style={{ height: moderateScale(25), width: moderateScale(25) }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                            <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                            <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </View>
                    </View>

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(30),
                        marginTop: verticalScale(10)
                    }}>Welcome,</Text>
                    <Text style={{
                        ...styles.generalTxt,
                    }}>James Anderson</Text>

                    <FlatList
                        horizontal
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10) }}
                        data={PET_ACTIVITY}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{
                                        borderRadius: moderateScale(10),
                                        width: Dimensions.get('screen').width / moderateScale(2),
                                        height: verticalScale(170),
                                        marginEnd: moderateScale(10),
                                        alignItems:'flex-start',
                                        justifyContent:'flex-end',
                                    }}
                                >
                                <Image
                                    source={item.bg}
                                    resizeMode='stretch'
                                    style={{
                                        position:'absolute',
                                        width: '100%',
                                        height: '100%',
                                    }}/>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: 'white',
                                            marginBottom: verticalScale(15),
                                            marginStart: moderateScale(15)
                                        }}>{item.txt}
                                    </AutoSizeText>
                                </View>
                            )
                        }}


                    />

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(24),
                        marginTop: verticalScale(20)
                    }}>Services</Text>

                    <FlatList
                        horizontal
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10) }}
                        data={TYPES_OF_SERVICES}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: moderateScale(15),
                                        width: Dimensions.get('screen').width / moderateScale(2),
                                        height: verticalScale(130),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginEnd: moderateScale(10),
                                        backgroundColor: item.bg
                                    }}
                                >
                                    <Image
                                        source={item.url}
                                        resizeMode='contain'
                                        resizeMethod="auto"
                                        style={{ width: '60%', height: '60%' }}
                                    />

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontFamily: Fonts.type.bold,
                                            color: 'white',
                                            paddingTop: verticalScale(10)
                                        }}>{item.name}
                                    </AutoSizeText>
                                </TouchableOpacity>
                            )
                        }}


                    />

                    <TouchableOpacity
                        style={{
                            borderRadius: moderateScale(15),
                            width: '100%',
                            flexDirection: 'row',
                            height: verticalScale(80),
                            marginTop: verticalScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#4B24D5'
                        }}
                    >
                        <Image
                            source={Images.img_donate}
                            resizeMode='contain'
                            style={{ flex: 0.35, 
                            height:'100%',
                            }}
                        />

                        <Text
                            numberOfLines={1}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.bold,
                                color: 'white',
                                flex: 0.45,
                                marginStart: moderateScale(-50),
                                textAlign: 'center',
                            }}>Feed an animal
                        </Text>


                        <TouchableOpacity
                            style={{
                                borderRadius: moderateScale(15),
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                height: moderateScale(30),
                                flex: 0.2,
                                margin: moderateScale(20),
                            }}
                        >
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    fontFamily: Fonts.type.bold,
                                    color: Colors.appBgColor,
                                    flex: 0.4,
                                    textAlign: 'center',
                                }}>Donate
                            </AutoSizeText>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(24),
                        marginTop: verticalScale(20)
                    }}>Market place</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                borderRadius: moderateScale(10),
                                justifyContent: 'center',
                                backgroundColor: '#EEB208',
                                height: moderateScale(60),
                                flex: 0.5,
                                marginTop: moderateScale(20),
                            }}
                        >
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    fontFamily: Fonts.type.bold,
                                    color: 'white',
                                    textAlign: 'center',
                                }}>Buy Animals
                            </AutoSizeText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                borderRadius: moderateScale(10),
                                justifyContent: 'center',
                                backgroundColor: '#097D3B',
                                height: moderateScale(60),
                                flex: 0.5,
                                marginStart: moderateScale(10),
                                marginTop: moderateScale(20),
                            }}
                        >
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    fontFamily: Fonts.type.bold,
                                    color: 'white',
                                    textAlign: 'center',
                                }}>Buy Products
                            </AutoSizeText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >

        </View >
    )

}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(40),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(40),
        width: '100%'
    },
    generalTxt: {
        color: '#464646',
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
    }
});

export default HomeView;