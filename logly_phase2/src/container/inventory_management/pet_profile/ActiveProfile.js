/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

import moment from 'moment';

function ActiveProfile(props) {

    const ACTIVE_ANIMALS = props.animalData;
    return (
        <View flex={1}>
            <FlatList
                contentContainerStyle={{
                    flex: 1, padding: moderateScale(25)
                }}
                data={ACTIVE_ANIMALS}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity 
                        onPress={()=>{
                                props.navigation.navigate('PetDetail');
                        }}
                        style={{
                            ...styles.boxcontainer,
                            marginTop: verticalScale(10),
                            width: '100%',
                            padding: moderateScale(15),
                        }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    resizeMode='contain'
                                    source={item.image}
                                    style={{
                                        backgroundColor:'white',
                                        minHeight: moderateScale(68),
                                        minWidth: moderateScale(70),
                                        borderRadius: Math.round((moderateScale(68) + moderateScale(70)) / 2)
                                    }} />

                                <View style={{
                                    padding: moderateScale(15),
                                    paddingTop: verticalScale(10)
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(18)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontFamily: Fonts.type.bold,
                                        }}>{item.data.name}
                                    </AutoSizeText>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            marginTop: verticalScale(5),
                                            color: '#777777',
                                            width: '89%',

                                        }}>Registeration Date : {moment(item.createdAt).format('DD MMM, YYYY')}
                                    </AutoSizeText>
                                </View>
                            </View>

                            <View style={{
                                marginTop: verticalScale(15),
                                backgroundColor: '#777777', height: verticalScale(0.3)
                            }} />
                            <View style={{
                                marginTop: verticalScale(5),
                                flexDirection: 'row',
                            }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    width: '33%',

                                }}>Category
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    width: '53%',

                                }}>Registered by
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    width: '13%',

                                }}>Status
                            </AutoSizeText>
                            </View>
                            <View style={{
                                marginTop: verticalScale(5),
                                flexDirection: 'row',
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        width: '33%',
                                        fontFamily:Fonts.type.medium

                                    }}>{item.categoryName}
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        width: '53%',
                                        fontFamily: Fonts.type.medium

                                    }}>{item.data.name}
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        width: '13%',
                                        fontFamily: Fonts.type.medium

                                    }}>{item.status}
                                </AutoSizeText>
                            </View>
                        </TouchableOpacity>
                    )
                }}

            />

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
        elevation: verticalScale(5),
        borderRadius: moderateScale(15),
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

export default ActiveProfile;