/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { backgroundColor } from 'styled-system';
import { INDIVIDUAL } from '../../../constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function RegistrationAccountTypeView(props) {

    const { accTypeSelection, accountTypeSelection, openBusOwner, backScreen, listAccountType, openBusPackages } = props;

    console.log("account_type-->", listAccountType)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(40),
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>Register Account</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10) }}>Please fill the details below</Text>
            </View>
            <ScrollView>
                <View style={{
                    flex: 8,
                    marginStart: moderateScale(30),
                    marginEnd: moderateScale(30), marginBottom: verticalScale(30)
                }}>

                    {getAccountView(accTypeSelection, listAccountType, openBusPackages, accountTypeSelection)}

                    <TouchableOpacity
                        onPress={() => openBusOwner()}
                        style={{
                            ...styles.styleButtons, flex: 0, marginTop: verticalScale(10)
                        }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center',
                            padding: verticalScale(10),
                            paddingTop: verticalScale(10),
                            paddingBottom: verticalScale(10),
                            ...styles.generalTxt
                        }}>NEXT</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>
        </View>
    );
}

function getAccountView(accTypeSelection, listData, openBusPackages, accountTypeSelection) {


    return listData.map((data, index) => {

        return (

            <TouchableOpacity
                onPress={() => {
                    accTypeSelection({
                        isSelectedIndex: index,
                        registerAccountType: data.name,
                    })
                }}

                style={{
                    ...styles.boxcontainer,
                    padding: moderateScale(15), justifyContent: 'center',
                    backgroundColor: getRowColor(index),
                    marginTop: verticalScale(10)
                }}>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',


                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(18)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.bold,
                            marginEnd: moderateScale(10), color: 'black',
                            fontSize: moderateScale(1),
                            flex: 9

                        }}>{data.type === "Individual" ? "Pet Lover" : data.type}</AutoSizeText>


                    {accountTypeSelection.isSelectedIndex === index ?
                        (<View style={{
                            flexDirection: 'row', alignSelf: 'flex-end',
                        }}>

                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(13), color: 'green'
                            }}>Selected </Text>
                            <Image
                                resizeMode='contain'
                                style={{ height: verticalScale(12.75), width: moderateScale(14) }}
                                source={Icons.icon_check_circle_green} marginTop={verticalScale(1)} />

                        </View>)
                        :
                        (<View />)
                    }

                </View>
                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: moderateScale(14),
                        marginTop: verticalScale(10),
                        color: 'black',

                    }}>{data.description}</Text>

                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: moderateScale(14),
                        marginTop: verticalScale(10),
                        color: 'black',

                    }}>Starting at</Text>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(2), width: '100%'
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(18)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            flex: 6,
                            fontFamily: Fonts.type.bold,
                            fontSize: moderateScale(22),
                            marginEnd: verticalScale(10), color: 'black',

                        }}>
                        {(data.type === "Individual" || data.type.startsWith("Charity")) ? "Free" : "$" + data.minprice}
                        {/* {data.priceMethod === 'Monthly & Yearly' ? data.monthlyPrice + "/Month" : (data.lifetimePrice ? data.lifetimePrice + " Lifetime" : "Lifetime")} */}
                    </AutoSizeText>


                    <TouchableOpacity
                        onPress={() => openBusPackages(index)}
                        style={{
                            ...styles.styleButtons,
                            alignSelf: 'flex-end',
                            flex: 4
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            ...styles.generalTxt,
                            fontSize: moderateScale(14), padding: moderateScale(5),

                        }}>View Details</Text>
                    </TouchableOpacity>


                </View>

            </TouchableOpacity>

        )
    })


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
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(10)
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
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    }
});

const getRowColor = (index) => {

    switch (index) {
        case 0:
            return '#ACFCF4'
        case 1:
            return '#FFDC7D'
        case 2:
            return '#9EFF87'
        case 3:
            return '#FCC8AA'
        case 4:
            return '#E9BDFB'

        default:
            return '#ACFCF4'
    }
}

export default RegistrationAccountTypeView;
