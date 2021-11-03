/* eslint-disable react-hooks/exhaustive-deps */
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
import AnimalCategories from "../animals_category";
import AddNewServices from "../add_new_services";
import DataHandler from "../../../utils/DataHandler";
import { BUS_LISTING, BUS_SER_PROVIDER } from "../../../constants";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function AccountSetupView(props) {

    const { accountType,backScreen, stackComp, addStack, pageNumber, nextScreen, skipBtn } = props;
    
    let arrComp = stackComp;
    
    const pagerRef = useRef(null);
    
    useEffect(() => {
        setTimeout(()=>{
            pagerRef.current.setPage(pageNumber)

        },0);

    });

   

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(30),
                    flex: 0
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row',width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                        <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-1) }}>Back</Text>
                    </TouchableOpacity>
                    {accountType === BUS_SER_PROVIDER || accountType === BUS_LISTING?
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={(e) => skipBtn(e)}>
                            <Text style={{ ...styles.generalTxt, fontSize: moderateScale(18), marginStart: moderateScale(5), marginTop: Platform.OS === 'android' ? verticalScale(-2) : verticalScale(-8) }}>Skip</Text>
                            <Image source={Icons.icon_feather_arrow_right} style={{ marginTop: 0, height: verticalScale(12), width: moderateScale(48) }} resizeMode='contain' />

                    </TouchableOpacity>:<View/>}
                </View>

                {accountType === BUS_SER_PROVIDER ?
                <View
                        marginTop={verticalScale(20)} marginBottom={verticalScale(10)}
                    flexDirection='row' width='100%' justifyContent='center' alignItems='center'>
                        <View style={{ backgroundColor: 'white', borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: Colors.appBgColor, fontSize: moderateScale(14) }}>1</Text>
                    </View>
                        <View style={{ backgroundColor: 'white', width: moderateScale(30), height: verticalScale(1), marginStart: moderateScale(5), marginEnd: moderateScale(5) }} />
                        <View style={{ borderColor: 'white', borderWidth: moderateScale(1), borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: 'white', fontSize: moderateScale(14) }}>2</Text>
                    </View>
                        <View style={{ backgroundColor: 'white', width: moderateScale(30), height: verticalScale(1), marginStart: moderateScale(5), marginEnd: moderateScale(5) }} />
                        <View style={{ borderColor: 'white', borderWidth: moderateScale(1), borderRadius: moderateScale(50), height: moderateScale(25), width: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...styles.generalTxt2, color: 'white', fontSize: moderateScale(14) }}>3</Text>
                    </View>

                </View>:<View/>}
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10), textAlign: 'center' }}>Account Setup</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10), textAlign: 'center' }}>Select animal categories you deal with</Text>
            </View>
            <ViewPager style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>
                {arrComp.length > 1 ? arrComp.map((value, index) => {
                    console.log("type--->")
                    return (
                        <View key={index}>
                            {(value.type === 'Animal' || value.type === 'Services') ?
                                (
                                    value.type === 'Animal' ?
                                        <AnimalCategories forwardScreen={(e) => nextScreen(e)} type={value.name} /> :
                                        <AddNewServices forwardScreen={(e) => nextScreen(e)} type={value.name}/>
                                )
                                : <ChooseServices choseServices={(e) => { addStack(e) }} />}
                        </View>

                    );
                }) : <View key={0}>
                    <ChooseServices choseServices={(e) => { addStack(e) }} />
                </View>
                }
        
            </ViewPager>

        </View>
    )

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
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(40),
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
        backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30)
    }
});

export default AccountSetupView;