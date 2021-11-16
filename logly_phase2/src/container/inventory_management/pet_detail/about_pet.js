/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';

function AboutPetView(props) {


    const ANIMAL_BIO = [{
        category: 'Animal Id', value: '6152c5', bg: '#FEDDDA', txtColor: '#D04621'
    },
    { category: 'Breed', value: 'African Grey Parrot', bg: '#DED9FB', txtColor: '#5A40E2' },
    { category: 'sex', value: 'Male', bg: '#C9F7F3', txtColor: '#03CDB8' },
    { category: 'Animal Id', value: '6152c5', bg: '#ECD48E', txtColor: '#EFB714' }]

    const TABS = ["Archive", "Add New Activity", "QR Code"];

    const isTablet = DeviceInfo.isTablet();

    const [isFeatured, setIsFeatured] = useState(0)
    const [tabsSelect, setTabsSelect] = useState(0);

    return (
        <View style={{
            paddingStart: moderateScale(20)
        }}>
            <FlatList
                horizontal
                data={ANIMAL_BIO}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{

                    padding: moderateScale(20), paddingStart: 0
                }
                }
                renderItem={({ item, index }) => {

                    return (
                        <View style={{
                            backgroundColor: item.bg,
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(5),
                            height: isTablet ? verticalScale(105) : verticalScale(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: isTablet ? moderateScale(115) : moderateScale(95),
                            marginEnd: moderateScale(15),
                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: item.txtColor,
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.medium,
                                    marginBottom: verticalScale(10)
                                }}>{item.category}
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: item.txtColor,
                                    textAlign: 'center',
                                    width: '100%',
                                    paddingStart: moderateScale(4),
                                    paddingEnd: moderateScale(4),

                                }}>{item.value}
                            </AutoSizeText>
                        </View>

                    );
                }}

            />

            <View style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>

                <View style={{
                    backgroundColor: isFeatured === 0 ? '#021C41' : '#F5F5F5',
                    borderRadius: moderateScale(5),
                    height: verticalScale(25),
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: isTablet ? moderateScale(115) : moderateScale(95),
                    marginEnd: moderateScale(15),
                }} onPress={() => {
                    setIsFeatured(0);
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: isFeatured === 0 ? 'white' : '#464646',
                            paddingStart: moderateScale(2),
                            paddingEnd: moderateScale(2),
                            textAlign: 'center',
                            fontFamily: Fonts.type.medium,
                        }}>Featured
                    </AutoSizeText>
                </View>

                <View style={{
                    backgroundColor: isFeatured === 1 ? '#021C41' : '#F5F5F5',
                    borderRadius: moderateScale(5),
                    height: verticalScale(25),
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: isTablet ? moderateScale(115) : moderateScale(95),
                    marginEnd: moderateScale(5),
                }} onPress={() => {
                    setIsFeatured(1)
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: isFeatured === 1 ? 'white' : '#464646',
                            paddingStart: moderateScale(2),
                            paddingEnd: moderateScale(2),
                            textAlign: 'center',
                            fontFamily: Fonts.type.medium,
                        }}>Public
                    </AutoSizeText>
                </View>
            </View>

            <Text
                style={{
                    ...styles.generalTxt,
                    color: '#464646',
                    fontSize: moderateScale(14),
                    padding: moderateScale(20),
                    paddingBottom: moderateScale(10),
                    paddingStart: moderateScale(10),
                    fontFamily: Fonts.type.medium,
                }}>Summary Notes
            </Text>

            <Text
                style={{
                    padding: moderateScale(20),
                    paddingTop: 0,
                    paddingStart: moderateScale(10),
                    ...styles.generalTxt,
                    fontSize: moderateScale(12),
                    color: '#777777',
                }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            </Text>

            <FlatList
                data={TABS}
                numColumns={4}
                contentContainerStyle={{
                    paddingStart: 0,
                    padding: moderateScale(20), paddingTop: moderateScale(10)
                }}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity style={{
                            backgroundColor: tabsSelect === index ? '#FE8B19' : '#F5F5F5',
                            borderRadius: moderateScale(10),
                            height: verticalScale(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            marginEnd: moderateScale(5),
                        }} onPress={() => {
                            setTabsSelect(index)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: tabsSelect === index ? 'white' : '#464646',
                                    paddingStart: moderateScale(2),
                                    paddingEnd: moderateScale(2),
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.medium,
                                }}>{item}
                            </AutoSizeText>
                        </TouchableOpacity>

                    );
                }}

            />

            <TouchableOpacity style={{
                ...styles.styleButtons, flex: 0,
                margin: verticalScale(25),
                marginStart: 0,
                marginTop: verticalScale(15)
            }} onPress={() => { }}>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                }}>Share</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'transparent',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
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
        borderRadius: moderateScale(10)
    }
});

export default AboutPetView;