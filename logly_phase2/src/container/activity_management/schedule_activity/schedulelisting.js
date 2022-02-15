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
import DeviceInfo from 'react-native-device-info';
import { connect, useDispatch } from 'react-redux';
import { getScheduleData } from '../../../actions/ActivityManagement';
import { SectionList } from 'react-native';
import moment from 'moment';


function ScheduleListingView(props) {


    console.log('props schedule---->', props);

    const [listSchedule, setListSchedule] = useState([]);
    const { getSchData, filterSchedule } = props

    let dispatch = useDispatch();

    useEffect(() => {
        getSchData([])
        dispatch(getScheduleData())
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

    function getScheduleActivitiesList(response) {

        if (!response || response.length === 0)
            return;

        let tmp = [];
        let time = response[0].createdAt;
        let schData = response;

        if (response)
            console.log('schedule data-->', time);

        if (schData) {
            time = getTimeFormat(time)

            schData.forEach((element, index) => {


                console.log('time456--->', time)

                if (time.includes(getTimeFormat(element.createdAt))) {
                    console.log(`index${index} first--->`, time)
                    if (index === schData.length - 1) {
                        tmp.push({
                            title: time, data: schData.filter(value => time === getTimeFormat(value.createdAt))
                        })
                    }
                }
              
                else {
                    console.log(`index${index} second--->`, time)
                    tmp.push({
                        title: time, data: schData.filter(value => time === getTimeFormat(value.createdAt))
                    })
                    console.log('time data--->', tmp)
                    time = getTimeFormat(element.createdAt)

                    if (index === schData.length - 1) {
                        tmp.push({
                            title: time, data: schData.filter(value => time === getTimeFormat(value.createdAt))
                        })
                    }
                }
            });
            setListSchedule(tmp)
        }

    }
    return (
        <View>

            <SectionList
                sections={listSchedule}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('EditScheduleActivity', { data: item, updateList: () => { dispatch(getScheduleData()) } })}

                            style={{
                                backgroundColor: '#F5F5F5',
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
                                        color: '#777777',

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
                                        color: '#232323',

                                    }}
                                >
                                    {moment(item.createdAt).format('DD MMM, hh:mm:ss A')}
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
            />

        </View>
    );

    function getTimeFormat(time){
        let tmp = moment(time).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Upcoming]',
            lastDay: '[Yesterday]',
            lastWeek: '[Past]',
            sameElse: '[Past]'

        })
        console.log('tmp-->',tmp)
        return tmp;
    }
}


const mapStateToProps = ({ activitymanagment }) => {

    return {
        scheduleListing: activitymanagment.activityListing,
    };
};

export default connect(mapStateToProps)(ScheduleListingView);