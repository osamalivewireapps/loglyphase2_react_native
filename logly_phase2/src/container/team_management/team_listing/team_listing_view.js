/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { TextInput, FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import moment from 'moment';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { VET_ID } from '../../../constants';
import Util from '../../../utils';

function TeamListingView(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [contactList, setContactList] = useState([]);

    const isTablet = DeviceInfo.isTablet();

    const { listContacts, applyFilter, filterObj, updateContacts } = props;

    const listBorderColors = ['#FE8B19', '#F044F7'];
    const [isEditShow, setEditShow] = useState(-1);

    console.log('contacts--->', listContacts);

    useEffect(() => {
        if (listContacts.length > 0) {
            setContactList(listContacts.filter((e) => {
                return (e.name.toLowerCase().startsWith(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

    useEffect(() => {
        setContactList(listContacts)
    }, [listContacts]);



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'black',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }}>
                        <Image source={Icons.icon_burger_menu} resizeMode='contain' style={{ height: moderateScale(25), width: moderateScale(25) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View>

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
                            color: Colors.appBgColor,
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Team Members

                    </AutoSizeText>
                    <Image source={Icons.icon_header_teammember} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1, height: Dimensions.get('window').height }}>

                    <View style={{ padding: moderateScale(25), paddingBottom: 0, flexDirection: 'row', width: '100%' }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flex: 1, 
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', 
                                backgroundColor: '#F5F5F5', 
                                borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setSearchTxt(e)
                                    }}
                                    value={searchTxt}
                                    placeholder='Search Team Members'
                                    numberOfLines={1}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    style={{
                                        keyboardShouldPersistTaps: true,
                                        flex: 0.9,
                                        height: verticalScale(40),
                                        ...styles.generalTxt,
                                        color: '#777777',
                                        fontSize: moderateScale(14),
                                    }} />
                                <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                            </View>

                  
                        </View>
                    </View>

                    <View flex={1}>

                        <FlatList
                            contentContainerStyle={{
                                flex: 1, padding: moderateScale(25),
                            }}
                            data={contactList}
                            renderItem={({ item, index }) => {
                                return (
                                    getFriendItem(item, index)
                                )
                            }}
                            keyExtractor={(item) => item.id}

                        />


                    </View>


                </View>
            </ScrollView>

            <TouchableOpacity
                style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                    alignSelf: 'flex-end',
                    top: Dimensions.get('screen').height - moderateScale(80),
                    right: moderateScale(20),
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
                onPress={() => {
                    props.navigation.navigate('AddTeamMember', { updateContacts: updateContacts })
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

    );

    function getFriendItem(item, index) {
        return (
            <TouchableOpacity

                onPress={() => props.navigation.navigate('MemberDetails', { id: item._id, updateContacts: updateContacts })}
                style={{
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(10),
                    height: verticalScale(50),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingEnd: moderateScale(0)

                }}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: verticalScale(50), width: moderateScale(60)
                }} >
                    <Image
                        resizeMode='contain'
                        style={{
                            backgroundColor: '#097D3B',
                            position: 'absolute',
                            borderRadius: moderateScale(50),
                            borderColor: item.category === VET_ID ? listBorderColors[0] : listBorderColors[1],
                            borderWidth: moderateScale(2),
                            height: verticalScale(50), width: moderateScale(60)
                        }}
                    />

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(18)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.bold,
                            color: 'white',
                        }}>{Util.getInitials(item.name)}
                    </AutoSizeText>
                </View>

                <View style={{
                    flex: 1,
                    marginStart: moderateScale(15),
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            paddingEnd: moderateScale(10),
                            color: Colors.appBgColor
                        }}>{item.name}
                    </AutoSizeText>
                    <View style={{ flexDirection: 'row' }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                paddingEnd: moderateScale(10),
                                color: '#464646',
                                marginTop: verticalScale(5)
                            }}>{item.phone.length > 0 ? item.phone[0] : ''}
                        </AutoSizeText>
                    </View>

                </View>

                {isEditShow === index ?
                    <View style={{
                        height: verticalScale(70),
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
                            onPress={() => {
                                setEditShow(-1)
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
                            onPress={() => {
                                setEditShow(-1)
                                //delTrainingProgram(index)
                            }}>
                            <Image source={Icons.icon_services_delete}
                                resizeMode='contain'
                                style={{
                                    marginEnd: moderateScale(3),
                                    height: verticalScale(12),
                                    width: moderateScale(15)
                                }} />
                        </TouchableOpacity>
                    </View> : <View flex={moderateScale(0.1)} />}

                <TouchableOpacity
                    style={{ width: moderateScale(20), height: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}

                    onPress={() => {
                        setEditShow(index)
                    }}>
                    <Image source={Icons.icon_three_colons}
                        resizeMode='contain' style={{ height: verticalScale(12), width: moderateScale(12) }}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
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

export default TeamListingView;