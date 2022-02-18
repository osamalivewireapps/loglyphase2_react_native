/* eslint-disable no-dupe-keys */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, Keyboard } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Fonts, Colors, Icons } from "../../../theme";
import Util from "../../../utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { BUS_LISTING, BUS_SER_PROVIDER, INDIVIDUAL } from "../../../constants";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';

function BusProfileView(props) {

    LocaleConfig.locales['en'] = {
        monthNames: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: [],
        dayNames: [],
        dayNamesShort: ['S', 'M.', 'T.', 'W', 'T.', 'F', 'S'],
        today: ''
    };
    LocaleConfig.defaultLocale = 'en';

    const { isServiceEnabled, backScreen, clickNextButton, accountType, busDetails,
        capturePic, imgUri } = props;

    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [selectWeekFrequency, setSelectWeekFrequency] = useState([]);
    const [showBusTimings, setShowBusTimings] = useState(false);
    const [valueStartBusTiming, setValueStartBusTiming] = useState('');
    const [mode, setMode] = useState('');
    const [valueEndBusTiming, setValueEndBusTiming] = useState('');
    const [isStartBusTiming, setIsStartBusTiming] = useState(false);
    const [valueStartTiming, setValueStartTiming] = useState('');
    const [valueEndTiming, setValueEndTiming] = useState('');
    const [isStartTiming, setIsStartTiming] = useState(true);
    const [show, setShow] = useState(false);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [valueHolidays, setValueHolidays] = useState('');
    const [indexHoliday, setIndexHoliday] = useState(0);
    const [valueTaxPercentage, setValueTaxPercentage] = useState(0);
    const [validateHolidays, setValidateHolidays] = useState(true);
    const [addHolidays, setAddHolidays] = useState([]);
    const [verticalOffSet, setVerticalOffSet] = useState(50);
    const [dialogVisibleStatus, setDialogVisibleStatus] = useState(false);
    const [photoUri, setPhotoUri] = useState('');
    const [validateTax, setValidateTax] = useState(true);

    const sheetRef = React.useRef(null);
    //SCROLLVIEW
    const scroll = React.useRef(null);

    useEffect(() => {
        if (imgUri && imgUri.length > 0) {
            setPhotoUri(imgUri)
        }
    }, [imgUri])

    useEffect(() => {
        if (busDetails.length > 0) {
            setDesc(busDetails[0].businessInfo ? busDetails[0].businessInfo:'')
            setSelectWeekFrequency(busDetails[0].daysOpen ? busDetails[0].daysOpen:[])
            setValueStartBusTiming(busDetails[0].openHrStart ? moment(busDetails[0].openHrStart).format('YYYY-MM-DDTHH:mm') : '')
            setValueEndBusTiming(busDetails[0].openHrEnd ? moment(busDetails[0].openHrEnd).format('YYYY-MM-DDTHH:mm') : '')
            setValueStartTiming(busDetails[0].breakTimeStart ? moment(busDetails[0].breakTimeStart).format('YYYY-MM-DDTHH:mm') : '')
            setValueEndTiming(busDetails[0].breakTimeEnd ? moment(busDetails[0].breakTimeEnd).format('YYYY-MM-DDTHH:mm') : '')
            setAddHolidays(busDetails[0].holidays ? busDetails[0].holidays:[])
            setValueTaxPercentage(busDetails[0].taxPercentage + "")
            setPhotoUri(busDetails[0].imageUrl ? busDetails[0].imageUrl:'')
        }
    }, [busDetails])

    //////////////////////////  CALENDAR ////////////////////////
    const initialDate = moment().format('YYYY-MM-DD');
    const [selected, setSelected] = useState(initialDate);
    let markedDates = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.appBgColor,
            selectedTextColor: 'white',
        }
    };

    const onDayPress = day => {
        setSelected(day.dateString);
    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.appBgColor }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(30),
                    paddingBottom: verticalScale(75)
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                        <Text style={{ ...styles.generalTxt, fontSize: moderateScale(18), marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-1) }}>Back</Text>
                    </TouchableOpacity>

                    {accountType === BUS_LISTING ? (!isServiceEnabled ? <View /> : getSkipBtn()) :
                        getSkipBtn()
                    }
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
                        <View style={{ borderWidth: moderateScale(1), borderColor: 'white', borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: 'white', fontSize: moderateScale(14) }}>3</Text>
                        </View>

                    </View> : <View />}
                <Text style={{ ...styles.generalTxt2, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10), textAlign: 'center' }}>{accountType === INDIVIDUAL ? 'Pet Owners Profile' : accountType === BUS_SER_PROVIDER ? "Account Setup" : 'Business Details'}</Text>
                <Text style={{ ...styles.generalTxt2, marginTop: verticalScale(10), textAlign: 'center' }}>{accountType === INDIVIDUAL ? 'Please setup your profile' : 'Please setup your business profile'}</Text>
            </View>


            <View style={{ marginTop: verticalScale(-60) }}>
                <ImageBackground
                    style={{
                        backgroundColor: 'white',
                        borderTopStartRadius: moderateScale(30),
                        borderTopEndRadius: moderateScale(30),
                        marginTop: verticalScale(40),
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        position: 'absolute'
                    }}

                />
                <TouchableOpacity
                    onPress={() => {
                        setDialogVisibleStatus(true)
                    }}
                    style={{
                        backgroundColor: '#F4F4F4', alignSelf: 'center',
                        height: moderateScale(90), width: moderateScale(90),
                        borderRadius: moderateScale(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: verticalScale(10)
                    }}>

                    <Image
                        source={{ uri: photoUri }}
                        style={{
                            height: moderateScale(90),
                            width: moderateScale(90),
                            borderRadius: moderateScale(100),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute'
                        }} />
                    {!photoUri || photoUri.length === 0 ?
                        <View style={{ alignItems: 'center' }}>
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
                                }}>{accountType === INDIVIDUAL ? 'Photo' : 'Logo'}
                            </AutoSizeText>
                        </View>
                        : <View />
                    }



                </TouchableOpacity>
            </View>




            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={verticalOffSet}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={{
                        padding: moderateScale(30),
                        alignItems: 'center',
                        alignItems: 'flex-start',
                        flex: 1

                    }}>

                        <Text style={{
                            ...styles.bottomSheetHeader,
                            marginBottom: verticalScale(5), marginStart: moderateScale(5),
                            marginTop: 0
                        }}>{accountType === INDIVIDUAL ? 'About Me *' : 'Business Info *'}</Text>
                        <View style={{
                            ...styles.boxcontainer,
                            height: verticalScale(100),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateDesc ? 'black' : 'darkred',
                            shadowOpacity: validateDesc ? 0.25 : 1,
                            padding: moderateScale(15),
                        }}>


                            <TextInput placeholder="" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                                textAlignVertical: "top",
                                height: verticalScale(100),
                                paddingTop: verticalScale(15)
                            }}
                                underlineColorAndroid='transparent'
                                require={true}
                                multiline={true}
                                numberOfLines={50}
                                maxLength={75}
                                autoCapitalize='none'
                                keyboardType="default"
                                onChangeText={(e) => {
                                    setValidateDesc(Util.isLengthGreater(e))
                                    setDesc(e)
                                }
                                }
                                value={valueDesc} />
                        </View>

                        {accountType == INDIVIDUAL ? <View /> : <View style={{ width: '100%' }}>
                            {getWeeklyRecurring()}
                            {getBusTiming()}
                            {getClassTiming()}
                            <View style={{
                                marginTop: verticalScale(15),
                                flex: 1
                            }}>
                                <View style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    width: '99%',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#F5F5F5',
                                        borderRadius: moderateScale(10),
                                        height: verticalScale(50),
                                        paddingStart: moderateScale(25),
                                        paddingEnd: moderateScale(25),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }} onPress={() => {
                                        setIndexHoliday(addHolidays.length)
                                        setValueHolidays('')
                                        setSelected(initialDate)
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
                                                color: '#454545',
                                                textAlign: 'left',
                                                width: '100%',
                                            }}>Holidays
                                        </AutoSizeText>
                                        <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(15) }} />
                                    </TouchableOpacity>
                                    {addHolidays.length > 0 ?
                                        <FlatList
                                            contentContainerStyle={{ paddingBottom: verticalScale(10) }}
                                            nestedScrollEnabled={true}
                                            data={addHolidays}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity style={{
                                                        backgroundColor: 'white',
                                                        borderRadius: moderateScale(10),
                                                        height: verticalScale(50),
                                                        marginTop: verticalScale(5),
                                                        width: Dimensions.get('screen').width - moderateScale(90),
                                                        flexDirection: 'row'

                                                    }} onPress={() => {
                                                        markedDates = item.markedDate
                                                        setIndexHoliday(item.id)
                                                        setValueHolidays(item.holi_name)
                                                        setCloseBottonSheet(true)
                                                    }
                                                    }>

                                                        <View
                                                            style={{
                                                                height: '100%',
                                                                backgroundColor: Colors.appBgColor,
                                                                borderRadius: moderateScale(10),
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                flex: 0.25
                                                            }} >

                                                            <AutoSizeText
                                                                numberOfLines={1}
                                                                minFontSize={moderateScale(16)}
                                                                fontSize={moderateScale(30)}
                                                                mode={ResizeTextMode.max_lines}
                                                                style={{
                                                                    ...styles.generalTxt,
                                                                    fontFamily: Fonts.type.bold,
                                                                    color: 'white'
                                                                }}>{item.holi_date ? moment(item.holi_date).format("D") : ''}
                                                            </AutoSizeText>
                                                            <AutoSizeText
                                                                numberOfLines={1}
                                                                minFontSize={moderateScale(10)}
                                                                fontSize={moderateScale(12)}
                                                                mode={ResizeTextMode.max_lines}
                                                                style={{
                                                                    ...styles.generalTxt,
                                                                    includeFontPadding: false,
                                                                    fontFamily: Fonts.type.base,
                                                                    marginTop: verticalScale(-5),
                                                                    color: 'white'
                                                                }}>{item.holi_date ? moment(item.holi_date).format("MMM") : ''}
                                                            </AutoSizeText>


                                                        </View>
                                                        <View style={{
                                                            flex: 1,
                                                            justifyContent: 'center'
                                                        }}>
                                                            <AutoSizeText
                                                                numberOfLines={1}
                                                                minFontSize={moderateScale(14)}
                                                                fontSize={moderateScale(16)}
                                                                mode={ResizeTextMode.max_lines}
                                                                style={{
                                                                    ...styles.generalTxt,
                                                                    fontFamily: Fonts.type.base,
                                                                    paddingStart: moderateScale(10),
                                                                    paddingEnd: moderateScale(10),
                                                                    color: '#585858'
                                                                }}>{item.holi_name}
                                                            </AutoSizeText>

                                                        </View>

                                                    </TouchableOpacity>
                                                )
                                            }}

                                        /> : null}
                                </View>
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

                            <Text style={{
                                ...styles.bottomSheetHeader,
                                marginStart: moderateScale(5),
                                marginTop: verticalScale(15),
                                marginBottom: verticalScale(5)
                            }}>Tax Percentage</Text>

                            <View style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', alignItems: 'center',
                                shadowColor: validateTax ? 'black' : 'darkred',
                                shadowOpacity: validateTax ? 0.25 : 1,
                                padding: moderateScale(15),
                            }}>


                                <TextInput placeholder="" style={{
                                    ...styles.styleTextInput,
                                    flex: 1,
                                    textAlign: 'left',
                                }}
                                    onPressIn={() => {
                                        //scroll.current.scrollTo({ x: 0, y: -50, animated: true })
                                    }}


                                    underlineColorAndroid='transparent'
                                    require={true}
                                    numberOfLines={1}
                                    autoCapitalize='none'
                                    keyboardType="number-pad"
                                    onChangeText={(e) => {
                                        setValidateTax(Util.isTwoDecimalPlaces(e))
                                        setValueTaxPercentage(e)
                                    }
                                    }
                                    value={valueTaxPercentage} />

                                <Text style={{
                                    ...styles.suffix,
                                    flex: 0.05,
                                }}>%</Text>
                            </View>
                        </View>}
                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            marginTop: verticalScale(35), width: '100%'
                        }} onPress={() => {

                            if (validateSpecificFields()) {
                                let busDetail = {};
                                busDetail.description = valueDesc;
                                if (accountType === INDIVIDUAL) {
                                    //busDetail.businessInfo = valueDesc;
                                    busDetail.imageUrl = photoUri;
                                } else {
                                    //busDetail.businessInfo = valueDesc;
                                    busDetail.daysOpen = selectWeekFrequency
                                    busDetail.openHrStart = moment(valueStartBusTiming).format('YYYY-MM-DDTHH:mm')
                                    busDetail.openHrEnd = moment(valueEndBusTiming).format('YYYY-MM-DDTHH:mm')
                                    busDetail.breakTimeStart = moment(valueStartTiming).format('YYYY-MM-DDTHH:mm')
                                    busDetail.breakTimeEnd = moment(valueEndTiming).format('YYYY-MM-DDTHH:mm')
                                    busDetail.holidays = addHolidays//[{ "holi_date": "2019-04-28T14:45:15", "holi_name": "newyear" }],
                                    busDetail.taxPercentage = valueTaxPercentage;
                                    busDetail.imageUrl = photoUri;
                                }
                                clickNextButton(busDetail)
                            }
                        }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: moderateScale(10),
                                paddingBottom: moderateScale(10),
                                ...styles.generalTxt
                            }}>NEXT</Text>
                        </TouchableOpacity>






                        <Dialog
                            visible={dialogVisibleStatus}
                            width={Dimensions.get("screen").width - 100}
                            height={Dimensions.get("screen").height / 6}
                            onTouchOutside={() => {
                                setDialogVisibleStatus(false);
                            }}
                            dialogTitle={<DialogTitle title="Profile Picture" />}
                            dialogAnimation={new ScaleAnimation({
                                toValue: 0,
                                useNativeDriver: true,
                            })}
                        >
                            <DialogContent
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                }}>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        flex: 5,
                                        height: 50,
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        borderRadius: 10,
                                        marginRight: 10,
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                        onPress={() => {
                                            capturePic('gallery');
                                            setDialogVisibleStatus(false);
                                        }}>
                                        Gallery
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        flex: 5,
                                        height: 50,
                                        borderWidth: 2,
                                        borderColor: 'black',
                                        borderRadius: 10,
                                        marginRight: 10,
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                        }}
                                        onPress={() => {
                                            capturePic('camera');
                                            setDialogVisibleStatus(false);
                                        }}>
                                        Camera
                                    </Text>
                                </View>
                            </DialogContent>
                        </Dialog>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>




        </View >
    )

    function getSkipBtn() {
        return (
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={(e) => clickNextButton(null)}>
                <Text style={{ ...styles.generalTxt, fontSize: moderateScale(18), marginStart: moderateScale(5), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-8) }}>Skip</Text>
                <Image source={Icons.icon_feather_arrow_right} style={{ marginTop: 0, height: verticalScale(12), width: moderateScale(48) }} resizeMode='contain' />

            </TouchableOpacity>
        )
    }

    function setHolidays(e) {

        let tmp = addHolidays;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.id === e.id);
            if (itemService) {
                tmp = tmp.map(x => (x.id === e.id ? { ...e } : x));
            } else {
                tmp.push(e);
            }
        }
        //setVerticalOffSet(50)
        setAddHolidays(tmp);
    }

    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: moderateScale(30),
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>
                    <Calendar
                        enableSwipeMonths={true}
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        hideExtraDays
                        theme={{
                            monthTextColor: Colors.appBgColor,
                            textMonthFontFamily: Fonts.type.bold,
                            textMonthFontSize: moderateScale(20),
                            textDayFontSize: moderateScale(12),
                            textDayHeaderFontSize: moderateScale(12),
                            calendarBackground: '#F5F5F5',
                            borderRadius: moderateScale(100),
                            textSectionTitleColor: '#595959',
                            dayTextColor: '#595959',

                        }}
                    />

                    <View style={{
                        ...styles.boxcontainer,
                        marginTop: verticalScale(15),
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateHolidays ? 'black' : 'darkred',
                        shadowOpacity: validateHolidays ? 0.25 : 1,
                        padding: moderateScale(20),
                    }}>


                        <TextInput placeholder="Holiday Name" style={{
                            ...styles.styleTextInput,
                            textAlign: 'left',
                            flex: 1,
                            height: verticalScale(50),
                        }}
                            underlineColorAndroid='transparent'
                            require={true}
                            numberOfLines={1}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidateHolidays(Util.isLengthGreater(e))
                                setValueHolidays(e)
                            }
                            }
                            value={valueHolidays} />
                    </View>


                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                setHolidays({ id: indexHoliday, holi_name: valueHolidays, holi_date: selected, markedDate: markedDates });
                                sheetRef.current.close()
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(15), backgroundColor: 'white'
                    }} onPress={() => { sheetRef.current.close() }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: moderateScale(18),
                            textAlign: 'center', padding: moderateScale(10),
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
                    marginTop: verticalScale(25), marginStart: moderateScale(10),
                    marginBottom: moderateScale(10)
                }}>Days Open *</Text>
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
                                item
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
            let itemService = tmp.find(item => item === e);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectWeekFrequency([...tmp])
    }

    function isDaySelect(item) {

        console.log("day select-->", selectWeekFrequency.length + "-" + item);
        let itemService = selectWeekFrequency.find(e => e === item);
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
                            is24Hour={true}
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
                            is24Hour={true}
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
                }}>Operating Hours *</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: verticalScale(40),
                        flexDirection: 'row',
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
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
                                flex: moderateScale(7),
                            }}>Start {valueStartBusTiming ? moment(valueStartBusTiming).format('hh:mm A') : ''}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(15) }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: verticalScale(40),
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
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
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(15) }} />
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    ////////////////// BREAK TIMING ///////////
    function getClassTiming() {

        return (
            <View marginTop={verticalScale(15)} width='100%'>
                {show ?
                    (isStartTiming ?
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            is24Hour={true}
                            date={valueStartTiming ? new Date(valueStartTiming) : new Date()}
                            maximumDate={valueEndTiming ? new Date(valueEndTiming) : ''}
                            onConfirm={(time) => {
                                console.log('start-timing', time)
                                setValueStartTiming(time)
                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        /> :
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            is24Hour={true}
                            date={valueEndTiming ? new Date(valueEndTiming) : new Date()}
                            //minimumDate={valueStartTiming ? new Date(valueStartTiming) : ''}
                            onConfirm={(time) => {
                                console.log('end-timing', time)
                                setValueEndTiming(time);
                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        />) : null}

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginStart: moderateScale(5)
                }}>Lunch Break</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: verticalScale(40),
                        flexDirection: 'row',
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
                        alignItems: 'center',
                        marginStart: 0,
                    }} onPress={() => {
                        setIsStartTiming(true)
                        setMode('time')
                        setShow(true);
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
                            }}>Start {valueStartTiming ? moment(valueStartTiming).format('hh:mm A') : ''}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(15) }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: verticalScale(40),
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
                        alignItems: 'center',
                        marginStart: moderateScale(10),
                        flexDirection: 'row'
                    }} onPress={() => {
                        setIsStartTiming(false)
                        setMode('time')
                        setShow(true);
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
                            }}>End {valueEndTiming ? moment(valueEndTiming).format('hh:mm A') : ""}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(15) }} />
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    function validateSpecificFields() {

        if (!Util.isLengthGreater(valueDesc)) {

            Util.topAlertError("Business Info is required");
            setValidateDesc(false)
            return false;
        }
        else if (accountType === INDIVIDUAL) {
            return true;
        }
        else if (selectWeekFrequency.length === 0) {

            Util.topAlertError("Select atleast one day");
            return false;
        }
        else if (!valueStartBusTiming || !valueEndBusTiming) {

            console.log('valueStartBusTiming-- >', valueStartBusTiming)
            Util.topAlertError("Operating hours are required");
            return false;
        }
        // else if (!valueStartTiming || !valueEndTiming) {

        //     Util.topAlertError("Break timing are required");
        //     return false;
        // }
        return true
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
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%',
        marginTop: verticalScale(2)
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
    suffix: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(14),
        paddingStart: moderateScale(10),
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
        marginTop: moderateScale(22),
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width,
        height: 350,
        margin: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: 'white',
        padding: moderateScale(30),
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

const theme = {
    'stylesheet.calendar.header': {
        dayHeader: {
            fontWeight: '600',
            color: '#48BFE3'
        }
    },
    'stylesheet.day.basic': {
        today: {
            borderColor: '#48BFE3',
            borderWidth: 0.8
        },
        todayText: {
            color: '#5390D9',
            fontWeight: '800'
        }
    }
};

export default BusProfileView;