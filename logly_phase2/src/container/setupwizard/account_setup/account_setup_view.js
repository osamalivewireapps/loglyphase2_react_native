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


function AccountSetupView(props) {

    const { backScreen, stackComp, addStack, pageNumber, nextScreen, skipBtn } = props;
    let arrComp = stackComp;
    const pagerRef = useRef(null);
    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };

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
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0
                }}>
                <View flexDirection='row' width='100%'>
                    <TouchableOpacity style={{ flexDirection: 'row', width: '80%' }} onPress={(e) => backScreen(e)}>
                        <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                        <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={(e) => skipBtn(e)}>
                        <Text style={{ ...styles.generalTxt, marginStart: 5, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Skip</Text>
                        <Image source={Icons.icon_feather_arrow_right} style={{ marginTop: 0 }} />

                    </TouchableOpacity>
                </View>

                <View
                    marginTop={20} marginBottom={10}
                    flexDirection='row' width='100%' justifyContent='center' alignItems='center'>
                    <View style={{ backgroundColor: 'white', borderRadius: 50, height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...styles.generalTxt2, color: Colors.appBgColor, fontSize: 14 }}>1</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', width: 30, height: 1, marginStart: 5, marginEnd: 5 }} />
                    <View style={{ borderColor: 'white', borderWidth: 1, borderRadius: 50, height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...styles.generalTxt2, color: 'white', fontSize: 14 }}>2</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', width: 30, height: 1, marginStart: 5, marginEnd: 5 }} />
                    <View style={{ borderColor: 'white', borderWidth: 1, borderRadius: 50, height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...styles.generalTxt2, color: 'white', fontSize: 14 }}>3</Text>
                    </View>

                </View>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10, textAlign: 'center' }}>Account Setup</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10, textAlign: 'center' }}>Select your offered services</Text>
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 40
    },
    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }
});

export default AccountSetupView;