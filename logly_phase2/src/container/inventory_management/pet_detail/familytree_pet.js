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

function FamilyTreePetView(props) {

    const [initialPg, setInitialPg] = useState(0);
   
    return (
        <View style={{
            flexDirection:'column',
            paddingStart: moderateScale(20),
            padding:verticalScale(20)
            
        }}>
            <Text style={{
                marginTop: verticalScale(25),
                ...styles.generalTxt, color: '#464646',
                fontFamily: Fonts.type.medium,
            }}>Parents</Text>

            <View flexDirection='row' marginTop={0}>

                <TouchableOpacity style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(5),
                    flex: 1,
                    height: verticalScale(40),
                    flexDirection: 'row',
                    paddingStart: moderateScale(15),
                    paddingEnd: moderateScale(15),
                    alignItems: 'center',
                    marginStart: 0,
                }} onPress={() => {

                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            color: '#464646',
                            paddingEnd: moderateScale(5),
                            flex: 7,
                        }}>Add Parent
                    </AutoSizeText>
                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(5),
                    flex: 1,
                    height: verticalScale(40),
                    paddingStart: moderateScale(15),
                    paddingEnd: moderateScale(15),
                    alignItems: 'center',
                    marginStart: moderateScale(10),
                    flexDirection: 'row'
                }} onPress={() => {
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            color: '#464646',
                            flex: 7,
                        }}>Add Parent
                    </AutoSizeText>
                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                </TouchableOpacity>


            </View>
            <Text style={{
                marginTop: verticalScale(25),
                ...styles.generalTxt, color: '#464646',
                fontFamily: Fonts.type.medium,
            }}>Child</Text>

            <TouchableOpacity style={{
                backgroundColor: '#F5F5F5',
                borderRadius: moderateScale(10),
                marginTop: verticalScale(5),
                flex: 0.5,
                width: '50%',
                height: verticalScale(40),
                flexDirection: 'row',
                paddingStart: moderateScale(15),
                paddingEnd: moderateScale(15),
                alignItems: 'center',
                marginStart: 0,
            }} onPress={() => {

            }}>

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(14)}
                    fontSize={moderateScale(16)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        ...styles.generalTxt,
                        color: '#464646',
                        paddingEnd: moderateScale(5),
                        flex: 7,
                    }}>Add Children
                </AutoSizeText>
                <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
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

export default FamilyTreePetView;