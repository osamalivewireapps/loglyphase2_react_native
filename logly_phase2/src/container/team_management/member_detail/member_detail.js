/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { CommonActions } from "@react-navigation/native";
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { VENDOR_ID } from '../../../constants';
import { Platform } from 'react-native';

function MemberDetailView(props) {

    const isTablet = Platform.isTV;

    const [contactData, setContactData] = useState({});
    const [isEditShow, setIsEditShow] = useState(false);

    useEffect(() => {
        setContactData(props.contactData)
    }, [props.contactData])

    useEffect(() => {
        return (setContactData({}))
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#FC5D3F',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: !isTablet ? verticalScale(260) : verticalScale(320)
            }}>

                <View style={{
                    height: isTablet ? verticalScale(250) : verticalScale(200),
                    width: '100%',
                    position: 'absolute'
                }}>
                    <ImagePlaceholder
                        showActivityIndicator={false}
                        activityIndicatorProps={{
                            size: 'small',
                            color: '#777777',
                        }}
                        resizeMode='cover'
                        placeholderStyle={{
                            height: isTablet ? verticalScale(250) : verticalScale(200),
                            width: '100%',
                            borderBottomLeftRadius: moderateScale(30),
                            borderBottomRightRadius: moderateScale(30),

                        }}
                        imgStyle={{
                            height: isTablet ? verticalScale(250) : verticalScale(200),
                            width: '100%',
                            borderBottomLeftRadius: moderateScale(30),
                            borderBottomRightRadius: moderateScale(30),
                        }}

                        style={{

                        }}
                        src={contactData?.image}
                        placeholder={Images.img_user_placeholder}
                    />
                </View>
                {console.log('contact----->', contactData)}
                <View style={{
                    padding: moderateScale(25), flexDirection: 'row', flex: 1
                }}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.pop()
                    }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('SearchItem')
                        }}
                            style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
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
                    </View> */}

                </View>

                <View style={{
                    flexDirection: 'row',
                    height: isTablet ? verticalScale(70) : verticalScale(60),
                    alignItems: 'center',
                }}>
                    <Image source={Icons.icon_detailscreen_username} resizeMode='contain' style={{
                        height: verticalScale(50), width: moderateScale(50),
                        marginStart: moderateScale(25)
                    }} />
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(24)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex: 1,
                            paddingStart: moderateScale(15),
                            fontFamily: Fonts.type.medium
                        }}>
                        {contactData.name}

                    </AutoSizeText>


                    {isEditShow ?
                        <View style={{
                            height: verticalScale(75),
                            flex: moderateScale(0.145),
                            marginTop: 0,
                            marginBottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={Images.img_popup_services}
                                style={{
                                    position: 'absolute', height: '100%',
                                    width: '100%'
                                }} />
                            <TouchableOpacity
                                flex={moderateScale(0.1)}
                                style={{
                                    justifyContent: 'center', width: '90%', height: verticalScale(15),
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    props.navigation.navigate('AddTeamMember', { contactData: contactData, updateContacts: props.route.params.updateContacts, isTransfer: false })
                                    setIsEditShow(false)

                                }}>
                                <Image source={Icons.icon_services_edit}
                                    resizeMode='contain' style={{
                                        marginEnd: moderateScale(2), height: verticalScale(10), width: moderateScale(15)
                                    }}

                                />
                            </TouchableOpacity>
                            <View style={{
                                width: '50%',
                                height: verticalScale(0.5),
                                backgroundColor: '#585858',
                                marginEnd: moderateScale(5),
                                marginTop: verticalScale(8),
                                marginBottom: verticalScale(8)
                            }} />
                            <TouchableOpacity
                                flex={moderateScale(0.1)}
                                style={{
                                    justifyContent: 'center', width: '90%', height: verticalScale(15),
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    setIsEditShow(false),
                                        props.removeMember()
                                }}>
                                <Image source={Icons.icon_services_delete}
                                    resizeMode='contain'
                                    style={{
                                        marginEnd: moderateScale(3),
                                        height: verticalScale(12),
                                        width: moderateScale(15)
                                    }} />
                            </TouchableOpacity>
                        </View> : <View style={{ flex: 0.1 }} />}

                    <TouchableOpacity
                        style={{ flex: 0.2, height: moderateScale(25) }}
                        onPress={() => setIsEditShow(true)}>
                        <Image source={Icons.icon_kebab} resizeMode='contain'
                            style={{ height: moderateScale(25) }} />

                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1 }}>

                    <View style={{ padding: moderateScale(25) }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={Icons.icon_detailscreen_phone} resizeMode='contain' style={{
                                height: verticalScale(50), width: moderateScale(50)
                            }} />
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(22)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.overflow_replacement}
                                style={{
                                    color: '#464646',
                                    flex: 1,
                                    paddingStart: moderateScale(15),
                                    fontFamily: Fonts.type.base
                                }}>
                                {contactData.phone}

                            </AutoSizeText>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={Icons.icon_detailscreen_email} resizeMode='contain' style={{
                                height: verticalScale(50), width: moderateScale(50)
                            }} />
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(22)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.overflow_replacement}
                                style={{
                                    color: '#464646',
                                    flex: 1,
                                    paddingStart: moderateScale(15),
                                    fontFamily: Fonts.type.base
                                }}>
                                {contactData.email}

                            </AutoSizeText>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image source={Icons.icon_detailscreen_state} resizeMode='contain' style={{
                                height: verticalScale(50), width: moderateScale(50)
                            }} />
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(22)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.overflow_replacement}
                                style={{
                                    color: '#464646',
                                    flex: 1,
                                    paddingStart: moderateScale(15),
                                    fontFamily: Fonts.type.base
                                }}>
                                {contactData.city ? (contactData.address ? contactData.address + ", " : '') + contactData.city + ", " + contactData.state : ''}

                            </AutoSizeText>
                        </View>

                     
                    </View>
                    <View style={{ backgroundColor: '#F5F5F5', paddingStart: moderateScale(25) }}>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(22)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.overflow_replacement}
                            style={{
                                color: Colors.appBgColor,
                                marginTop: verticalScale(10),
                                paddingStart: moderateScale(15),
                                fontFamily: Fonts.type.medium
                            }}>
                            Emergency Contact

                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(22)}
                            fontSize={moderateScale(14)}
                            mode={ResizeTextMode.overflow_replacement}
                            style={{
                                color: '#464646',
                                flex: 1,
                                marginTop: verticalScale(5),
                                paddingStart: moderateScale(15),
                                fontFamily: Fonts.type.base
                            }}>
                            {(props.contactData && props.contactData.emergencyContact) ? (typeof (props.contactData.emergencyContact) !== 'string' ? props.contactData.emergencyContact.emergencyName : JSON.parse(props.contactData?.emergencyContact).emergencyName) : ''}
                    
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(22)}
                            fontSize={moderateScale(14)}
                            mode={ResizeTextMode.overflow_replacement}
                            style={{
                                color: '#464646',
                                flex: 1,
                                paddingStart: moderateScale(15),
                                fontFamily: Fonts.type.base,
                                marginBottom: verticalScale(10)
                            }}>
                            {(props.contactData && props.contactData.emergencyContact) ? (typeof (props.contactData.emergencyContact) !== 'string' ? props.contactData.emergencyContact.contactNumber : JSON.parse(props.contactData?.emergencyContact).contactNumber) : ''}

                        </AutoSizeText>

                    </View>
                </View>
            </ScrollView>
        </View>)
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
    }
});


export default MemberDetailView;
