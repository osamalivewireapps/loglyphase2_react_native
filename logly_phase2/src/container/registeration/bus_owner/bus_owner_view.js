/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, Platform } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { marginBottom, zIndex } from 'styled-system';
import { CHARITY_ID } from '../../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Keyboard } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';


function BusinessOwnerView(props) {

    const arrEmpStength = [
        '1-10',
        '11-25',
        '26-50',
        '51-100',
        '100+',
    ]

    const {
        nameBus, validateBusName, setBusName,
        strengthEmp, validateBusEmp, setEmpStrength,
        urlBus, validateBusURL, setBusUrl,
        backScreen, openRegisterAccount, accountType, openDocumetFolder,
        fileName, deleteFile } = props;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />
            <ScrollView keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}

                >
                    <View
                        style={{
                            backgroundColor: Colors.appBgColor,
                            height: Dimensions.get('screen').height / 5,
                            padding: 20,
                            paddingStart: 40,
                            paddingTop: 30,
                            flex: 0
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                            <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                            <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                        </TouchableOpacity>
                        <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 25, marginTop: 10 }}>
                            {accountType.toLowerCase().startsWith("charity") ? "Charity / Non Profit" : "Business Owner"}
                        </Text>

                        <Text style={{ ...styles.generalTxt, marginTop: Platform.OS === 'ios' ? 0 : 10 }}>Add your business details below</Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: Platform.OS === 'ios' ?20:30,
                            borderTopRightRadius: Platform.OS === 'ios' ?20:30,
                            marginTop: Platform.OS==='ios'?-10:-25,
                            backgroundColor: 'white',
                            paddingStart: 30,
                            paddingEnd: 30,
                            flex: 1,
                            paddingBottom: 30

                        }}
                    >
                        <View style={{
                            marginTop: 35,
                            flex: 9


                        }}>

                            <Text style={{
                                ...styles.generalTxt, color: 'black', fontSize: 15,
                                marginBottom: 5, marginStart: 5
                            }}>Business Name</Text>
                            <View style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                shadowColor: validateBusName ? 'black' : 'darkred',
                                shadowOpacity: validateBusName ? 0.25 : 1,
                                paddingStart: 15, paddingEnd: 15,
                            }}>


                                <TextInput placeholder="" style={{
                                    ...styles.styleTextInput,
                                    flex: 1,

                                }}
                                    maxLength={75}
                                    autoCapitalize='none'
                                    keyboardType="default"
                                    onChangeText={(e) => setBusName(e)}
                                    value={nameBus} />
                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black', fontSize: 15,
                                marginBottom: 5, marginStart: 5, marginTop: 25
                            }}>No.of.Employees</Text>
                            <View style={{
                                ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                shadowColor: validateBusEmp ? 'black' : 'darkred',
                                shadowOpacity: validateBusEmp ? 0.25 : 1,
                                backgroundColor: 'white'
                            }}>

                                <ModalDropdown
                                    style={{
                                        backgroundColor: 'white', width: '92%', height: 50,
                                        borderTopLeftRadius: 30, borderTopRightRadius: 30,
                                        justifyContent: 'center', alignItems: 'center',
                                        paddingTop: 25, paddingStart: 15,
                                        borderBottomLeftRadius: 30, borderBottomRightRadius: 30,

                                    }}
                                    defaultValue={"Select No.of.Employees"}
                                    textStyle={{
                                        ...styles.innerText,
                                        fontSize: 16,
                                        color: 'black',
                                        width: '100%',
                                        height: 50,
                                    }}

                                    dropdownStyle={{ backgroundColor: 'white', width: '85%', marginStart: -15 }}
                                    dropdownTextStyle={{
                                        ...styles.innerText,
                                        fontSize: 16,
                                        color: 'black',
                                        backgroundColor: 'white'
                                    }}
                                    onSelect={(item) => {
                                        setEmpStrength(arrEmpStength[item])
                                    }}
                                    defaultIndex={0}
                                    options={arrEmpStength} />

                                <Image source={Icons.icon_ios_arrow_down} />

                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black', fontSize: 15,
                                marginBottom: 5, marginStart: 5, marginTop: 25,
                            }}>Website (Optional)</Text>
                            <View style={{
                                ...styles.boxcontainer, flexDirection: 'row', paddingStart: 15, paddingEnd: 15,
                                alignItems: 'center',
                                shadowColor: validateBusURL ? 'black' : 'darkred',
                                shadowOpacity: validateBusURL ? 0.25 : 1,
                            }}>


                                <TextInput placeholder="" style={{
                                    ...styles.styleTextInput,
                                    flex: 1,


                                }}
                                    autoCapitalize='none'
                                    keyboardType="default"
                                    onChangeText={(e) => setBusUrl(e)}
                                    value={urlBus} />
                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black', fontSize: 16,
                                marginStart: 5, marginTop: 20, fontFamily: Fonts.type.medium,
                            }}>{accountType.toLowerCase().startsWith("charity") ? "Please Attach the 501-C form." : "Photo ID"}
                            </Text>

                            {fileName ?
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'column', flex: 9 }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={14}
                                            fontSize={14}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt, color: 'black', fontSize: 14,
                                                marginStart: 5, marginTop: 5

                                            }}>{fileName}
                                        </AutoSizeText>


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{
                                                ...styles.generalTxt, color: 'black', fontSize: 12,
                                                marginStart: 5, marginTop: 0, textAlign: 'center', height: '100%'
                                            }}>Completed</Text>
                                            <Image source={Icons.icon_feather_check_circle} marginStart={5} />
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => deleteFile()}>
                                        <Image source={Icons.icon_material_delete} marginStart={5} />
                                    </TouchableOpacity>
                                </View>
                                : <View />}
                            {/* 
                    TODO
                        SET STATE FOR VISIBILITY W.R.T ACCOUNT TYPE
                        AND MOREOVER SET TEXT FOR UPLOAD DOCUMENT
                    */}

                            {!fileName ?
                                (<TouchableOpacity style={{
                                    ...styles.styleAttachButtons,
                                    marginBottom: 5, marginTop: 15, padding: 8,
                                    width: '60%', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                                    onPress={() => { openDocumetFolder() }}
                                >
                                    <Image source={Icons.icon_attach_file} />
                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        marginStart: 10,
                                        color: Colors.appBgColor, fontSize: 16,

                                    }}>
                                        {accountType.toLowerCase().startsWith("charity") ? "Attach" : "Attach Photo"}
                                    </Text>
                                </TouchableOpacity>)
                                : <View />}

                        </View>

                        <View style={{}} >
                            <TouchableOpacity
                                onPress={() => {
                                    openRegisterAccount()
                                }}
                                style={{
                                    ...styles.styleButtons, marginTop: 25,
                                }}>
                                <Text style={{
                                    fontSize: 22, textAlign: 'center', padding: 10,
                                    paddingStart: 117, paddingEnd: 117,
                                    paddingTop: 15, paddingBottom: 15,
                                    ...styles.generalTxt
                                }}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
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
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 40,
        marginTop: 5
    },
    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: 'black'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    },
    styleAttachButtons: {
        borderColor: Colors.appBgColor,
        borderWidth: 1,
        paddingLeft: 5,
        paddingEnd: 5,
        borderRadius: 30,
        backgroundColor: 'white',
    }
});

export default BusinessOwnerView;
