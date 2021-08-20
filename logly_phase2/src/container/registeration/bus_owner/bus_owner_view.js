/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { marginBottom, zIndex } from 'styled-system';
import { CHARITY_ID } from '../../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Keyboard } from 'react-native';


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
        backScreen, openRegisterAccount, accountType } = props;

    const [email, setemail] = useState('');
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
                        <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>{accountType === CHARITY_ID ? "Charity / Non Profit" : "Business Owner"}</Text>
                        <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Add your business details below</Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            marginTop: -25,
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
                                backgroundColor: 'white', flexDirection: 'row'
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
                                        setEmpStrength(item)
                                    }}
                                    defaultIndex={0}
                                    options={arrEmpStength} />

                                <Image source={Icons.icon_ios_arrow_down} />

                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black', fontSize: 15,
                                marginBottom: 5, marginStart: 5, marginTop: 25,
                            }}>Website URL</Text>
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
                                    keyboardType="default"
                                    onChangeText={(e) => setBusUrl(e)}
                                    value={urlBus} />
                            </View>


                            {/* 
                    TODO
                        SET STATE FOR VISIBILITY W.R.T ACCOUNT TYPE
                        AND MOREOVER SET TEXT FOR UPLOAD DOCUMENT
                    */}

                            {accountType === CHARITY_ID ?
                                <TouchableOpacity style={{
                                    ...styles.styleAttachButtons,
                                    marginBottom: 5, marginTop: 25, padding: 8,
                                    width: '60%', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Image source={Icons.icon_attach_file} />
                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        marginStart: 10,
                                        color: Colors.appBgColor, fontSize: 16,

                                    }}>Attach Document</Text>
                                </TouchableOpacity> : <View />
                            }


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
