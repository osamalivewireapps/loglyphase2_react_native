/* eslint-disable no-trailing-spaces */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { FlatList, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, Keyboard } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { TextInput } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors, Fonts, Images } from "../../theme";


export default function SearchResults(props) {

    const { searchData, addSearch, navigateScreen } = props;
    const [tabs, setTab] = useState(0);

    console.log('search result--->', props)

    useEffect(() => {
        getInnerScreens();
    }, [tabs])


    useEffect(() => {

        setTab(tabs)
    }, [searchData])

    return (
        <View style={{ flex: 1 }}>
            <View>
                <ScrollView horizontal keyboardShouldPersistTaps='handled'
                showsHorizontalScrollIndicator={false}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: verticalScale(0),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setTab(0)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>All</Text>

                            {tabs === 0 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                        <View
                            style={{
                                backgroundColor: 'transparent',
                                width: 1,
                                marginStart: moderateScale(10),
                                marginEnd: moderateScale(10),
                                height: verticalScale(10),
                                marginBottom: verticalScale(5)
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setTab(1)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>Business</Text>
                            {tabs === 1 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                        <View
                            style={{
                                backgroundColor: 'transparent',
                                width: 1,
                                marginStart: moderateScale(10),
                                marginEnd: moderateScale(10),
                                height: verticalScale(10),
                                marginBottom: verticalScale(5)
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setTab(2)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>Pet Lovers</Text>
                            {tabs === 2 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                        <View
                            style={{
                                backgroundColor: 'transparent',
                                width: 1,
                                marginStart: moderateScale(10),
                                marginEnd: moderateScale(10),
                                height: verticalScale(10),
                                marginBottom: verticalScale(5)
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setTab(3)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>Animals</Text>
                            {tabs === 3 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                        <View
                            style={{
                                backgroundColor: 'transparent',
                                width: 1,
                                marginStart: moderateScale(10),
                                marginEnd: moderateScale(10),
                                height: verticalScale(10),
                                marginBottom: verticalScale(5)
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setTab(4)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>Products</Text>
                            {tabs === 4 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                        <View
                            style={{
                                backgroundColor: 'transparent',
                                width: 1,
                                marginStart: moderateScale(10),
                                marginEnd: moderateScale(10),
                                height: verticalScale(10),
                                marginBottom: verticalScale(5)
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setTab(5)
                            }
                            }
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                ...styles.generalTxt,
                                textAlign: 'center',
                                color: '#464646',
                                fontSize: moderateScale(14),
                                marginBottom: verticalScale(5)
                            }}>Charity</Text>
                            {tabs === 5 ? getHorizontalLine() : <View />}
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#DCDCDC',
                    height: verticalScale(2),
                    marginBottom: verticalScale(10)
                }}
            />
            <View>


                {getInnerScreens()}

            </View>
        </View>);

    function getInnerScreens() {

        let tmp = [];

        switch (tabs) {
            case 0:
                tmp = searchData;
                break;
            case 1:
                tmp = searchData.filter(value => value.type.toLowerCase().includes('business'));
                break;


            case 2:
                tmp = searchData.filter(value => value.type.toLowerCase().includes('pet lover'));
                break;


            case 3:
                tmp = searchData.filter(value => value.type.toLowerCase().includes('animal'));
                break;

            case 4:
                tmp = searchData.filter(value => value.type.toLowerCase().includes('product'));
                break;

            case 4:
                tmp = searchData.filter(value => value.type.toLowerCase().includes('charity'));
                break;


        }

        if (tmp.length > 0) {
            return (
                <FlatList
                    contentContainerStyle={{
                        paddingBottom: verticalScale(80)
                    }}
                    data={tmp}
                    renderItem={({ item, index }) => {
                        return (
                            getFriendItem(item, index)
                        )
                    }}

                />
            )
        } else {
            return (
                <View
                    style={{
                        ...styles.generalTxt,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>No Data found</Text>
                </View>
            )

        }


    }

    function getFriendItem(item, index) {


        return (
            <TouchableOpacity

                onPress={() => navigateScreen(item)}
                style={{
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(5),
                    height: verticalScale(50),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingEnd: moderateScale(0)

                }}>


                <View style={{
                    flex: 1,
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            paddingStart: moderateScale(20),
                            paddingEnd: moderateScale(20),
                            color: Colors.appBgColor
                        }}>{item.name}
                    </AutoSizeText>
                    <View style={{ flexDirection: 'row' }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                paddingStart: moderateScale(20),
                                paddingEnd: moderateScale(20),
                                color: '#464646',
                                marginTop: verticalScale(5),
                                marginBottom: verticalScale(10)
                            }}>{item.type}
                        </AutoSizeText>
                    </View>

                    <View style={{ backgroundColor: '#707070', width: '100%', height: verticalScale(0.5) }} />
                </View>




            </TouchableOpacity>
        )
    }

    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: Colors.appBgColor,
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
        )
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
        fontFamily: Fonts.type.base
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
