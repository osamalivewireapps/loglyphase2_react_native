/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { TextInput, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../theme';
import DeviceInfo from 'react-native-device-info';


function SearchView(props) {

    const [searchTxt, setSearchTxt] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                padding: moderateScale(25),
                paddingBottom: moderateScale(10),
                flexDirection: 'row', alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                    <Image source={Icons.icon_black_arrow} resizeMode='contain' style={{ height: moderateScale(20), width: moderateScale(20) }} />
                </TouchableOpacity>
                <View style={{
                    marginStart: moderateScale(10),
                    flex: 1, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(25)
                }}>

                    <TextInput
                        onChangeText={(e) => {
                            setSearchTxt(e)
                        }}
                        value={searchTxt}
                        placeholder='Search'
                        numberOfLines={1}
                        keyboardType='default'
                        style={{
                            keyboardShouldPersistTaps: true,
                            flex: 0.9,
                            height: verticalScale(30),
                            ...styles.generalTxt,
                        }} />
                    <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10) }} />

                </View>
            </View>

            <View style={{ backgroundColor: '#707070', width: '100%', height: verticalScale(0.5) }} />
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ padding: moderateScale(25), paddingTop: 0 }}>


                </View>
            </ScrollView>

        </View>)

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
        color: '#464646',
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

export default SearchView;
