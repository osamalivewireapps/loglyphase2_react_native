/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { RefreshControl, TextInput, FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

import { CommonActions } from '@react-navigation/routers';
import moment from 'moment';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { VET_ID } from '../../../constants';
import Util from '../../../utils';
import { SectionList } from 'react-native';

function NotificationListingView(props) {

    const [notificationList, setNotificationList] = useState([]);

    const isTablet = Platform.isTV;

    const { listNotify, updateContacts, removeNotification } = props;

    const [isEditShow, setEditShow] = useState(-1);

    let today = moment().format('YYYY-MM-DD');

    useEffect(() => {
        if (listNotify.length === 0)
            return
        let listToday = listNotify.filter((value) => moment(value.updatedAt.includes('Z') ?
            value.updatedAt.substring(0, value.updatedAt.length - 1) :
            value.updatedAt).format('YYYY-MM-DD').includes(today));

        let listFuture = listNotify.filter((value) => moment(value.updatedAt.includes('Z') ?
            value.updatedAt.substring(0, value.updatedAt.length - 1) :
            value.updatedAt).format('YYYY-MM-DD').includes(today) === false);

        let tmp = [];
        if (listToday.length > 0)
            tmp.push({
                title: 'Today', data: listToday
            })

        if (listFuture.length > 0)
            tmp.push({
                title: 'Earlier', data: listFuture
            })
        setNotificationList(tmp);
        setRefreshing(false);
    }, [listNotify]);


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        updateContacts();
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{ padding: moderateScale(25), flexDirection: 'row', alignItems: 'center', paddingTop: verticalScale(10), paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                    <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                </TouchableOpacity>

                <AutoSizeText
                    numberOfLines={2}
                    minFontSize={moderateScale(18)}
                    fontSize={moderateScale(22)}
                    mode={ResizeTextMode.overflow_replacement}
                    style={{
                        color: Colors.appBgColor,
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium
                    }}>
                    Notifications

                </AutoSizeText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                        <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{ flex: 1 }}>



                <SectionList
                    stickySectionHeadersEnabled={false}
                    sections={notificationList}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={{
                        paddingBottom: verticalScale(50)
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item, index, section }) => {
                        return (
                            getFriendItem(item, index, section)
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <View>
                            <View style={{
                                width: '100%', height: verticalScale(5),
                                marginTop: verticalScale(10),
                            }} />
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: 'black',
                                    marginTop: verticalScale(10),
                                    marginBottom:verticalScale(10),
                                    marginStart: moderateScale(25)

                                }}
                            >
                                {title}
                            </AutoSizeText>
                        </View>
                    )}

                />




            </View>

            
        </View>

    );

    function getFriendItem(item, index, section) {

        console.log("image--->", item.image);

        return (
            <TouchableOpacity

                //onPress={() => props.navigation.navigate('MemberDetails', { id: item._id, updateContacts: updateContacts })}
                style={{
                    height: verticalScale(60),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingStart: moderateScale(25),
                    paddingEnd: moderateScale(25),
                    backgroundColor: item.status.toLowerCase().includes('read') ? 'white' :'#ECE6FF'

                }}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: verticalScale(50), width: moderateScale(60)
                }} >

                    <ImagePlaceholder
                        showActivityIndicator={false}
                        activityIndicatorProps={{
                            size: 'small',
                            color: '#777777',
                        }}
                        resizeMode='cover'
                        placeholderStyle={{
                            width: moderateScale(50),
                            height: moderateScale(50),
                            borderRadius: moderateScale(50),

                        }}
                        imgStyle={{
                            borderRadius: moderateScale(50),
                            borderColor: 'transparent',
                            borderWidth: moderateScale(2),
                            width: moderateScale(50),
                            height: moderateScale(50),
                        }}

                        style={{
                            borderRadius: moderateScale(50),
                            height: moderateScale(50),
                        }}

                        src={item.image ? item.image : ''}
                        placeholder={Images.img_user_placeholder}
                    />
                </View>

                <View style={{
                    flex: 1,
                    marginStart: moderateScale(15),
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            paddingEnd: moderateScale(10),
                            color: Colors.appBgColor
                        }}>{item.title}
                    </AutoSizeText>
                    <View style={{ flexDirection: 'row' }}>

                        <AutoSizeText
                            numberOfLines={3}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                paddingEnd: moderateScale(10),
                                color: '#464646',
                                marginTop: verticalScale(0)
                            }}>{item.description}{'\n'}{section.title === 'Today' ? moment(item.updatedAt.substring(0, item.updatedAt.length - 1)).startOf('day').fromNow() : moment(item.updatedAt.substring(0, item.updatedAt.length - 1)).format('ddd hh:mm A')}
                        </AutoSizeText>
                    </View>

                </View>

                {isEditShow === index ?
                    <View style={{
                        height: verticalScale(20),
                        flex: moderateScale(0.145),
                        marginTop: 0,
                        marginBottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageBackground
                            source={Images.img_popup_services}
                            style={{
                                position: 'absolute', height: '100%',
                                width: '100%'
                            }} />
                        {/* <TouchableOpacity
                            flex={moderateScale(0.1)}
                            style={{
                                justifyContent: 'center', width: '90%', height: verticalScale(15),
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                setEditShow(-1)
                                props.navigation.navigate('AddTeamMember', { contactData: item, updateContacts: updateContacts, isTransfer: false })
                            }}>
                            <Image source={Icons.icon_services_edit}
                                resizeMode='contain' style={{
                                    marginEnd: moderateScale(2), height: verticalScale(10), width: moderateScale(15)
                                }}

                            />
                        </TouchableOpacity> */}
                        {/* <View style={{
                            width: '50%',
                            height: verticalScale(0.5),
                            backgroundColor: '#585858',
                            marginEnd: moderateScale(5),
                            marginTop: verticalScale(8),
                            marginBottom: verticalScale(8)
                        }} /> */}
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            style={{
                                justifyContent: 'center', width: '90%', height: verticalScale(15),
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setEditShow(-1)
                                removeNotification(item._id);
                            }}>
                            <Image source={Icons.icon_services_delete}
                                resizeMode='contain'
                                style={{
                                    marginEnd: moderateScale(3),
                                    height: verticalScale(12),
                                    width: moderateScale(15)
                                }} />
                        </TouchableOpacity>
                    </View> : <View flex={moderateScale(0.1)} />}

                <TouchableOpacity
                    style={{ width: moderateScale(20), height: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}

                    onPress={() => {
                        isEditShow === index ? setEditShow(-1) : setEditShow(index)
                    }}>
                    <Image source={Icons.icon_three_colons}
                        resizeMode='contain' style={{ height: verticalScale(12), width: moderateScale(12) }}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
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

export default NotificationListingView;