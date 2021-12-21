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

function AddScheduleActivityView(props) {


    const initialDate = moment().format('YYYY-MM-DD');

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [isBottonSheetActivityVisible, setCloseBottonSheetActivity] = useState(false);
    const [isBottonSheetAnimalVisible, setCloseBottonSheetAnimal] = useState(false);
    const [isBottonSheetTeamVisible, setCloseBottonSheetTeam] = useState(false);

    const [petIndex, setPetIndex] = useState(-1);
    const [activityIndex, setActivityIndex] = useState(-1);

    const category = ['Cat Cleaning', 'Dog Wash', 'Dog Nail Trim'];
    const activityType = ['Pet Grooming', 'Veterinary', 'Transportation', 'Pet Training'];

    const [selectWeekFrequency, setSelectWeekFrequency] = useState([]);
    const [selectMonthFrequency, setSelectMonthFrequency] = useState([]);
    const [selectYearFrequency, setSelectYearFrequency] = useState([]);
    const [selectTimeFrequency, setSelectTimeFrequency] = useState([]);
    const [assignAnimals, setAssignAnimals] = useState(0);
    const [assignTeam, setAssignTeam] = useState(0);
    const [assignFrequency, setAssignFrequency] = useState(0);
    const [tabs, setTab] = useState(0);
    const [listAnimals, setListAnimals] = useState([{ id: 0, isSelect: false }, { id: 1, isSelect: false }, { id: 2, isSelect: false }]);
    const [listFriends, setListFriends] = useState([{ id: 0, isSelect: false }, { id: 1, isSelect: false }, { id: 2, isSelect: false }]);
    const [searchTxt, setSearchTxt] = useState('');
    const [addItems, setAddItems] = useState([]);
    const [addFriendItems, setAddFriendItems] = useState([]);


    const sheetRef = useRef(null);
    const sheetActivityRef = useRef(null);
    const sheetAnimalRef = useRef(null);
    const sheetTeamRef = useRef(null);

    const isTablet = DeviceInfo.isTablet();



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

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
                    </View> */}

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

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                marginTop: verticalScale(20),
                                marginStart: moderateScale(25),
                                marginEnd: moderateScale(25),
                                height: verticalScale(35),
                                shadowColor: 'white',
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1,
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%',
                                    }}>
                                    {petIndex > -1 ? category[petIndex] : 'Select Category'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheetActivity(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                marginTop: verticalScale(15),
                                marginStart: moderateScale(25),
                                marginEnd: moderateScale(25),
                                height: verticalScale(35),
                                shadowColor: 'white',
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1,
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%',
                                    }}>
                                    {activityIndex > -1 ? activityType[activityIndex] : 'Select Activity Type'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30),
                                },
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showCategory()}

                        </RBSheet>

                        {isBottonSheetVisible ? sheetRef.current.open() : null}
                        <RBSheet
                            ref={sheetActivityRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30),
                                },
                            }}
                            onClose={() => setCloseBottonSheetActivity(false)}
                        >
                            {showActivityCategory()}

                        </RBSheet>

                        {isBottonSheetActivityVisible ? sheetActivityRef.current.open() : null}

                        <View

                            style={{
                                backgroundColor: '#C6C6C6',
                                height: verticalScale(1),
                                marginTop: verticalScale(20),
                                width: '100%'
                            }}
                        />

                        <View marginTop={verticalScale(20)}>
                            <View flexDirection='row' style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignAnimals(0) }}>
                                    <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Assign Animals</Text>
                                    <Image source={assignAnimals === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />

                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', marginStart: moderateScale(20) }} onPress={() => { setAssignAnimals(1) }}>
                                    <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Assign Groups</Text>
                                    <Image source={assignAnimals === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheetAnimal(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                marginTop: verticalScale(15),
                                marginStart: moderateScale(25),
                                marginEnd: moderateScale(25),
                                height: verticalScale(35),
                                shadowColor: 'white',
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1,
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '100%',
                                    }}>
                                    Select Animals

                                </AutoSizeText>

                            </View>
                        </TouchableOpacity>

                        {isBottonSheetAnimalVisible ? sheetAnimalRef.current.open() : null}
                        <RBSheet
                            ref={sheetAnimalRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => {
                                setCloseBottonSheetAnimal(false)
                            }
                            }
                        >
                            {showBottomSheet(false)}
                        </RBSheet>

                        <FlatList
                            data={addItems}
                            contentContainerStyle={{
                                margin: moderateScale(25),
                                marginTop: verticalScale(0),
                            }}
                            renderItem={({ item, index }) => {
                                return renderBreedItem(item, index, true);
                            }}
                        />

                        {(assignAnimals === 0) ?
                            <View>
                                <View
                                    style={{
                                        backgroundColor: '#C6C6C6',
                                        height: verticalScale(1),
                                        marginTop: verticalScale(20),
                                        width: '100%'
                                    }}
                                />

                                <View marginTop={verticalScale(20)}>
                                    <View flexDirection='row' style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>

                                        <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10), flex: 0.7 }}>Assign Team Member</Text>
                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignTeam(0) }}>
                                            <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Yes</Text>
                                            <Image source={assignTeam === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />

                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', marginStart: moderateScale(20) }} onPress={() => { setAssignTeam(1) }}>
                                            <Text style={{ ...styles.generalTxt, fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>No</Text>
                                            <Image source={assignTeam === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (assignTeam === 0)
                                            setCloseBottonSheetTeam(true);
                                    }}
                                    style={{
                                        ...styles.boxcontainer,
                                        marginTop: verticalScale(15),
                                        marginStart: moderateScale(25),
                                        marginEnd: moderateScale(25),
                                        height: verticalScale(35),
                                        shadowColor: 'white',
                                        flexDirection: 'row', padding: 0, alignItems: 'center',
                                        paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                                    }}>


                                    <View style={{
                                        flexDirection: 'row', padding: 0,
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>

                                        <AutoSizeText
                                            numberOfLines={2}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.overflow_replacement}
                                            style={{
                                                color: '#464646',
                                                fontFamily: Fonts.type.base,
                                                width: '100%',
                                            }}>
                                            Select Team Members

                                        </AutoSizeText>

                                    </View>
                                </TouchableOpacity>
                                {isBottonSheetTeamVisible ? sheetTeamRef.current.open() : null}
                                <RBSheet
                                    ref={sheetTeamRef}
                                    height={Dimensions.get('screen').height - moderateScale(130)}
                                    openDuration={250}
                                    customStyles={{
                                        container: {
                                            borderRadius: moderateScale(30)
                                        }
                                    }}
                                    onClose={() => {
                                        setCloseBottonSheetTeam(false)
                                    }
                                    }
                                >
                                    {showTeamBottomSheet(false)}
                                </RBSheet>
                         
                                {assignTeam === 0?
                                <FlatList
                                    data={addFriendItems}
                                    contentContainerStyle={{
                                        margin: moderateScale(25),
                                        marginTop: verticalScale(0),
                                    }}
                                    renderItem={({ item, index }) => {
                                        return renderFriendItem(item, index, true);
                                    }}
                                />:<View/>}

                            </View> : <View />
                        }

                        <View
                            style={{
                                backgroundColor: '#C6C6C6',
                                height: verticalScale(1),
                                marginTop: verticalScale(20),
                                width: '100%'
                            }}
                        />

                        <Text style={{ ...styles.generalTxt, marginTop: verticalScale(20), marginStart: moderateScale(25), marginEnd: moderateScale(25), fontSize: moderateScale(14), color: '#464646' }}>Frequency *</Text>
                        <View marginTop={verticalScale(20)}>
                            <View flexDirection='row' style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>

                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignFrequency(0) }}>
                                    <Image source={assignFrequency === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Daily</Text>


                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignFrequency(1) }}>
                                    <Image source={assignFrequency === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Weekly</Text>


                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignFrequency(2) }}>
                                    <Image source={assignFrequency === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Monthly</Text>


                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setAssignFrequency(3) }}>
                                    <Image source={assignFrequency === 3 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), fontSize: moderateScale(14), color: '#464646', marginEnd: moderateScale(10) }}>Yearly</Text>


                                </TouchableOpacity>
                            </View>
                        </View>

                        {assignFrequency > 0 ? getWeeklyRecurring() : <View />}

                        <View
                            style={{
                                backgroundColor: '#C6C6C6',
                                height: verticalScale(1),
                                marginTop: verticalScale(20),
                                width: '100%'
                            }}
                        />

                        <Text style={{ ...styles.generalTxt, marginTop: verticalScale(20), marginStart: moderateScale(25), marginEnd: moderateScale(25), fontSize: moderateScale(14), color: '#464646' }}>Select Time</Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: verticalScale(15),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: verticalScale(15)
                        }}>

                            <TouchableOpacity
                                onPress={() => setTab(0)}
                                style={{ marginEnd: moderateScale(15), justifyContent: 'center', alignItems: 'center' }}>

                                <View style={{
                                    marginBottom: verticalScale(3),
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={Icons.icon_feather_sunrise} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16), marginEnd: moderateScale(5) }} />

                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        color: '#464646',
                                        fontSize: moderateScale(14),
                                    }}>Morning</Text>
                                </View>
                                {tabs === 0 ? getHorizontalLine() : <View />}

                            </TouchableOpacity>



                            <TouchableOpacity
                                onPress={() => setTab(1)}
                                style={{ marginEnd: moderateScale(15), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    marginBottom: verticalScale(3),
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={Icons.icon_feather_sun} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16), marginEnd: moderateScale(5) }} />

                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        color: '#464646',
                                        fontSize: moderateScale(14),
                                    }}>Afternoon</Text>
                                </View>
                                {tabs === 1 ? getHorizontalLine() : <View />}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setTab(2)}

                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    marginBottom: verticalScale(3),
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={Icons.icon_feather_evening} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16), marginEnd: moderateScale(5) }} />

                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        color: '#464646',
                                        fontSize: moderateScale(14),
                                    }}>Evening</Text>
                                </View>
                                {tabs === 2 ? getHorizontalLine() : <View />}
                            </TouchableOpacity>
                        </View>

                        {getTimeUI()}

                        <TouchableOpacity style={{
                            ...styles.styleButtons,
                            marginTop: verticalScale(30),
                            marginStart: moderateScale(25),
                            marginEnd: moderateScale(25),



                        }} onPress={() => { props.navigation.pop() }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: moderateScale(12),
                                paddingBottom: moderateScale(12),
                                ...styles.generalTxt
                            }}>ADD ACTIVITY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...styles.styleButtons,
                            backgroundColor: 'white',
                            width: '100%'
                        }} onPress={() => { props.navigation.pop() }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: moderateScale(12),
                                paddingBottom: moderateScale(12),
                                ...styles.generalTxt,
                                color: '#404040',
                            }}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </View>);


    function showCategory() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <TouchableOpacity onPress={() => { sheetRef.current.close() }}>
                            <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{
                                tintColor: '#404040',
                                position: 'absolute',
                                top: verticalScale(12),
                                right: moderateScale(20),
                                alignSelf: 'flex-end',
                                height: moderateScale(15),
                                width: moderateScale(15)
                            }} />
                        </TouchableOpacity>

                        <Text style={{
                            ...styles.generalTxt,
                            alignSelf: 'center',
                            color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10)
                        }}>Select Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={category}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setPetIndex(index);
                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === petIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function showActivityCategory() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <TouchableOpacity onPress={() => { sheetActivityRef.current.close() }}>
                            <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{
                                tintColor: '#404040',
                                position: 'absolute',
                                top: verticalScale(12),
                                right: moderateScale(20),
                                alignSelf: 'flex-end',
                                height: moderateScale(15),
                                width: moderateScale(15)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10),
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}>Select Activity Type</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={activityType}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setActivityIndex(index);
                                        sheetActivityRef.current.close();
                                        setCloseBottonSheetActivity(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === activityIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }


    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: '#20B6F8',
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
        )
    }

    //////////////////// ANIMAL SELECTION BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>

                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <TouchableOpacity onPress={() => { sheetRef.current.close() }}>
                            <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{
                                tintColor: '#404040',
                                position: 'absolute',
                                top: verticalScale(8),
                                right: moderateScale(20),
                                alignSelf: 'flex-end',
                                height: moderateScale(15),
                                width: moderateScale(15)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#464646',
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: moderateScale(18),
                            fontFamily: Fonts.type.medium,
                            marginTop: verticalScale(10)
                        }}>Add Animals</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        margin: moderateScale(25),
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(15),

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
                                flex: 0.9,
                                height: verticalScale(40),
                                ...styles.generalTxt,
                                color: '#777777',
                                fontSize: moderateScale(14),
                            }} />
                        <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                    </View>

                    <FlatList
                        data={listAnimals}
                        contentContainerStyle={{
                            margin: moderateScale(25),
                            marginTop: verticalScale(0),
                        }}
                        renderItem={({ item, index }) => {
                            return renderBreedItem(item, index, false);
                        }}
                    />

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '60%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                                let tmp = listAnimals.filter((value) => value.isSelect === true);
                                setAddItems(tmp)

                                sheetAnimalRef.current.close();
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(18), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{'Add'}</Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>
        )
    }

    function renderFriendItem(item, index, isDeleteIcon) {

        return (
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'white',
                shadowOpacity: 1,
                marginTop: verticalScale(10),
                height: moderateVerticalScale(60),
                borderRadius: moderateScale(15),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    source={Images.img_friend_sample}
                    resizeMode='cover'
                    style={{
                        width: moderateScale(60),
                        height: '100%',
                        borderRadius: moderateScale(60)
                        , marginEnd: moderateScale(15)
                    }}
                />

                <TouchableOpacity
                    onPress={() => addFriend(index)}
                    style={{
                        flex: 0.95,
                    }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}>
                        <View style={{
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'flex-start'
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',

                                }}
                            >
                                Jack Rio
                            </AutoSizeText>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(0)

                                }}
                            >
                                +123456
                            </AutoSizeText>
                        </View>


                    </View>



                </TouchableOpacity>

                {isDeleteIcon ?
                    <View /> :
                    <Image
                        source={item.isSelect ? Icons.icon_check_circle_green : Icons.icon_uncheck_paackage}
                        resizeMode='contain'
                        style={{
                            width: moderateScale(15),
                            height: moderateScale(15),
                        }}
                    />}
            </View>
        )
    }

    function addFriend(index) {
        listFriends[index].isSelect = !listFriends[index].isSelect;
        setAddFriendItems(listFriends.filter((value) => value.isSelect))
        setListFriends([...listFriends])
    }

    //////////////////// TEAM SELECTION BOTTOM SHEET /////////////
    function showTeamBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>

                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <TouchableOpacity onPress={() => { sheetTeamRef.current.close() }}>
                            <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{
                                tintColor: '#404040',
                                position: 'absolute',
                                top: verticalScale(8),
                                right: moderateScale(20),
                                alignSelf: 'flex-end',
                                height: moderateScale(15),
                                width: moderateScale(15)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#464646',
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: moderateScale(18),
                            fontFamily: Fonts.type.medium,
                            marginTop: verticalScale(10)
                        }}>Assign Employee</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        margin: moderateScale(25),
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(15),

                        justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                    }}>

                        <TextInput
                            onChangeText={(e) => {
                                setSearchTxt(e)
                            }}
                            value={searchTxt}
                            placeholder='Search Employee'
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

                    <FlatList
                        data={listFriends}
                        contentContainerStyle={{
                            margin: moderateScale(25),
                            marginTop: verticalScale(0),
                        }}
                        renderItem={({ item, index }) => {
                            return renderFriendItem(item, index, false);
                        }}
                    />

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '60%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                                let tmp = listFriends.filter((value) => value.isSelect === true);
                                setAddFriendItems(tmp)

                                sheetTeamRef.current.close();
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(18), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{'Add'}</Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>
        )
    }

    function renderBreedItem(item, index, isDeleteIcon) {

        return (
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'white',
                shadowOpacity: 1,
                marginTop: verticalScale(10),
                height: moderateVerticalScale(60),
                borderRadius: moderateScale(15),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    source={Icons.icon_paw}
                    resizeMode='cover'
                    style={{
                        width: moderateScale(60),
                        height: '100%',
                        borderRadius: moderateScale(60)
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
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'flex-start'
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',

                                }}
                            >
                                Zooes
                            </AutoSizeText>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                        }}>

                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12)

                                }}
                            >
                                Category:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                Parrot
                            </AutoSizeText>
                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12),
                                    marginStart: moderateScale(10)

                                }}
                            >
                                Status:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                Alive
                            </AutoSizeText>
                        </View>


                    </View>



                </TouchableOpacity>

                {isDeleteIcon ?
                    <View /> :
                    <Image
                        source={item.isSelect ? Icons.icon_check_circle_green : Icons.icon_uncheck_paackage}
                        resizeMode='contain'
                        style={{
                            width: moderateScale(15),
                            height: moderateScale(15),
                        }}
                    />}
            </View>
        )
    }

    function addBreeder(index) {
        listAnimals[index].isSelect = !listAnimals[index].isSelect;
        setAddItems(listAnimals.filter((value) => value.isSelect))
        setListAnimals([...listAnimals])
    }

    ////////////////////  WEEK UI //////////////////
    function getWeeklyRecurring() {
        return (
            <View>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: verticalScale(25),
                    marginStart: moderateScale(25),
                    marginBottom: verticalScale(10)
                }}>Days of the week *</Text>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isDaySelect(item) ? '#FFC081' : '#F5F5F5',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                width: Dimensions.get('screen').width / 5,
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: moderateScale(5),
                            }} onPress={() => setWeekFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: Colors.appBgColor
                                    }}>{item}
                                </AutoSizeText>
                            </TouchableOpacity>
                        )
                    }}

                />

                {
                    assignFrequency >= 2 ?
                        getMonthUI() : <View />

                }
                {
                    assignFrequency === 3 ?
                        getYearlyRecurring() : <View />

                }
            </View>
        )
    }
    function setWeekFrequency(e) {
        let tmp = selectWeekFrequency;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.day === e.day);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectWeekFrequency(result => [...result, tmp])
    }

    function isDaySelect(item) {

        console.log("day select-->", selectWeekFrequency.length + "-" + item);
        let itemService = selectWeekFrequency.find(e => e.day === item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }

    ////////////////////  MONTH UI //////////////////
    function getMonthUI() {
        return (
            <View>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: verticalScale(25),
                    marginStart: moderateScale(25),
                    marginBottom: verticalScale(10)
                }}>Months *</Text>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isMonthSelect(item) ? '#FFC081' : '#F5F5F5',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                width: Dimensions.get('screen').width / 5,
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: moderateScale(5),
                            }} onPress={() => setMonthFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: Colors.appBgColor
                                    }}>{item}
                                </AutoSizeText>
                            </TouchableOpacity>
                        )
                    }}

                />
            </View>
        )
    }
    function setMonthFrequency(e) {
        let tmp = selectMonthFrequency;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.day === e.day);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectMonthFrequency(result => [...result, tmp])
    }

    function isMonthSelect(item) {

        console.log("day select-->", selectMonthFrequency.length + "-" + item);
        let itemService = selectMonthFrequency.find(e => e.day === item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }

    ////////////////////  YEARLY UI //////////////////
    function getYearlyRecurring() {
        return (
            <View>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: verticalScale(25),
                    marginStart: moderateScale(25),
                    marginBottom: verticalScale(10)
                }}>Years *</Text>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={['2021', '2022', '2023', '2024', '2025']}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isYearSelect(item) ? '#FFC081' : '#F5F5F5',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                width: Dimensions.get('screen').width / 5,
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: moderateScale(5),
                            }} onPress={() => setYearFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: Colors.appBgColor
                                    }}>{item}
                                </AutoSizeText>
                            </TouchableOpacity>
                        )
                    }}

                />
            </View>
        )
    }
    function setYearFrequency(e) {
        let tmp = selectYearFrequency;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.day === e.day);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectYearFrequency(result => [...result, tmp])
    }

    function isYearSelect(item) {

        console.log("day select-->", selectYearFrequency.length + "-" + item);
        let itemService = selectYearFrequency.find(e => e.day === item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }


    ////////////////////  TIME UI //////////////////
    function getTimeUI() {

        let time = ['12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
            '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
            '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM',
            '06:00 AM', '06:30 AM', '06:00 AM', '06:30 AM',
            '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
        return (
            <View>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={time}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isTimeSelect(item) ? Colors.appBgColor : 'white',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                width: Dimensions.get('screen').width / 5,
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: Colors.appBgColor,
                                borderWidth: moderateScale(1),
                                marginStart: moderateScale(5),
                            }} onPress={() => setTimeFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: isTimeSelect(item) ? 'white' : Colors.appBgColor
                                    }}>{item}
                                </AutoSizeText>
                            </TouchableOpacity>
                        )
                    }}

                />
            </View>
        )
    }
    function setTimeFrequency(e) {
        let tmp = selectTimeFrequency;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.day === e.day);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectTimeFrequency(result => [...result, tmp])
    }

    function isTimeSelect(item) {

        console.log("day select-->", selectTimeFrequency.length + "-" + item);
        let itemService = selectTimeFrequency.find(e => e.day === item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
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

export default AddScheduleActivityView;
