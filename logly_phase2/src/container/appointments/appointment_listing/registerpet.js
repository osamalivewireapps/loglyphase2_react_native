/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, FlatList, Dimensions, Image } from "react-native";
import { AutoSizeText } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

export const RegisterPetView = (props) => {

    const [select, isSelected] = useState(-1)
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <AutoSizeText
                numberOfLines={1}
                minFontSize={moderateScale(12)}
                fontSize={moderateScale(14)}
                style={{
                    fontFamily: Fonts.type.medium,
                    color: '#404040',
                    marginBottom: verticalScale(10)

                }}
            >
                Your Registered Pet
            </AutoSizeText>

            <FlatList
                data={['', '', '', '', '', '', '', '', '', '', '', '']}
                contentContainerStyle={{
                    
                }}
                renderItem={({ item, index }) => {
                    return renderBreedItem(item, index);
                }}
            />

            <TouchableOpacity style={{
                ...styles.styleButtons,
                marginTop: verticalScale(10),
                width: '80%',
                alignSelf: 'center'



            }} onPress={() => { props.navigation.navigate('SelectServices') }}>
                <Text style={{
                    fontSize: moderateScale(22), textAlign: 'center',
                    padding: moderateScale(10),
                    paddingTop: moderateScale(12),
                    paddingBottom: moderateScale(12),
                    ...styles.generalTxt
                }}>PROCEED</Text>
            </TouchableOpacity>
        </View>
    );

    function renderBreedItem(item, index) {

        return (
            <View style={{
                ...styles.boxcontainer,
                shadowColor: 'white',
                shadowOpacity: 1,
                marginTop: verticalScale(10),
                height: moderateVerticalScale(65),
                borderRadius: moderateScale(15),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    source={Images.sample_bird}
                    resizeMode='cover'
                    style={{
                        width: moderateScale(60),
                        height: '100%',
                        borderRadius: moderateScale(10)
                        , marginEnd: moderateScale(15)
                    }}
                />

                <View
                    style={{
                        flex: 0.95,
                    }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}>
                        <View style={{
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'flex-start'
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',

                                }}
                            >
                                Zooes
                            </AutoSizeText>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: verticalScale(5),
                            alignItems: 'center',
                        }}>

                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12)

                                }}
                            >
                                Category:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                Parrot
                            </AutoSizeText>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: verticalScale(5),
                            alignItems: 'center'
                        }}>

                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12),

                                }}
                            >
                                Status:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                Alive
                            </AutoSizeText>
                        </View>


                    </View>



                </View>

                <TouchableOpacity
                    onPress={() => addBreeder(index)}
                    style={{
                        width: moderateScale(60),
                        alignItems: 'center',
                        borderRadius: moderateScale(6),
                        borderWidth: verticalScale(1),
                        borderColor: Colors.appBgColor,
                        backgroundColor: select === index ? Colors.appBgColor : 'white',
                    }}
                >


                    <Text style={{
                        ...styles.generalTxt,
                        paddingStart: moderateScale(8),
                        paddingEnd: moderateScale(8),
                        padding: moderateScale(2),
                        color: select === index ? 'white' : Colors.appBgColor,
                        fontSize: moderateScale(10)
                    }}> {select === index ? 'Selected' : 'Select'} </Text>

                </TouchableOpacity>

            </View>
        )
    }

    function addBreeder(index) {
        isSelected(index);
    }
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'black',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
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
        borderRadius: moderateScale(30)
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});


