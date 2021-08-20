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

function RegistrationAccountTypeView(props) {

    const { accTypeSelection, accountTypeSelection, openBusOwner, backScreen, listAccountType, openBusPackages } = props;

    console.log("account_type-->", listAccountType)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>Register Account</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Please fill the details below</Text>
            </View>
            <ScrollView>
                <View style={{
                    flex: 8, marginStart: 30,
                    marginEnd: 30, marginBottom: 30
                }}>

                    {getAccountView(accTypeSelection, listAccountType, openBusPackages, accountTypeSelection)}

                    <TouchableOpacity
                        onPress={() => openBusOwner()}
                        style={{
                            ...styles.styleButtons, flex: 0, marginTop: 25
                        }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center', padding: 10,
                            paddingStart: 117, paddingEnd: 117,
                            paddingTop: 15, paddingBottom: 15,
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
                    padding: 15, justifyContent: 'center',
                    backgroundColor: getRowColor(index)

                }}>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',


                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={18}
                        fontSize={18}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.bold,
                            marginEnd: 10, color: 'black',
                            fontSize: 1,
                            flex: 9

                        }}>{data.name}</AutoSizeText>


                    {accountTypeSelection.isSelectedIndex === index ?
                        (<View style={{
                            flexDirection: 'row', alignSelf: 'flex-end',
                        }}>

                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: 13, color: 'green'
                            }}>Selected </Text>
                            <Image source={Icons.icon_check_circle_green} marginTop={1} />

                        </View>)
                        :
                        (<View />)
                    }

                </View>
                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: 14,
                        marginTop: 10,
                        color: 'black',

                    }}>{data.description}</Text>

                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: 14,
                        marginTop: 10,
                        color: 'black',

                    }}>Starting at</Text>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginTop: 2, width: '100%'
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={18}
                        fontSize={18}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            flex: 6,
                            fontFamily: Fonts.type.bold, fontSize: 22,
                            marginEnd: 10, color: 'black',

                        }}>{data.priceMethod === 'Monthly & Yearly' ? data.monthlyPrice + "/Month" : (data.lifetimePrice ? data.lifetimePrice + " Lifetime" : "Lifetime")}</AutoSizeText>


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
                            fontSize: 14, padding: 5,

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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginTop: 20,
    },
    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
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
