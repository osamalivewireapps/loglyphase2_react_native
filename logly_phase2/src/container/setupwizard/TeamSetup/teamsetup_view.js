/* eslint-disable no-dupe-keys */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Fonts, Colors, Icons } from "../../../theme";
import Util from "../../../utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import RBSheet from "react-native-raw-bottom-sheet";


function TeamSetupView(props) {

    const { backScreen, clickNextButton } = props;
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


    const sheetRef = React.useRef(null);


    return (
        <View style={{ flex: 1, backgroundColor: Colors.appBgColor }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0,
                    paddingBottom: 75
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                        <Text style={{ ...styles.generalTxt2, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                    </TouchableOpacity>

                </View>
                <Text style={{ ...styles.generalTxt2, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10, textAlign: 'center' }}>Account Setup</Text>
                <Text style={{ ...styles.generalTxt2, marginTop: 10, textAlign: 'center' }}>Manage team members</Text>
            </View>


            <View style={{ marginTop: -60,height:60}}>
                <ImageBackground
                    style={{
                        backgroundColor: 'white',
                        borderTopStartRadius: 30,
                        borderTopEndRadius: 30,
                        marginTop: 40,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        position: 'absolute'
                    }}

                />
            </View>

            <ScrollView keyboardShouldPersistTaps={true}>



                <View style={{
                    padding: 30,
                    paddingTop:0,
                    alignItems: 'center',
                    alignItems: 'flex-start',
                    flex: 1,
           
                }}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 20,
                        flex: 1,
                        height: 50,
                        paddingStart: 25,
                        paddingEnd: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }} onPress={() => {
                        setCloseBottonSheet(true)
                    }
                    }>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: 'black',
                                textAlign: 'left',
                                width: '100%',
                            }}>Add another member
                        </AutoSizeText>
                        <Image source={Icons.icon_awesome_plus} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        marginTop: 35, width: '100%'
                    }} onPress={() => { }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center', padding: 10,
                            paddingStart: 127, paddingEnd: 127,
                            paddingTop: 15, paddingBottom: 15,
                            ...styles.generalTxt
                        }}>FINISH</Text>
                    </TouchableOpacity>

                    {isBottonSheetVisible ? sheetRef.current.open() : null}
                    <RBSheet
                        ref={sheetRef}
                        height={Dimensions.get('screen').height - 130}
                        openDuration={250}
                        customStyles={{
                            container: {
                                borderRadius: 30
                            }
                        }}
                        onClose={() => setCloseBottonSheet(false)}
                    >
                        {showBottomSheet()}
                    </RBSheet>
                </View>
            </ScrollView>



        </View>
    )

    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (

            <ScrollView keyboardShouldPersistTaps={true}>



                <View style={{
                    padding: 30,
                    alignItems: 'center',
                    alignItems: 'flex-start',
                    flex: 1

                }}>

                    <View style={{
                        backgroundColor: '#F4F4F4', alignSelf: 'center',
                        height: 90, width: 90, borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 10
                    }}>

                        <Image source={Icons.icon_awesome_plus} />
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: Colors.appBgColor,
                                textAlign: 'center',
                                width: '100%',
                            }}>Logo
                        </AutoSizeText>

                    </View>
                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginStart: 5, marginTop: 15, marginBottom: 5
                    }}>Name</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        height: 50,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateName ? 'black' : 'darkred',
                        shadowOpacity: validateName ? 0.25 : 1,
                        padding: 15,
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
                        marginStart: 5, marginTop: 25, marginBottom: 5
                    }}>Email</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        height: 50,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateEmail ? 'black' : 'darkred',
                        shadowOpacity: validateEmail ? 0.25 : 1,
                        padding: 15,
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
                        marginStart: 5, marginTop: 25, marginBottom: 5
                    }}>Phone</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        height: 50,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validatePhone ? 'black' : 'darkred',
                        shadowOpacity: validatePhone ? 0.25 : 1,
                        padding: 15,
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
                        marginTop: 75, backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {

                                sheetRef.current.close()
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: 22, textAlign: 'center', padding: 10,
                            paddingTop: 5, paddingBottom: 5,

                        }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: 15, backgroundColor: 'white'
                    }} onPress={() => { sheetRef.current.close() }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: 18, textAlign: 'center', padding: 10,
                            paddingTop: 5, paddingBottom: 5,

                        }}>Cancel</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>

            //     {/* <ScrollView keyboardShouldPersistTaps='handled'>
            //         <View
            //             style={{
            //                 backgroundColor: 'white',
            //                 padding: 30,
            //                 height: '100%',
            //                 flex: 1,
            //                 justifyContent: 'flex-start'
            //             }}> */}


            //     // </View>
            //     // </ScrollView>
            //     //    )
            // }
        )
    }

    ////////////////////  WEEK UI //////////////////
    function getWeeklyRecurring() {
        return (
            <View height={150}>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: 25, marginStart: 10,
                    marginBottom: 10
                }}>Work Days</Text>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isDaySelect(item) ? '#FFC081' : '#F5F5F5',
                                borderRadius: 10,
                                marginTop: 5,
                                width: Dimensions.get('screen').width / 5,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: 5,
                            }} onPress={() => setWeekFrequency(
                                { day: item }
                            )}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={14}
                                    fontSize={16}
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
            <View marginTop={15} style={{ width: '100%' }}>
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
                            minimumDate={valueStartBusTiming ? new Date(valueStartBusTiming) : ''}
                            onConfirm={(time) => {
                                console.log('end-timing', time)
                                setValueEndBusTiming(time);
                                setShowBusTimings(false)

                            }}
                            onCancel={() => { setShowBusTimings(false) }}
                        />) : null}

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginStart: 5
                }}>Work Timing *</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        flexDirection: 'row',
                        padding: 15,
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
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}>Start {valueStartBusTiming ? moment(valueStartBusTiming).format('hh:mm') : ''}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 10,
                        flexDirection: 'row'
                    }} onPress={() => {
                        setIsStartBusTiming(false)
                        setMode('time')
                        setShowBusTimings(true);
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}>End {valueEndBusTiming ? moment(valueEndBusTiming).format('hh:mm') : ""}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} />
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    function getServiceType(isShowThird) {

        return (<View marginTop={15}>
            <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Service Type *</Text>
            <View flexDirection='row' marginTop={15} style={{ justifyContent: 'space-between', width: isShowThird ? '90%' : '60%' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>On-Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Off-Site</Text>
                </TouchableOpacity>
                {isShowThird ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(2) }}>
                        <Image source={serviceTypeIndex === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                        <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Both</Text>
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
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 50,
        backgroundColor: '#F5F5F5',
        elevation: 5,
        borderRadius: 10,
        marginTop: 2
    },
    generalTxt: {
        color: 'white',
        fontSize: 22,
        fontFamily: Fonts.type.medium
    },
    generalTxt2: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    bottomSheetHeader: {
        color: '#464646',
        fontSize: 16,
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 14,
        color: '#464646',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width,
        height: 350,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default TeamSetupView;