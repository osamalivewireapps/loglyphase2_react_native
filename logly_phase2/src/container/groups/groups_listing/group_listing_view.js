/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TextInput, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import { FlatList } from 'react-native-gesture-handler';

function GroupListingView(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [contactList, setGroupsList] = useState([]);

    const isTablet = DeviceInfo.isTablet();

    const { listGroups, updateContacts } = props;

 
 
    useEffect(() => {
        if (listGroups.length > 0) {
            setGroupsList(listGroups.filter((e) => {
                return (e.name.toLowerCase().startsWith(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

    useEffect(() => {
        setGroupsList(listGroups)
    }, [listGroups]);



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
                        Groups

                    </AutoSizeText>
                    <Image source={Icons.icon_header_add_contacts} resizeMode='contain'
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
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setSearchTxt(e)
                                    }}
                                    value={searchTxt}
                                    placeholder='Search Groups'
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

                    <FlatList
                        data={['','']}
                        contentContainerStyle={{
                            marginTop: verticalScale(10),
                            padding:moderateScale(25),
                            paddingTop:0
                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('CreateGroup', { updateContacts: updateContacts })}
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
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: Colors.appBgColor,
                                       
                                                }}
                                            >
                                                Test Group
                                            </AutoSizeText>
                           
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: verticalScale(5)
                                        }}>

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(14)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',
                                     
                                                }}
                                            >
                                                Total Animals:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(14)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                2 Animals
                                            </AutoSizeText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: verticalScale(5)
                                        }}>

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(14)}
                                                style={{
                                                    fontFamily: Fonts.type.base,
                                                    color: '#777777',

                                                }}
                                            >
                                                Total Members:
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(14)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',
                                                    marginStart: moderateScale(2)

                                                }}
                                            >
                                                2 Team Members
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
                    props.navigation.navigate('CreateGroup', { updateContacts: updateContacts })
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
        </View>)

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

export default GroupListingView;