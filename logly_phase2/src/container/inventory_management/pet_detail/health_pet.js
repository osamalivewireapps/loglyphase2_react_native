/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import ImagePlaceholder from '../../../components/ImagePlaceholder';

function HealthPetView(props) {

    const { healthRecord } = props.animalData;

    const [arrHealthRecord, setArrHealthRecord] = useState([]);

    const [initialPg, setInitialPg] = useState(0);

    useEffect(() => {
        setArrHealthRecord(healthRecord)

    }, [healthRecord])

    return (
        <View style={{
            flexDirection: 'column',
            paddingStart: moderateScale(20),
            height: Dimensions.get('screen').height / 2,
            paddingBottom: verticalScale(30)

        }}>

            <View style={{
                ...styles.boxcontainer,
                marginTop: verticalScale(20),
                marginBottom: 0, width: '90%', flexDirection: 'row',
            }}>

                <TouchableOpacity
                    style={{
                        width: '50%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(10),
                        backgroundColor: initialPg === 0 ? '#FFC081' : 'transparent',
                    }}
                    onPress={() => {
                        setInitialPg(0)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                    }}>
                        Health Record
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(10),
                        backgroundColor: initialPg === 1 ? '#FFC081' : 'transparent',
                    }}
                    onPress={() => {
                        setInitialPg(1)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                    }}>
                        Vaccination History
                    </Text>
                </TouchableOpacity>
            </View>



            {arrHealthRecord.length > 0 ? arrHealthRecord.map((item) => {
                return (
                    <View style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(10),
                        marginEnd: moderateScale(35),
                        height: verticalScale(60),
                        flexDirection: 'row',
                        padding: moderateScale(10)

                    }} onPress={() => {

                    }}>

                        <ImagePlaceholder
                            showActivityIndicator={false}
                            activityIndicatorProps={{
                                size: 'small',
                                color: '#777777',
                            }}
                            resizeMode='cover'
                            placeholderStyle={{
                                height: '100%',
                                width: '100%',
                                borderWidth: moderateScale(1),
                                borderColor: Colors.appBgColor,
                                borderRadius: moderateScale(8)

                            }}
                            imgStyle={{
                                height: '100%',
                                width: '100%',
                                borderWidth: moderateScale(1),
                                borderColor: Colors.appBgColor,
                                borderRadius: moderateScale(8)
                            }}

                            style={{
                                flex: 0.2,
                            }}

                            src={item.type.toLowerCase().startsWith('image') ? item.filename: Icons.icon_file_pdf}
                            placeholder={Icons.icon_paw}
                        />


                        <View style={{
                            flex: 0.6,
                            justifyContent: 'center'
                        }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10),
                                    color: Colors.appBgColor
                                }}>{item.fileNamed}
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    fontFamily: Fonts.type.base,
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10),
                                    color: '#585858'
                                }}>{item.note}
                            </AutoSizeText>
                        </View>

                        <View style={{
                            flex: 0.2,
                            justifyContent:'center'
                        }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    textAlign:'center',
                                    borderColor:Colors.appBgColor,
                                    padding:moderateScale(2),
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10),
                                    color: Colors.appBgColor,
                                    borderWidth:moderateScale(1),
                                    borderRadius:moderateScale(10)
                                }}>View
                            </AutoSizeText>
                        </View>
                    </View>
                )
            }) : <View />}

            <TouchableOpacity style={{
                ...styles.styleButtons, flex: 0,
                margin: verticalScale(25),
                marginStart: 0,
                marginTop: verticalScale(65)
            }} onPress={() => { }}>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                }}>Add Document</Text>
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

export default HealthPetView;