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
import { Pages } from 'react-native-pages';
import ImagePlaceholder from '../../../components/ImagePlaceholder';

function GalleryPetView(props) {

    const { animalData, route } = props;

    return (
        <View style={{
            flexDirection: 'column',
            paddingStart: moderateScale(20),
            height: Dimensions.get('screen').height / 2,
            justifyContent: 'flex-end',
            paddingBottom: verticalScale(30)

        }}>

            <Pages
                containerStyle={{ flex: 1, paddingBottom: verticalScale(20) }}
                indicatorColor={Colors.appBgColor}
            >
                {animalData.gallery.map((item, index) => {
                    return (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <ImagePlaceholder
                                showActivityIndicator={false}
                                activityIndicatorProps={{
                                    size: 'small',
                                    color: '#777777',
                                }}
                                resizeMode='cover'
                                placeholderStyle={{
                                    width: Dimensions.get('screen').width,

                                }}
                                imgStyle={{
                                    width: Dimensions.get('screen').width,
                                }}

                                style={{

                                }}

                                src={item.filename}
                                placeholder={Icons.icon_paw}
                            />
                        </View>
                    )
                })}


            </Pages>

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

                }}>Add Photos / Videos</Text>
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

export default GalleryPetView;