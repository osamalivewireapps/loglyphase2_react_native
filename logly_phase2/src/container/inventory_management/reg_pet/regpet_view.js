/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-gesture-handler';
import Util from '../../../utils';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AppLoader from '../../../components/AppLoader';


function RegisterPetView(props) {


    const { isLoad, animalCategories, animalBreed, getAnimalBreed } = props;

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [isCalSheetVisible, setCloseCalSheet] = useState(false)
    const [isBreedSheetVisible, setCloseBreedSheet] = useState(false)

    const [petIndex, setPetIndex] = useState(-1);
    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState('')
    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [serviceTypeIndex, setServiceTypeIndex] = useState(0);
    const [listBreed, setListBreed] = useState([]);

    const sheetRef = useRef(null);
    const sheetCalRef = useRef(null);
    const sheetBreedRef = useRef(null);

    const isTablet = DeviceInfo.isTablet();

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

    console.log("animalCategories1-->", animalCategories.length);
    const onDayPress = day => {
        setSelected(day.dateString);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#FFB531',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(160)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
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
                    marginBottom: verticalScale(25)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: '#161D6E',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Register Pet

                    </AutoSizeText>
                    <Image source={Images.img_reg_pet} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ flex: 1 }}>



                    <View style={{
                        flex: 1,
                        padding: moderateScale(25),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%'
                                    }}>
                                    {petIndex > -1 ? animalCategories[petIndex].categoryId.name : 'Select Pet Category'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

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
                            {showPetCategory()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}

                        <RBSheet
                            ref={sheetCalRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showCalendarSheet()}
                        </RBSheet>

                        {isCalSheetVisible ? sheetCalRef.current.open() : null}

                        {petIndex > -1 ?
                            <View>
                                <View style={{
                                    backgroundColor: '#F4F4F4', alignSelf: 'center',
                                    height: moderateScale(90),
                                    width: moderateScale(90),
                                    borderRadius: moderateScale(100),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: verticalScale(20),
                                    marginBottom: verticalScale(10)
                                }}>

                                    <Image source={Icons.icon_awesome_plus} resizeMode='contain'
                                        style={{
                                            height: verticalScale(10),
                                            width: verticalScale(10)
                                        }} />

                                </View>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                        width: '100%',
                                        textAlign: 'center',
                                        marginBottom: verticalScale(10)
                                    }}>
                                    Add Animal Photo

                                </AutoSizeText>

                                <View style={{
                                    ...styles.boxcontainer,
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateName ? 'transparent' : 'darkred',
                                    shadowOpacity: validateName ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Enter Name" style={{
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
                                            setValidateName(Util.isLengthGreater(e));
                                            setValueName(e)
                                        }
                                        }
                                        value={valueName} />
                                </View>

                                <TouchableOpacity style={{
                                    ...styles.styleButtons, width: '100%',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(25),
                                    backgroundColor: 'white',
                                    borderWidth: moderateScale(1),
                                    padding: moderateScale(10),
                                    paddingBottom: verticalScale(10)
                                }} onPress={() => { 
                                    getAnimalBreed(animalCategories[petIndex].categoryId._id)
                                    setCloseBreedSheet(true) }}>
                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        paddingBottom: 0,
                                        color: Colors.appBgColor
                                    }}>Select Breed</Text>


                                    <FlatList
                                        numColumns={2}
                                        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        data={listBreed}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#F5F5F5',
                                                    borderRadius: moderateScale(10),
                                                    marginTop: verticalScale(5),
                                                    height: verticalScale(30),
                                                    width: Dimensions.get('screen').width / 2.6,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginStart: moderateScale(5),
                                                }}>

                                                    <AutoSizeText
                                                        numberOfLines={1}
                                                        minFontSize={moderateScale(14)}
                                                        fontSize={moderateScale(16)}
                                                        mode={ResizeTextMode.max_lines}
                                                        style={{
                                                            ...styles.generalTxt,
                                                            color: '#464646',
                                                            textAlign: 'center'
                                                        }}>{item.name}
                                                    </AutoSizeText>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />

                                </TouchableOpacity>
                                <RBSheet
                                    ref={sheetBreedRef}
                                    height={Dimensions.get('screen').height - moderateScale(130)}
                                    openDuration={250}
                                    customStyles={{
                                        container: {
                                            borderRadius: moderateScale(30)
                                        }
                                    }}
                                    onClose={() => setCloseBreedSheet(false)}
                                >
                                    {showBreed()}
                                </RBSheet>

                                {isBreedSheetVisible ? sheetBreedRef.current.open() : null}

                                <Text
                                    style={{
                                        ...styles.generalTxt,
                                        color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                        width: '100%',
                                        textAlign: 'left',
                                        marginTop: verticalScale(25),
                                        marginBottom: verticalScale(10)
                                    }}>

                                    Select DOB
                                </Text>

                                <TouchableOpacity style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(0),
                                    flex: 1,
                                    width: '100%',
                                    height: verticalScale(40),
                                    flexDirection: 'row',
                                    paddingStart: moderateScale(15),
                                    paddingEnd: moderateScale(15),
                                    alignItems: 'center',
                                    marginStart: 0,
                                }} onPress={() => {
                                    setCloseCalSheet(true)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: '#464646',
                                            paddingEnd: moderateScale(5),
                                            flex: 7,
                                        }}>{selected}
                                    </AutoSizeText>
                                    <Image source={Icons.icon_material_date_range} resizeMode='contain' style={{ height: verticalScale(13), width: verticalScale(13) }} />
                                </TouchableOpacity>

                                {getServiceType(false)}

                                <View style={{
                                    ...styles.boxcontainer,
                                    height: verticalScale(100),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateDesc ? 'transparent' : 'darkred',
                                    shadowOpacity: validateDesc ? 0.25 : 1,
                                    marginTop: verticalScale(25),
                                }}>


                                    <TextInput placeholder="Enter Notes" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        paddingTop: verticalScale(15),
                                        padding: moderateScale(15),
                                        textAlign: 'left',
                                        height: verticalScale(100),
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
                                <Text style={{
                                    marginTop: verticalScale(25),
                                    ...styles.generalTxt, color: '#464646',
                                    fontFamily: Fonts.type.medium,
                                }}>Parents</Text>

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

                                    }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(16)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#464646',
                                                paddingEnd: moderateScale(5),
                                                flex: 7,
                                            }}>Add Parent
                                        </AutoSizeText>
                                        <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
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
                                    }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(16)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#464646',
                                                flex: 7,
                                            }}>Add Parent
                                        </AutoSizeText>
                                        <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                    </TouchableOpacity>


                                </View>
                                <Text style={{
                                    marginTop: verticalScale(25),
                                    ...styles.generalTxt, color: '#464646',
                                    fontFamily: Fonts.type.medium,
                                }}>Child</Text>

                                <TouchableOpacity style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(5),
                                    flex: 0.5,
                                    width: '50%',
                                    height: verticalScale(40),
                                    flexDirection: 'row',
                                    paddingStart: moderateScale(15),
                                    paddingEnd: moderateScale(15),
                                    alignItems: 'center',
                                    marginStart: 0,
                                }} onPress={() => {

                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: '#464646',
                                            paddingEnd: moderateScale(5),
                                            flex: 7,
                                        }}>Add Children
                                    </AutoSizeText>
                                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                </TouchableOpacity>

                            </View> : null}
                    </View>

                    {petIndex > -1 ?
                        <View>
                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                backgroundColor: 'white',
                                borderWidth: moderateScale(1),
                                marginBottom: verticalScale(0)
                            }} onPress={() => { }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),
                                    color: Colors.appBgColor
                                }}>Add Videos / Photos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                marginTop: verticalScale(15)
                            }} onPress={() => { }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                                }}>REGISTER</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View>
            </ScrollView>

            <AppLoader loader={{ isLoading: isLoad }} />
        </View>

    );

    function getServiceType(isShowThird) {

        return (<View>
            <Text style={{
                marginTop: verticalScale(25),
                ...styles.generalTxt, color: '#464646',
                fontFamily: Fonts.type.medium,
            }}>Select Sex</Text>
            <View flexDirection='row' marginTop={verticalScale(10)} style={{ justifyContent: 'space-between', width: isShowThird ? '90%' : '60%' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{
                        ...styles.generalTxt, color: '#464646',
                        fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                    }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{
                        ...styles.generalTxt, color: '#464646',
                        fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                    }}>Female</Text>
                </TouchableOpacity>
                {isShowThird ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(2) }}>
                        <Image source={serviceTypeIndex === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                        <Text style={{
                            ...styles.generalTxt, color: '#464646',
                            fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                        }}>Other</Text>
                    </TouchableOpacity> : null
                }
            </View>
        </View>)
    }

    function showPetCategory() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Pet Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={animalCategories}
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
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item.categoryId.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function showBreed() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Breed</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={animalBreed}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        selectBreed(item)
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={isBreedSelect(item) ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function selectBreed(e) {
        let tmp = listBreed;
        let itemService = tmp.find(item => item._id === e._id);
        if (itemService) {
            tmp.splice(tmp.indexOf(itemService), 1);
        } else {
            tmp.push(e);
        }
        setListBreed([...tmp]);
    }

    function isBreedSelect(item) {
        let itemService = listBreed.find(e => e._id === item._id);
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
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
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

export default RegisterPetView;