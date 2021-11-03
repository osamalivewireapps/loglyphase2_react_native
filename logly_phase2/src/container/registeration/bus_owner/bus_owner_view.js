/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, Platform, Modal } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { alignSelf, marginBottom, zIndex } from 'styled-system';
import { CHARITY_ID } from '../../../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import { Keyboard } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function BusinessOwnerView(props) {

    const [modalVisible, setModalVisible] = useState(false);

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
        fileName, deleteFile, validatePhone, setPhone, enterPhone } = props;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />
            <ScrollView
                keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}

                >
                    <View
                        style={{
                            backgroundColor: Colors.appBgColor,
                            height: Dimensions.get('screen').height / 5,
                            padding: verticalScale(20),
                            paddingStart: moderateScale(40),
                            paddingTop: verticalScale(30),
                            flex: 0
                        }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                            <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                            <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                        </TouchableOpacity>
                        <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>
                            {accountType.toLowerCase().startsWith("charity") ? "Charity / Non Profit" : "Business Owner"}
                        </Text>

                        <Text style={{ ...styles.generalTxt, marginTop: Platform.OS === 'ios' ? 0 : verticalScale(10) }}>Add your business details below</Text>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: Platform.OS === 'ios' ? moderateScale(20) : moderateScale(30),
                            borderTopRightRadius: Platform.OS === 'ios' ? moderateScale(20) : moderateScale(30),
                            marginTop: Platform.OS === 'ios' ? verticalScale(-15) : verticalScale(-25),
                            backgroundColor: 'white',
                            paddingStart: moderateScale(30),
                            paddingEnd: moderateScale(30),
                            flex: 1,
                            paddingBottom: moderateScale(30)

                        }}
                    >
                        <View style={{
                            marginTop: moderateScale(35),
                            flex: 9


                        }}>

                            <Text style={{
                                ...styles.generalTxt, color: 'black',
                                fontSize: moderateScale(15),
                                marginBottom: verticalScale(5),
                                marginStart: verticalScale(5)
                            }}>Business Name</Text>
                            <View style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                shadowColor: validateBusName ? 'black' : 'darkred',
                                shadowOpacity: validateBusName ? 0.25 : 1,
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
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
                                ...styles.generalTxt, color: 'black',
                                fontSize: moderateScale(15),
                                marginBottom: verticalScale(5),
                                marginStart: verticalScale(5),
                                marginTop: verticalScale(25),
                            }}>Business Phone</Text>

                            <View style={{
                                ...styles.boxcontainer,
                                shadowColor: validatePhone ? 'black' : 'darkred',
                                shadowOpacity: validatePhone ? 0.25 : 1,
                                flexDirection: 'row',
                                padding: verticalScale(15), paddingTop: 0,
                                paddingBottom: 0, alignItems: 'center'
                            }}>

                                <TextInput style={{
                                    ...styles.styleTextInput,
                                    flex: 1,
                                    marginEnd: moderateScale(10),

                                }}
                                    maxLength={12}
                                    autoCapitalize='none'
                                    keyboardType="number-pad"
                                    onChangeText={(e) => setPhone(e)}
                                    value={enterPhone} />
                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black',
                                fontSize: moderateScale(15),
                                marginBottom: verticalScale(5),
                                marginStart: verticalScale(5),
                                marginTop: verticalScale(25),
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
                                        backgroundColor: 'white', width: '92%',
                                        height: moderateScale(40),
                                        borderTopLeftRadius: moderateScale(30), 
                                        borderTopRightRadius: moderateScale(30),
                                        justifyContent: 'center', alignItems: 'center',
                                        paddingTop: verticalScale(28), 
                                        paddingStart: moderateScale(15),
                                        borderBottomLeftRadius: moderateScale(30), 
                                        borderBottomRightRadius: moderateScale(30),

                                    }}
                                    defaultValue={"Select No.of.Employees"}
                                    textStyle={{
                                        ...styles.innerText,
                                        fontSize: moderateScale(16),
                                        color: 'black',
                                        width: '100%',
                                        height: moderateScale(50),
                                    }}

                                    dropdownStyle={{ backgroundColor: 'white', 
                                    width: '84%',
                                    marginStart: moderateScale(-15) ,
                                        marginTop: moderateScale(-10)
                                    }}
                                    dropdownTextStyle={{
                                        ...styles.innerText,
                                        fontSize: moderateScale(16),
                                        color: 'black',
                                        backgroundColor: 'white'
                                    }}
                                    onSelect={(item) => {
                                        setEmpStrength(arrEmpStength[item])
                                    }}
                                    defaultIndex={0}
                                    options={arrEmpStength} />

                                <Image source={Icons.icon_ios_arrow_down} style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>

                            <Text style={{
                                ...styles.generalTxt, color: 'black',
                                fontSize: moderateScale(15),
                                marginBottom: verticalScale(5),
                                marginStart: verticalScale(5),
                                marginTop: verticalScale(25),
                            }}>Website (Optional)</Text>
                            <View style={{
                                ...styles.boxcontainer, flexDirection: 'row',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
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

                            <TouchableOpacity style={{
                                marginStart: moderateScale(5),
                                flexDirection: 'row',
                                marginTop: verticalScale(20)
                            }}
                                onPress={() => { setModalVisible(!modalVisible); }}
                            >


                                <Text style={{
                                    ...styles.generalTxt, color: 'black',
                                    fontSize: moderateScale(16),
                                    marginStart: moderateScale(5),
                                    fontFamily: Fonts.type.base,
                                    marginEnd: moderateScale(5)
                                }}>{accountType.toLowerCase().startsWith("charity") ? "Please Attach the 501-C form." : "Verify Identity"}
                                </Text>
                                <Image source={Icons.icon_info} resizeMode='contain' style={{ alignSelf: 'center', height: verticalScale(13), width: moderateScale(12.5) }} />
                            </TouchableOpacity>
                            {fileName ?
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'column', flex: 9 }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt, color: 'black',
                                                fontSize: moderateScale(14),
                                                marginStart: moderateScale(5),
                                                marginTop: verticalScale(5)

                                            }}>{fileName}
                                        </AutoSizeText>


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{
                                                ...styles.generalTxt,
                                                color: 'black',
                                                fontSize: moderateScale(12),
                                                marginStart: moderateScale(5),
                                                marginTop: 0, textAlign: 'center', height: '100%'
                                            }}>Completed</Text>
                                            <Image source={Icons.icon_feather_check_circle} marginStart={moderateScale(5)} />
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => deleteFile()}>
                                        <Image source={Icons.icon_material_delete} marginStart={moderateScale(5)} />
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
                                    marginBottom: moderateScale(5),
                                    marginTop: verticalScale(15),
                                    padding: moderateScale(8),
                                    width: moderateScale(180), justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                                    onPress={() => { openDocumetFolder() }}
                                >
                                    <Image source={Icons.icon_attach_file} style={{ height: verticalScale(15), width: moderateScale(8) }} />
                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        marginStart: moderateScale(10),
                                        color: Colors.appBgColor,
                                        fontSize: moderateScale(16),

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
                                    fontSize: 22, textAlign: 'center',
                                    paddingStart: 117, paddingEnd: 117,
                                    padding: verticalScale(10),
                                    paddingTop: verticalScale(10),
                                    paddingBottom: verticalScale(10),
                                    ...styles.generalTxt
                                }}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', position: 'absolute', top: moderateScale(15), right: moderateScale(15) }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image source={Icons.icon_close} style={{
                                height: moderateScale(10),
                                width: moderateScale(10)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: 'black',
                            fontSize: moderateScale(16), textAlign: 'center'
                        }}>{getInfoTxt(accountType)}</Text>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

