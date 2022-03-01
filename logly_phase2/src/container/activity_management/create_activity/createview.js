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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';
import { CommonActions } from '@react-navigation/routers';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import Util from '../../../utils';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

function CreateActivityView(props) {


    const { getAllCategories, addScheduleActivity } = props;
    const initialDate = moment().format('YYYY-MM-DD');

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);

    const [petIndex, setPetIndex] = useState(0);
    const [activityIndex, setActivityIndex] = useState(-1);

    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [valuePickTime, setValuePickTime] = useState(initialDate);
    const [showBusTimings, setShowBusTimings] = useState(false);
    const [showDatePicker, setshowDatePicker] = useState(false);
    const [valuePickDate, setValuePickDate] = useState(initialDate);

    const [category, setCategoryList] = useState([]);
    const [activityType, setActivityType] = useState([]);
    const [activityPress, setActivityPress] = useState(-1);

    const sheetRef = useRef(null);
    const sheetBreedRef = useRef(null);

    const isTablet = Platform.isTV;

    useEffect(() => {
        setPetIndex(0)
        setCategoryList([])
    }, []);

    useEffect(() => {

        if (getAllCategories) {
            setCategoryList(getAllCategories)
        }
    }, [getAllCategories]);

    useEffect(() => {

        setActivityIndex(-1);

        if (petIndex > -1 && category[petIndex]?.subType)
            setActivityType(category[petIndex].subType ? category[petIndex].subType : [])

    }, [petIndex])

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
                        <TouchableOpacity onPress={() => props.navigation.navigate('QrScan')} style={{ height: moderateScale(45), width: moderateScale(45) }}>

                            <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
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
                        padding: moderateScale(25),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setActivityPress(1)
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
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
                                    {category.length > 0 && category[petIndex].name ? category[petIndex].name : 'Select Activity'}

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
                            {showActivityCategory()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}

                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                marginTop: verticalScale(20),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',
                                marginStart: moderateScale(10)

                            }}
                        >
                            Pick Date
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                                setshowDatePicker(true)
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
                                    {valuePickDate ? moment(valuePickDate).format('DD MMM,YYYY') : ''}

                                </AutoSizeText>
                                <Image source={Icons.icon_material_date_range} resizeMode="contain" style={{ height: verticalScale(12), width: moderateScale(12) }} />

                            </View>
                        </TouchableOpacity>

                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                marginTop: verticalScale(20),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',
                                marginStart: moderateScale(10)

                            }}
                        >
                            Pick Time
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                                setShowBusTimings(true)
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
                                    {valuePickTime ? moment(valuePickTime).format('hh:mm A') : ''}

                                </AutoSizeText>
                                <Image source={Icons.icon_blue_clock} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(12) }} />


                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setActivityPress(0)
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                height: verticalScale(35),
                                marginTop: verticalScale(10),
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
                                    {activityIndex > 0 && activityType[activityIndex] ? activityType[activityIndex] : 'Select Activity Type'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <View style={{
                            ...styles.boxcontainer,
                            marginTop: verticalScale(10),
                            height: verticalScale(120),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateDesc ? 'white' : 'darkred',
                            shadowOpacity: 1,
                            padding: moderateScale(15),
                        }}>


                            <TextInput placeholder="Comments" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                                textAlignVertical: "top",
                                height: verticalScale(100),
                                paddingTop: verticalScale(0)
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

                        {getTimePicker()}
                        {getDatePicker()}

                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            marginTop: verticalScale(35), width: '100%'
                        }} onPress={() => { addScheduleActivities() }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: moderateScale(12),
                                paddingBottom: moderateScale(12),
                                ...styles.generalTxt
                            }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </View>);

    function addScheduleActivities() {

        let data = {};
        data.categoryId = category[petIndex]._id;
        data.categoryName = category[petIndex].name;
        data.categoryType = activityType[activityIndex] ? activityType[activityIndex] : '';
        data.assignToType = 'Animal'
        data.animalId = ["" + props.route.params.id + ""]
        data.date = moment(valuePickDate).format('YYYY-MM-DDThh:mm:ss')
        data.time = moment(valuePickTime).format('hh:mm A');
        data.description = valueDesc;
        addScheduleActivity(data)
    }

    function getTimePicker() {

        return (<DateTimePickerModal
            isVisible={showBusTimings}
            mode={'time'}
            date={valuePickTime ? new Date(valuePickTime) : new Date()}
            maximumDate={new Date()}
            onConfirm={(time) => {
                console.log('start-timing', time)
                setValuePickTime(time)
                setShowBusTimings(false)

            }}
            onCancel={() => { setShowBusTimings(false) }}
        />
        )
    }

    function getDatePicker() {

        return (<DateTimePickerModal
            isVisible={showDatePicker}
            mode={'date'}
            date={valuePickDate ? new Date(valuePickDate) : new Date()}
            minimumDate={new Date()}
            //maximumDate={new Date()}
            onConfirm={(time) => {
                console.log('start-timing', time)
                setValuePickDate(time)
                setshowDatePicker(false)

            }}
            onCancel={() => { setshowDatePicker(false) }}
        />
        )
    }

    function showActivityCategory() {
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
                        data={activityPress === 1 ? category : activityType}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (activityPress === 1)
                                            setPetIndex(index);
                                        else
                                            setActivityIndex(index);

                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={activityPress === 1 ?
                                                (index === petIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow) :
                                                index === activityIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{activityPress === 1 ? item.name : item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
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

export default CreateActivityView;