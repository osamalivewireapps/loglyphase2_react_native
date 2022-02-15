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
import { CommonActions } from '@react-navigation/routers';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import Util from '../../../utils';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import ScheduleListingView from './schedulelisting';
import AddCategory from './category_types';
import { FloatingAction } from "react-native-floating-action";

function ScheduleListingActivityView(props) {


    const [tabs, setTab] = useState(0);
    const [searchTxt, setSearchTxt] = useState('');
    const [currentName, setCurrentName] = useState('')
    const [listSchedule, setListSchedule] = useState([]);
    const [filterDataSchedule, setFilterSchedule] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);

    useEffect(() => {

        if (tabs === 0) {
            if (listSchedule.length > 0) {
                let tmp = listSchedule.filter((e) => {
                    return (e.categoryName.toLowerCase().startsWith(searchTxt.toLowerCase()) ||
                        e.subType?.find(value => value.toLowerCase().startsWith(searchTxt.toLowerCase()))>-1)
                })
                console.log('tmp filter data--->', tmp)
                setFilterSchedule(tmp)
            }
        } else {
            console.log('listCategories length--->', listCategories)
            if (listCategories.length > 0) {
                let tmp = listCategories.filter((e) => {
                    return (e.name.toLowerCase().startsWith(searchTxt.toLowerCase()) ||
                        e.subType?.find(value => value.toLowerCase().startsWith(searchTxt.toLowerCase())) > -1)
                })
                console.log('tmp filter data--->', tmp)
                setFilterCategories(tmp)
            }
        }
    }, [searchTxt]);

    const actions = [
        {
            textStyle: {
                fontSize: isTablet ? moderateScale(11) : moderateScale(14),
                shadowColor: 'transparent',

            },
            size: 80,
            distanceToEdge: 0,
            textBackground: 'transparent',
            text: "Add Category",
            color: '#A1A1A1',
            name: "Add Category",
            position: 1,
            buttonSize: 0

        },
        {
            textStyle: {
                fontSize: isTablet ? moderateScale(11) : moderateScale(14),
                shadowColor: 'transparent',
            },
            textBackground: 'transparent',
            distanceToEdge: 0,
            text: "Add Activity Type",
            color: '#A1A1A1',
            name: "Add Activity Type",
            position: 2,
            buttonSize: 0
        },
    ];

    const isTablet = DeviceInfo.isTablet();



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

                        <View style={{
                            margin: moderateScale(25),
                            marginBottom: 0,
                            paddingBottom: 0, flexDirection: 'row'
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
                                        placeholder={tabs === 0 ? 'Search an activity' :'Search a category'}
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

                        <View style={{
                            flexDirection: 'row',
                            marginTop: verticalScale(25),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: verticalScale(15)
                        }}>

                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentName('')
                                    setTab(0)
                                }
                                }
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.medium,
                                    color: Colors.appBgColor,
                                    fontSize: moderateScale(14),
                                    marginBottom: verticalScale(5)
                                }}>Scheduled Activities</Text>

                                {tabs === 0 ? getHorizontalLine() : <View />}
                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: '#BEBEBE',
                                    width: 1,
                                    marginStart: moderateScale(10),
                                    marginEnd: moderateScale(10),
                                    height: verticalScale(10),
                                    marginBottom: verticalScale(5)
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentName('')
                                    setTab(1)
                                }
                                }
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.medium,
                                    color: Colors.appBgColor,
                                    fontSize: moderateScale(14),
                                    marginBottom: verticalScale(5)
                                }}>Categories & Types</Text>
                                {tabs === 1 ? getHorizontalLine() : <View />}
                            </TouchableOpacity>

                        </View>
                        <View>


                            {getInnerScreens()}

                        </View>



                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            {tabs === 0 ?
                <TouchableOpacity
                    style={{
                        height: moderateScale(50),
                        width: moderateScale(50),
                        right: moderateScale(20),
                        bottom: moderateScale(20),
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                    onPress={() => {
                        if (tabs === 0)
                            props.navigation.navigate('AddScheduleActivity')
                        else if (tabs === 1)
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
                </TouchableOpacity> :
                <FloatingAction
                    actions={actions}
                    shadow={
                        {
                            shadowOpacity: 0.35,
                            shadowOffset: { width: 0, height: 5 },
                            shadowColor: "transparent",
                            shadowRadius: 3
                        }
                    }
                    distanceToEdge={moderateScale(20)}
                    iconWidth={moderateScale(20)}
                    iconHeight={moderateScale(20)}
                    buttonSize={moderateScale(50)}
                    overlayColor="transparent"
                    color={Colors.appBgColor}
                    onPressItem={name => {
                        setCurrentName(name + "_" + new Date().getMilliseconds());
                    }}

                />
            }

        </View>);

    function getInnerScreens() {
        switch (tabs) {
            case 0:
                return <ScheduleListingView {...props} getSchData={(e) => setListSchedule(e)}
                    filterSchedule={filterDataSchedule}
                />;

            case 1:
                return <AddCategory {...props} name={currentName}
                    getCategoryData={(e) => setListCategories(e)}
                    filterCategories={filterCategories}
                 />;

        }
    }
    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: '#F3950D',
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
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

export default ScheduleListingActivityView;
