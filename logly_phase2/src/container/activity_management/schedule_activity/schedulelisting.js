/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { connect, useDispatch } from 'react-redux';
import { getScheduleData } from '../../../actions/ActivityManagement';
import { SectionList } from 'react-native';
import moment from 'moment';
import { values } from 'lodash';
import { RESET_SCHEDULING_LISTING } from '../../../actions/ActionTypes';


function ScheduleListingView(props) {


    console.log('props schedule---->', props);

    const [listSchedule, setListSchedule] = useState([]);
    const { getSchData, filterSchedule } = props

    let dispatch = useDispatch();

    useEffect(() => {
        getSchData([])
        dispatch(getScheduleData())
    },[])
   
    useEffect(() => {
        return (() => {
            setListSchedule([])
            getSchData([]);
            dispatch({ type: RESET_SCHEDULING_LISTING})
        })
    }, []);

    useEffect(() => {
        if (props.scheduleListing) {
            getSchData(props.scheduleListing.payload)
            getScheduleActivitiesList(props.scheduleListing.payload);
        }
           
    }, [props.scheduleListing]);

    useEffect(() => {
        getScheduleActivitiesList(filterSchedule)
    }, [filterSchedule]);

    let today = moment().format('ddd');
    let tomorrow = moment().add(1, 'days').format('ddd');
    let currentMonth = moment().format('MMM');
    let currentYear = moment().format('YYYY');
    let futureDay = moment().add(2, 'days').format('ddd');

    let thirdDayList = [];
    function getScheduleActivitiesList(response) {

        if (!response || response.length === 0)
            return;


        let listToday = response.filter((value) => value.period.toLowerCase().includes('daily'));
        let listTommorow = listToday.concat([]);
        let listFuture = listToday.concat([]);
        thirdDayList = listToday.concat([]);

        response.forEach(value => {
            if (value.period.toLowerCase().includes('weekly')) {
                pushDataByDay(value, listToday, listTommorow, listFuture)
            }
            else if (value.period.toLowerCase().includes('monthly')) {
                if (value.months.includes(currentMonth)) {
                    pushDataByDay(value, listToday, listTommorow, listFuture)
                } else
                    listFuture.push(value)
            }
            else if (value.period.toLowerCase().includes('yearly')) {
                if (value.years.includes(currentYear)) {
                    if (value.months.includes(currentMonth)) {
                        pushDataByDay(value, listToday, listTommorow, listFuture)
                    } else
                        listFuture.push(value)
                } else {
                    listFuture.push(value)
                }
            }
        });
        let tmp = [];

        if (listToday.length > 0)
            tmp.push({
                title: 'Today', data: listToday
            })

        if (listTommorow.length > 0)
            tmp.push({
                title: 'Tomorrow', data: listTommorow
            })
        if (thirdDayList.length > 0)
            tmp.push({
                title: moment().add(2, 'days').format('dddd'), data: thirdDayList
            })
        setListSchedule(tmp)
    }

    function pushDataByDay(value, listToday, listTommorow, listFuture) {
        if (value.days.find(days => days.includes(today))) {
            listToday.push(value);
        } else if (value.days.find(days => days.includes(tomorrow))) {
            listTommorow.push(value)
        }
        else if (value.days.find(days => days.includes(futureDay))) {
            thirdDayList.push(value)
        }
        else {
            listFuture.push(value)
        }
    }
    return (
        <View style={{ height: '100%' }}>
            {listSchedule.length>0?
            <SectionList
                stickySectionHeadersEnabled={false}
                sections={listSchedule}
                keyExtractor={(item, index) => item + index}
                contentContainerStyle={{
                    paddingBottom: verticalScale(50)
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('EditScheduleActivity', { data: item, updateList: () => { dispatch(getScheduleData()) } })}

                            style={{
                                backgroundColor: item.isPerformed ? '#FFE7CF' : '#BCFCD8',
                                padding: moderateScale(5),
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(10),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: verticalScale(12),
                                paddingBottom: verticalScale(12),
                                marginStart: moderateScale(25),
                                marginEnd: moderateScale(25)
                            }}>

                            <View style={{
                                flex: 0.9,
                                marginStart: moderateScale(12)
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: item.isPerformed ? '#E57301' : '#097D3B',

                                    }}
                                >
                                    {item.categoryName + (item.categoryType ? ', ' + item.categoryType : '')}
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: item.isPerformed ? '#E57301' : '#097D3B',

                                    }}
                                >
                                    {item.time}
                                    {/* {moment(item.createdAt).format('DD MMM, hh:mm:ss A')} */}
                                </AutoSizeText>


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
                renderSectionHeader={({ section: { title } }) => (
                    <View>
                        <View style={{
                            width: '100%', height: verticalScale(5),
                            marginTop: verticalScale(10),
                            backgroundColor: '#F5F5F5'
                        }} />
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: 'black',
                                marginTop: verticalScale(10),
                                marginStart: moderateScale(25)

                            }}
                        >
                            {title}
                        </AutoSizeText>
                    </View>
                )}
            />:<View/>}

        </View>
    );

    function getTimeFormat(time) {
        let tmp = moment(time).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Upcoming]',
            lastDay: '[Yesterday]',
            lastWeek: '[Past]',
            sameElse: '[Past]'

        })
        console.log('tmp-->', tmp)
        return tmp;
    }
}


const mapStateToProps = ({ activitymanagment }) => {

    return {
        scheduleListing: activitymanagment.activityListing,
    };
};

export default connect(mapStateToProps)(ScheduleListingView);