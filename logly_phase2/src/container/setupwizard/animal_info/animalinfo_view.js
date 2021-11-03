/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from "react";
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { Platform } from 'react-native';
import { Button } from 'react-native';
import ChooseServices from "../services";
import ViewPager from '@react-native-community/viewpager';
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { TYPES_OF_SERVICES } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const AnimalCategories = ["Dog", "Cat", "Horse", "Parrot", "Deer", "Rabbit"];

function AnimalInfoView(props) {

    const { backScreen, stackComp, nextScreen, skipBtn, selectedServices, addServices} = props;
    const pagerRef = useRef(null);
   
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(30),
                    borderBottomRightRadius: moderateScale(30),
                    padding: moderateScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: moderateScale(40),
                    flex: 0
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                        <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-1) }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={(e) => skipBtn(e)}>
                        <Text style={{ ...styles.generalTxt, marginStart: moderateScale(5), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-8) }}>Skip</Text>
                        <Image source={Icons.icon_feather_arrow_right} style={{ marginTop: 0, height: verticalScale(12), width: moderateScale(48) }} resizeMode='contain' />

                    </TouchableOpacity>
                </View>

                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10), textAlign: 'center' }}>Animal Info</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10), textAlign: 'center' }}>Select the animals you love</Text>
            </View>
            <View style={{padding:moderateScale(30),flex:1}}>
            <FlatList
                numColumns={2}
                data={AnimalCategories}
                style={{}}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{
                            backgroundColor: isSelectService(selectedServices, index, item) ? '#FFC081' : '#F5F5F5',
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(20),
                            flex: 1,
                            height: verticalScale(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginStart: (index % 2) === 0 ? 0 : moderateScale(10),
                        }} onPress={() => addServices({
                            type: item,
                            isSelect: selectedServices.length === 0 ? true : !isSelectService(selectedServices, index, item),
                            index: index
                        })}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: Colors.appBgColor,
                                }}>{item}
                            </AutoSizeText>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id}

            />

            <TouchableOpacity style={{
                ...styles.styleButtons, flex: 0,
                marginTop: verticalScale(35)
            }} onPress={() => { nextScreen() }}>
                <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                    ...styles.generalTxt
                }}>NEXT</Text>
            </TouchableOpacity>

            </View>
        </View>
    )

    function isSelectService(selectedServices, index, item) {

        let itemService = selectedServices.find(e => e.type === item);
        if (itemService) {
            return itemService.isSelect;
        } else {
            return false;
        }
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
        height: moderateScale(40),
        backgroundColor: '#F5F5F5',
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        marginTop: verticalScale(2),
        width: '100%'
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(18),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, 
        borderRadius: moderateScale(30)
    }
});

export default AnimalInfoView;