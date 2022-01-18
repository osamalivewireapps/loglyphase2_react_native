/* eslint-disable react/self-closing-comp */
/* eslint - disable curly * /
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import { ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function SelectDateServiceView(props) {

    const [tabs, setTab] = useState(0);
    const [selectTimeFrequency, setSelectTimeFrequency] = useState([]);
    const [showDatePicker, setshowDatePicker] = useState(false);
    const [valuePickDate, setValuePickDate] = useState(initialDate);

    const sheetCalRef = useRef(null);

    //////////////////////////  CALENDAR ////////////////////////
    const [isCalSheetVisible, setCloseCalSheet] = useState(false)
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                padding: moderateScale(25),
                flexDirection: 'row', alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                    <Image source={Icons.icon_whitebg_back} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>


                    <TouchableOpacity onPress={() => {
                        const resetAction = CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                        });

                        props.navigation.dispatch(resetAction);

                    }}>


                        <Image source={Icons.icon_header_home} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{
                flex: 1,
                padding: moderateScale(25),
                paddingTop: 0,
                justifyContent:'flex-end'
            }}>
                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#404040',

                    }}
                >
                    Select Date
                </AutoSizeText>

                <TouchableOpacity
                    onPress={() => {
                        setCloseCalSheet(true)
                    }}
                    style={{
                        ...styles.boxcontainer,
                        height: verticalScale(35),
                        marginTop: verticalScale(5),
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
                            {moment(selected).format('DD MMM,YYYY')}

                        </AutoSizeText>
                        <Image source={Icons.icon_material_date_range} resizeMode="contain" style={{ height: verticalScale(12), width: moderateScale(12) }} />

                    </View>
                </TouchableOpacity>

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#404040',
                        marginTop: verticalScale(15)

                    }}
                >
                    Select Time
                </AutoSizeText>

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

                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.overflow_replacement}
                    style={{
                        color: '#A1A1A1',
                        fontFamily: Fonts.type.base,
                        marginBottom:verticalScale(10)
                    }}>
                    16 Slots Available

                </AutoSizeText>

                {getTimeUI()}

                <RBSheet
                    ref={sheetCalRef}
                    height={Dimensions.get('screen').height - moderateScale(130)}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderRadius: moderateScale(30)
                        }
                    }}
                    onClose={() => setCloseCalSheet(false)}
                >
                    {showCalendarSheet()}
                </RBSheet>

                {isCalSheetVisible ? sheetCalRef.current.open() : null}

                <TouchableOpacity style={{
                    ...styles.styleButtons,
                    marginTop: verticalScale(20),
                    width: '80%',
                    alignSelf: 'center',



                }} onPress={() => { props.navigation.navigate('SelectDateServices'); }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center',
                        padding: moderateScale(10),
                        paddingTop: moderateScale(12),
                        paddingBottom: moderateScale(12),
                        ...styles.generalTxt,
                    }}>PROCEED</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

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

    ////////////////////  TIME UI //////////////////
    function getTimeUI() {

        let time = ['12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM',
            '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
            '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM',
            '06:00 AM', '06:30 AM', '06:00 AM', '06:30 AM',
            '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
        return (
            <View style={{flex:1}}>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ 
                        justifyContent: 'center', alignItems: 'center' }}
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

    function showCalendarSheet() {

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




                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(25), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                                setCloseCalSheet(false);
                                sheetCalRef.current.close()
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
                    }} onPress={() => {
                        setCloseCalSheet(false);
                        sheetCalRef.current.close()
                    }}>
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
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%',
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base,
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30),
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});