/* eslint-disable no-unreachable */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Share, Alert, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

function AboutPetView(props) {

    const { animalData,route } = props;



    const ANIMAL_BIO = [{
        category: 'Animal Id', value: '', bg: '#FEDDDA', txtColor: '#D04621',
    },
    { category: 'Breed', value: '', bg: '#DED9FB', txtColor: '#5A40E2' },
    { category: 'sex', value: '', bg: '#C9F7F3', txtColor: '#03CDB8' },
    { category: 'DOB', value: '', bg: '#ECD48E', txtColor: '#EFB714' }];

    const TABS = ["Add New Activity", "QR Code"];

    const isTablet = DeviceInfo.isTablet();

    const [isFeatured, setIsFeatured] = useState(0);
    const [tabsSelect, setTabsSelect] = useState(0);


    return (

        <View style={{
            paddingStart: moderateScale(20),
        }}>

            {console.log("animalData--->", props)}
            {console.log("ANIMAL--->", ANIMAL_BIO[1].value)}
            <FlatList
                horizontal
                data={ANIMAL_BIO}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{

                    padding: moderateScale(20), paddingStart: 0,
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
                                    marginBottom: verticalScale(10),
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

                                }}>{getAnimalValues(item.category)}

                            </AutoSizeText>
                        </View>

                    );
                }}

            />

           
                

               
            {animalData?.featured ?
            <Text
                style={{
                    ...styles.generalTxt,
                    color: 'green',
                    fontSize: moderateScale(14),
                    paddingBottom: moderateScale(15),
                    paddingTop: moderateScale(5),
                    paddingStart: moderateScale(10),
                    fontFamily: Fonts.type.medium,
                }}>Featured
            </Text> : null}
                

         {!animalData?.isPrivate ?
            <Text
                style={{
                    ...styles.generalTxt,
                    color: '#464646',
                    fontSize: moderateScale(14),
                    paddingStart: moderateScale(10),
                    fontFamily: Fonts.type.medium,
                }}>Public
            </Text> : null}
         
            <Text
                style={{
                    ...styles.generalTxt,
                    color: '#464646',
                    fontSize: moderateScale(14),
                    padding: moderateScale(20),
                    paddingTop: moderateScale(15),
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
                }}>{animalData.data?.Notes}
            </Text>

            <FlatList
                data={TABS}
                numColumns={4}
                contentContainerStyle={{
                    paddingStart: moderateScale(40),
                    paddingEnd:moderateScale(40),
                    padding: moderateScale(20), paddingTop: moderateScale(10),
                }}
                renderItem={({ item, index }) => {

                    return (
                        <TouchableOpacity style={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10),
                            height: verticalScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            marginEnd: moderateScale(5),
                        }} onPress={() => {
                            setTabsSelect(index);
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#464646',
                                    paddingStart: moderateScale(2),
                                    paddingEnd: moderateScale(2),
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
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
                marginTop: verticalScale(15),
            }} onPress={() => { ShareProfile()}}>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                }}>Share</Text>
            </TouchableOpacity>
        </View>
    );

    function getAnimalValues(category) {
        switch (category) {
            case 'Animal Id':
                return route.params.id;

            case 'Breed':
                return animalData.data?.breed[0];

            case 'sex':
                return animalData.data?.Sex;
            default:
                return moment(animalData.data?.DOB).format('DD MMM YYYY');

        }

    }

    function messagefunc(){
        if (Platform.OS === "ios") {
            return `Logly (See Animal Profile)`;
        }
        else {
            return `Logly (See Animal Profile) \n \n https://logly.us/animalProfile/${animalData._id}`;
        }
    };

     async function ShareProfile(){
        try {
            const result = await Share.share({
                subject: 'Logly',
                title: 'Logly',
                message: messagefunc(),
                url: `https://logly.us/animalProfile/${animalData._id}`,
            },
            );
        } catch (error) {
            Alert.alert(error.message);
        }
    }
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
        width: '100%',
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base,
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(10),
    },
});

export default AboutPetView;
