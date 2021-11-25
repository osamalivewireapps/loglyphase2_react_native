/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, Modal, Keyboard } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Fonts, Colors, Icons } from "../../../theme";
import Util from "../../../utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import TeamListing from "./team_listing";
import DataHandler from "../../../utils/DataHandler";
import { BUS_SER_PROVIDER } from "../../../constants";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function TeamSetupView(props) {

    const { accountType, backScreen, clickNextButton,
        delMember, addMember, wholeServices } = props;


    const [modalVisible, setModalVisible] = useState(false);
    const [btnLabel, setBtnLabel] = useState(false);
    const [selectWeekFrequency, setSelectWeekFrequency] = useState([]);
    const [valueName, setValueName] = useState('');
    const [validateName, setValidateName] = useState(true);
    const [validateEmail, setValidateEmail] = useState(true);
    const [valueEmail, setValueEmail] = useState('');
    const [valuePhone, setPhone] = useState('');
    const [validatePhone, setValidatePhone] = useState(true);
    const [showBusTimings, setShowBusTimings] = useState(false);
    const [valueStartBusTiming, setValueStartBusTiming] = useState('');
    const [mode, setMode] = useState('');
    const [valueEndBusTiming, setValueEndBusTiming] = useState('');
    const [isStartBusTiming, setIsStartBusTiming] = useState(false);
    const [serviceTypeIndex, setServiceTypeIndex] = useState(0);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [arrIndex, setArrIndex] = useState(0);
    const [currentObj, setCurrentObj] = useState({})

    const sheetRef = React.useRef(null);


    return (
        <View style={{ flex: 1, backgroundColor: Colors.appBgColor }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    padding: moderateScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(40),
                    flex: 0,
                    paddingBottom: verticalScale(75)
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                        <Text style={{ ...styles.generalTxt2, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-1) }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={(e) => clickNextButton(e)}>
                        <Text style={{ ...styles.generalTxt2, marginStart: moderateScale(5), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-8) }}>Skip</Text>
                        <Image source={Icons.icon_feather_arrow_right} style={{ marginTop: 0, height: verticalScale(12), width: moderateScale(48) }} resizeMode='contain' />

                    </TouchableOpacity>

                </View>

                {accountType === BUS_SER_PROVIDER ?
                    <View
                        marginTop={verticalScale(20)} marginBottom={verticalScale(10)}
                        flexDirection='row' width='100%' justifyContent='center' alignItems='center'>
                        <View style={{ backgroundColor: 'white', borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: Colors.appBgColor, fontSize: moderateScale(14) }}>1</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', width: moderateScale(30), height: verticalScale(1), marginStart: moderateScale(5), marginEnd: moderateScale(5) }} />
                        <View style={{ backgroundColor: 'white', borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: Colors.appBgColor, fontSize: moderateScale(14) }}>2</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', width: moderateScale(30), height: verticalScale(1), marginStart: moderateScale(5), marginEnd: moderateScale(5) }} />
                        <View style={{ backgroundColor: 'white', borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: Colors.appBgColor, fontSize: moderateScale(14) }}>3</Text>
                        </View>

                    </View> : <View />}
                <Text style={{ ...styles.generalTxt2, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10), textAlign: 'center' }}>Account Setup</Text>
                <Text style={{ ...styles.generalTxt2, marginTop: verticalScale(20), textAlign: 'center' }}>Manage team members</Text>
            </View>


            <View style={{ marginTop: verticalScale(-70), height: verticalScale(60) }}>
                <ImageBackground
                    style={{
                        backgroundColor: 'white',
                        borderTopStartRadius: moderateScale(30),
                        borderTopEndRadius: moderateScale(30),
                        marginTop: moderateScale(40),
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        position: 'absolute'
                    }}

                />
            </View>

            {isBottonSheetVisible ? sheetRef.current.open() : null}
            <RBSheet
                ref={sheetRef}
                height={Dimensions.get('screen').height - moderateScale(130)}
                openDuration={250}
                customStyles={{
                    container: {
                        borderRadius: moderateScale(30)
                    }
                }}
                onClose={() => setCloseBottonSheet(false)}
            >
                {showBottomSheet()}
            </RBSheet>

            {wholeServices.length > 0 ?
                <View style={{
                    justifyContent: 'flex-end',
                    paddingBottom: moderateScale(30),
                    flex: 1
                }}>

                    <ScrollView
                        keyboardShouldPersistTaps={true}>



                        <View style={{
                            padding: moderateScale(30),
                            paddingTop: 0,
                            alignItems: 'center',
                            alignItems: 'flex-start',
                            flex: 1,
                        }}>

                            {wholeServices.length > 0 ?


                                <TeamListing
                                    wholeServices={wholeServices}
                                    delTrainingProgram={(e) => {
                                        setModalVisible(true)
                                        setCurrentObj(e)
                                    }}
                                    updateServiceValues={(e) => {
                                        setBtnLabel(true)
                                        setCloseBottonSheet(true)
                                        updateServiceValues(e)
                                    }} /> :
                                null}

                            <TouchableOpacity style={{
                                backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(20),
                                flex: 1,
                                height: verticalScale(45),
                                paddingStart: moderateScale(25),
                                paddingEnd: moderateScale(25),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }} onPress={() => {
                                setBtnLabel(false)
                                updateServiceValues(null);
                                setCloseBottonSheet(true)
                            }
                            }>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: 'black',
                                        textAlign: 'left',
                                        width: '100%',
                                    }}>Add another member
                                </AutoSizeText>
                                <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15) }} />
                            </TouchableOpacity>




                        </View>
                    </ScrollView>
                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        marginTop: verticalScale(35), width: '85%', alignSelf: 'center'
                    }} onPress={() => { clickNextButton() }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                            ...styles.generalTxt
                        }}>FINISH</Text>
                    </TouchableOpacity>
                </View>
                : <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: verticalScale(35), width: '80%',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(15),
                    borderColor: Colors.appBgColor
                }} onPress={() => {
                    setCloseBottonSheet(true)
                }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                        ...styles.generalTxt,
                        color: Colors.appBgColor
                    }}>Add a Team Member</Text>
                </TouchableOpacity>}
            {modalVisible ? showCondPopUp() : null}
        </View>
    )

    function showCondPopUp(e) {



        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ ...styles.centeredView }}>
                    <View style={{ ...styles.modalView }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end', position: 'absolute',
                                top: 15, right: 15
                            }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Image source={Icons.icon_close} style={{ height: verticalScale(10), width: moderateScale(10) }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#585858',
                            marginTop: verticalScale(20),
                            fontFamily: Fonts.type.base, textAlign: 'center'
                        }}>Are you sure you want to delete this service?</Text>
                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            width: '80%', alignSelf: 'center',
                            marginTop: verticalScale(35), backgroundColor: Colors.appBgColor
                        }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                delMember(currentObj)
                            }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                fontSize: moderateScale(20), textAlign: 'center',
                                paddingStart: moderateScale(50), paddingEnd: moderateScale(50),
                                paddingTop: verticalScale(10), paddingBottom: verticalScale(10),

                            }}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            width: '40%', alignSelf: 'center',
                            marginTop: verticalScale(15), backgroundColor: 'white'
                        }} onPress={() => {
                            setModalVisible(!modalVisible)
                        }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                color: 'black',
                                fontSize: moderateScale(18), textAlign: 'center', padding: moderateScale(10),
                                paddingTop: verticalScale(5), paddingBottom: verticalScale(5),

                            }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )

    }


    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (

            <ScrollView keyboardShouldPersistTaps={true}>



                <View style={{
                    padding: moderateScale(30),
                    alignItems: 'center',
                    alignItems: 'flex-start',
                    flex: 1

                }}>

                    <View style={{
                        backgroundColor: '#F4F4F4', alignSelf: 'center',
                        height: moderateScale(90), width: moderateScale(90), borderRadius: moderateScale(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: verticalScale(10)
                    }}>

                        <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15) }} />
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: Colors.appBgColor,
                                textAlign: 'center',
                                width: '100%',
                            }}>Photo
                        </AutoSizeText>

                    </View>
                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginStart: moderateScale(5),
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(5)
                    }}>Name</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateName ? 'black' : 'darkred',
                        shadowOpacity: validateName ? 0.25 : 1,
                        padding: moderateScale(15),
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,
                            textAlign: 'left',
                        }}
                            underlineColorAndroid='transparent'
                            require={true}
                            numberOfLines={1}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidateName(Util.isLengthGreater(e))
                                setValueName(e)
                            }
                            }
                            value={valueName} />
                    </View>

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginStart: moderateScale(5),
                        marginTop: verticalScale(25), marginBottom: verticalScale(5)
                    }}>Email</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateEmail ? 'black' : 'darkred',
                        shadowOpacity: validateEmail ? 0.25 : 1,
                        padding: moderateScale(15),
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,
                            textAlign: 'left',
                        }}
                            underlineColorAndroid='transparent'
                            require={true}
                            numberOfLines={1}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            onChangeText={(e) => {
                                setValidateEmail(Util.isEmailValid(e))
                                setValueEmail(e)
                            }
                            }
                            value={valueEmail} />
                    </View>


                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginStart: moderateScale(5),
                        marginTop: verticalScale(25),
                        marginBottom: verticalScale(5)
                    }}>Phone</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validatePhone ? 'black' : 'darkred',
                        shadowOpacity: validatePhone ? 0.25 : 1,
                        padding: moderateScale(15),
                    }}>


                        <TextInput
                            maxLength={12}
                            placeholder="" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                            }}
                            underlineColorAndroid='transparent'
                            require={true}
                            numberOfLines={1}
                            autoCapitalize='none'
                            keyboardType="phone-pad"
                            onChangeText={(e) => {
                                setPhoneNo(e)
                            }
                            }
                            value={valuePhone} />
                    </View>


                    {getWeeklyRecurring()}
                    {getBusTiming()}
                    {getServiceType(true)}

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(45),
                        backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                addMember({
                                    name: valueName,
                                    email: valueEmail,
                                    id: arrIndex,
                                })
                                sheetRef.current.close()
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{!btnLabel ? 'Add' : 'Save'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(15),
                        backgroundColor: 'white'
                    }} onPress={() => { sheetRef.current.close() }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: moderateScale(18), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Cancel</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        )
    }



    ////////////////////  WEEK UI //////////////////
    function getWeeklyRecurring() {
        return (
            <View height={verticalScale(150)}>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: verticalScale(25),
                    marginStart: moderateScale(10),
                    marginBottom: verticalScale(10)
                }}>Work Days</Text>
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
                                height: verticalScale(40),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: moderateScale(5),
                            }} onPress={() => setWeekFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
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

    ////////////////// BUS TIMINGS //////////////
    function getBusTiming() {

        return (
            <View marginTop={verticalScale(15)} style={{ width: '100%' }}>
                {showBusTimings ?
                    (isStartBusTiming ?
                        <DateTimePickerModal
                            isVisible={showBusTimings}
                            mode={mode}
                            date={valueStartBusTiming ? new Date(valueStartBusTiming) : new Date()}
                            maximumDate={valueEndBusTiming ? new Date(valueEndBusTiming) : ''}
                            onConfirm={(time) => {
                                console.log('start-timing', time)
                                setValueStartBusTiming(time)
                                setShowBusTimings(false)

                            }}
                            onCancel={() => { setShowBusTimings(false) }}
                        /> :
                        <DateTimePickerModal
                            isVisible={showBusTimings}
                            mode={mode}
                            date={valueEndBusTiming ? new Date(valueEndBusTiming) : new Date()}
                            //minimumDate={valueStartBusTiming ? new Date(valueStartBusTiming) : ''}
                            onConfirm={(time) => {
                                console.log('end-timing', time)
                                setValueEndBusTiming(time);
                                setShowBusTimings(false)

                            }}
                            onCancel={() => { setShowBusTimings(false) }}
                        />) : null}

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginStart: moderateScale(5)
                }}>Work Schedule *</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: moderateScale(40),
                        flexDirection: 'row',
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 0,
                    }} onPress={() => {
                        setIsStartBusTiming(true)
                        setMode('time')
                        setShowBusTimings(true);
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                paddingEnd: moderateScale(5),
                                flex: 7,
                            }}>Start {valueStartBusTiming ? moment(valueStartBusTiming).format('hh:mm A') : ''}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15) }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: moderateScale(40),
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: moderateScale(10),
                        flexDirection: 'row'
                    }} onPress={() => {
                        setIsStartBusTiming(false)
                        setMode('time')
                        setShowBusTimings(true);
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}>End {valueEndBusTiming ? moment(valueEndBusTiming).format('hh:mm A') : ""}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15) }} />
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    function getServiceType(isShowThird) {

        return (<View marginTop={verticalScale(15)}>
            <Text style={{ ...styles.bottomSheetHeader, marginStart: moderateScale(5) }}>Service Type *</Text>
            <View flexDirection='row' marginTop={verticalScale(15)} style={{ justifyContent: 'space-between', width: isShowThird ? '90%' : '60%' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: moderateScale(5) }}>On-Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: moderateScale(5) }}>Off-Site</Text>
                </TouchableOpacity>
                {isShowThird ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(2) }}>
                        <Image source={serviceTypeIndex === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                        <Text style={{ ...styles.bottomSheetHeader, marginStart: moderateScale(5) }}>Both</Text>
                    </TouchableOpacity> : null
                }
            </View>
        </View>)
    }

    function setPhoneNo(text) {
        let tmp = "";

        if (text.length > valuePhone.length) {
            if (text.length > 3 && text.length <= 4 && !text.includes("-")) {
                tmp = text.substr(0, 3) + "-" + text.substr(3, text.length);
            }
            else if (text.length > 7 && text.length <= 8) {
                tmp = text.substr(0, 7) + "-" + text.substr(7, text.length);
            }
            else {
                tmp = text
            }
        } else {
            tmp = text;
        }

        setPhone(tmp)
        setValidatePhone(Util.isValidPhone(tmp))
    }



    function updateServiceValues(item) {
        setArrIndex(item ? item.id : wholeServices.length)
        setValueName(item ? item.name : '')
        setValidateName(item ? setValidateName(Util.isLengthGreater(item.name)) : true);
        setValueEmail(item ? item.email : '');
        setValidateEmail(item ? setValidateEmail(Util.isEmailValid(item.email)) : true);
    }
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
        height: moderateScale(48),
        backgroundColor: '#F5F5F5',
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        marginTop: verticalScale(2),
        width: '100%'
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(22),
        fontFamily: Fonts.type.medium
    },
    generalTxt2: {
        color: 'white',
        fontSize: moderateScale(18),
        fontFamily: Fonts.type.base
    },
    bottomSheetHeader: {
        color: '#464646',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(14),
        color: '#464646',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(22),
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width - moderateScale(50),
        height: verticalScale(250),
        margin: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: 'white',
        padding: moderateScale(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(4),
        elevation: moderateScale(5)
    },
});

export default TeamSetupView;