function getInfoTxt(accountType) {
    if (accountType.toLowerCase().startsWith("charity"))
        return "501-C form must be uploaded (now or later) to verify Non-Profit status and get Logly Software for Free. This will also qualify your Non-Profit for other Logly Non-Profit Platform benefits."
    else
        return "To help fight fraud and Scammers, we request Business Owner to hold their Driver's License next to their face, take and upload picture to verify identity.\nBy doing this step your business will automatically get a verified by Logly badge.  If you decide not to do this step, your business will be subject to other verification steps by Logly before your business is deemed verified."
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
        height: moderateScale(40),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(40),
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
        color: 'black'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    },
    styleAttachButtons: {
        borderColor: Colors.appBgColor,
        borderWidth: moderateScale(1),
        paddingLeft: moderateScale(5),
        paddingEnd: moderateScale(5),
        borderRadius: moderateScale(30),
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(22),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        width: Dimensions.get("screen").width - 50,
        margin: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: 'white',
        padding: moderateScale(30),
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: moderateScale(2)
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(4),
        elevation: 5
    },
    button: {
        borderRadius: moderateScale(20),
        padding: moderateScale(10),
        elevation: verticalScale(2)
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: verticalScale(15),
        textAlign: "center"
    }
});

export default BusinessOwnerView;
