/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Text, FlatList } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import Util from '../../../utils';
import moment from 'moment';

function EditScheduleView(props) {

    const isTablet = DeviceInfo.isTablet();

    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: '#EEB208',
                shadowColor: 'white',
                borderRadius: 0,
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack();
                    }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(15)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Activity Management

                    </AutoSizeText>
                    <Image source={Icons.icon_header_activitymang} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.45, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={50}
                    behavior={Platform.OS === "ios" ? "padding" : null}

                >


                    <View style={{
                        flex: 1,

                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(16)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: Colors.appBgColor,
                                margin: moderateScale(25),
                                marginBottom: 0

                            }}
                        >
                            Cat Cleaning
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#777777',
                                marginTop: verticalScale(5),
                                margin: moderateScale(25),
                                marginBottom: 0

                            }}
                        >
                            Cat Wash
                        </AutoSizeText>

                        <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(10), width: '100%', height: verticalScale(5), backgroundColor: '#F5F5F5' }} />

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(16)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',
                                marginTop: 0,
                                margin: moderateScale(25),
                                marginBottom: 0

                            }}
                        >
                            Time
                        </AutoSizeText>

                        <View style={{
                            flexDirection: 'row', marginTop: verticalScale(5),
                            marginStart: moderateScale(25)
                        }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: moderateScale(10),
                            height: verticalScale(30),
                            paddingStart:moderateScale(5),
                            paddingEnd:moderateScale(5),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: Colors.appBgColor,
                            borderWidth: moderateScale(1),
                            marginEnd: moderateScale(10),
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    fontFamily:Fonts.type.medium,
                                    color: Colors.appBgColor
                                }}>12:30 PM
                            </AutoSizeText>
                        </View>

                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: moderateScale(10),
                                height: verticalScale(30),
                                paddingStart: moderateScale(5),
                                paddingEnd: moderateScale(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: Colors.appBgColor,
                                borderWidth: moderateScale(1),
                                marginEnd: moderateScale(10),
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        fontFamily: Fonts.type.medium,
                                        color: Colors.appBgColor
                                    }}>05:30 PM
                                </AutoSizeText>
                            </View>
                        
                        </View>

                    <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(10), width: '100%', height: verticalScale(5), backgroundColor: '#F5F5F5' }} />

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(16)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#404040',
                            marginTop: 0,
                            margin: moderateScale(25),
                            marginBottom: 0

                        }}
                    >
                        Day & Date
                    </AutoSizeText>

                        <View style={{
                            flexDirection: 'row', marginTop: verticalScale(5),
                            marginStart: moderateScale(25)
                        }}>
                        <View style={{
                            backgroundColor: '#FFC081',
                            borderRadius: moderateScale(10),
                            height: verticalScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:moderateScale(75),
                            marginEnd: moderateScale(10),
                                paddingStart: moderateScale(5),
                                paddingEnd: moderateScale(5),
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: Colors.appBgColor
                                }}>Mon
                            </AutoSizeText>
                        </View>

                            <View style={{
                                backgroundColor: '#FFC081',
                                borderRadius: moderateScale(10),
                                height: verticalScale(30),
                                width:moderateScale(75),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginEnd: moderateScale(10),
                                paddingStart: moderateScale(5),
                                paddingEnd: moderateScale(5),
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: Colors.appBgColor
                                    }}>Tues
                                </AutoSizeText>
                            </View>
                        </View>

                    <View style={{ marginTop: verticalScale(10), marginBottom: verticalScale(10), width: '100%', height: verticalScale(5), backgroundColor: '#F5F5F5' }} />
                        <View style={{
                            ...styles.boxcontainer,
                            height: verticalScale(100),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateDesc ? 'transparent' : 'darkred',
                            shadowOpacity: validateDesc ? 0.25 : 1,
                            marginTop:verticalScale(5),
                            margin:moderateScale(25)
                        }}>


                            <TextInput placeholder="Comments" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                paddingTop: verticalScale(15),
                                padding: moderateScale(15),
                                textAlign: 'left',
                                height: verticalScale(100),
                            }}
                                underlineColorAndroid="transparent"
                                require={true}
                                multiline={true}
                                numberOfLines={50}
                                maxLength={75}
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={(e) => {
                                    setValidateDesc(Util.isLengthGreater(e));
                                    setDesc(e);
                                }
                                }
                                value={valueDesc} />
                        </View>



                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            marginTop: verticalScale(25),
                            margin: moderateScale(25)
                        }} onPress={() => {
                            props.navigation.pop()

                        }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(20), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                            }}>SUBMIT</Text>
                        </TouchableOpacity>
                
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

        </View>);

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
        height: moderateScale(46),
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
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
    }
});

export default EditScheduleView;
