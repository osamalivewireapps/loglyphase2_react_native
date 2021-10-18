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

function BusListingView(props) {

    const { backScreen, dealAnimalProduct, nextScreen, skipBtn, addServices } = props;

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

                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10, textAlign: 'center' }}>Listing Service</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10, textAlign: 'center' }}>Select one of these below</Text>
            </View>
            <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
                <View>
                    <TouchableOpacity

                        style={{
                            backgroundColor: dealAnimalProduct ? '#FFC081' : '#F5F5F5',
                            borderRadius: 10,
                            marginTop: 20,
                            height:50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => addServices(true)}>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: Colors.appBgColor
                            }}>I Deal in Animals / Animal Products
                        </AutoSizeText>
                        
                    </TouchableOpacity>

                    <TouchableOpacity

                        style={{
                            backgroundColor: !dealAnimalProduct ? '#FFC081' : '#F5F5F5',
                            borderRadius: 10,
                            marginTop: 20,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => addServices(false)}>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: Colors.appBgColor
                            }}>I Deal in Animal Services
                        </AutoSizeText>

                    </TouchableOpacity>
                    
                </View>

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: 35
                }} onPress={() => { nextScreen() }}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingStart: 127, paddingEnd: 127,
                        paddingTop: 15, paddingBottom: 15,
                        ...styles.generalTxt
                    }}>NEXT</Text>
                </TouchableOpacity>

            </View>
        </View>

    );



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

export default BusListingView;