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

    const { searchData, globalSearch } = props;

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
                            searchData(e)
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
                            height: verticalScale(30),
                            ...styles.generalTxt,
                        }} />
                    <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10) }} />

                </View>
            </View>

            <View style={{ backgroundColor: '#707070', width: '100%', height: verticalScale(0.5) }} />
            <View style={{ padding: moderateScale(25), paddingTop: 0 }}>

                {/* <FlatList
                    contentContainerStyle={{
                        padding: moderateScale(25),
                        paddingBottom: verticalScale(80)
                    }}
                    data={globalSearch}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('ContactDetails', { id: item._id, updateContacts: updateContacts })}

                                style={{
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    height: verticalScale(50),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingEnd: moderateScale(0)

                                }}>
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
                                                paddingEnd: moderateScale(10),
                                                color: '#464646',
                                                marginTop: verticalScale(5)
                                            }}>{item.phone.length > 0 ? item.phone[0] : ''}
                                        </AutoSizeText>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(10)}
                                            fontSize={moderateScale(12)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                fontFamily: Fonts.type.base,
                                                paddingEnd: moderateScale(10),
                                                color: item.category === VET_ID ? listBorderColors[0] : listBorderColors[1],
                                                marginTop: verticalScale(5)
                                            }}>{item.category === VET_ID ? 'Veterinary' : 'Vendor'}
                                        </AutoSizeText>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.id}

                /> */}

            </View>
 
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
