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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles';
import { getBreederListSimple, getBreederForSale } from '../../../actions/Sales';
import { useDispatch } from 'react-redux';
import moment from 'moment';

function CustomersCRMView(props) {

    const ACTIVITY_TYPE = ['All Time', 'Today', 'This Week', 'Yesterday', 'Last Week']
    const [searchTxt, setSearchTxt] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);

    const sheetRef = useRef(null);

    const [customerList, setCustomerList] = useState([]);
    const [orgCustomerList, setOrgCustomerList] = useState([]);

    let dispatch = useDispatch();


    useEffect(() => {
        dispatch(getBreederListSimple()).then((response) => {
            setOrgCustomerList(response.payload)
            setCustomerList(response.payload);
        })
    }, []);

    useEffect(() => {
        if (searchTxt.length >= 3) {
            getGlobalTeamMembers();
        } else if (searchTxt.length === 0) {
            setCustomerList(orgCustomerList);
        }
    }, [searchTxt]);

    function getGlobalTeamMembers() {
        dispatch(getBreederForSale(searchTxt)).then((response) => {
            setCustomerList(response.payload)
        });
    }

    return (

        <View style={{ height: '100%' }}>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', 
                borderRadius: moderateScale(10),
                marginBottom:verticalScale(10)
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
                        ...CRMStyles.generalTxt,
                        color: '#777777',
                        fontSize: moderateScale(14),
                    }} />
                <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

            </View>

            <FlatList
                keyboardShouldPersistTaps='handled'
                data={customerList}
                contentContainerStyle={{
                    marginTop: verticalScale(0),
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('CRMCustomerDetail', { id: item._id, customerInfo: item })}
                            style={{
                                backgroundColor: '#F5F5F5',
                                padding: moderateScale(5),
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(10),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: verticalScale(12),
                                paddingBottom: verticalScale(12)
                            }}>

                            <View style={{
                                flex: 0.9,
                                marginStart: moderateScale(12)
                            }}>

                                <View style={{
                                    flexDirection: 'row',

                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_user} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: Colors.appBgColor,
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        {item.name}
                                    </AutoSizeText>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_email} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#A1A1A1',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        {item.email}
                                    </AutoSizeText>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_phone} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#A1A1A1',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        {item.phone}
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_location} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#A1A1A1',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        {item.city + ", " + item.state}
                                    </AutoSizeText>

                                </View>



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

            />
        </View>

    );


}


export { CustomersCRMView };