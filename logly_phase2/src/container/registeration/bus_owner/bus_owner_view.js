/* eslint-disable no-trailing-spaces */
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
import { marginBottom } from 'styled-system';

function BusinessOwnerView(props) {

    const { backScreen, openRegisterAccount, accountType } = props;
    const [email, setemail] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

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
                    <Text style={{ ...styles.generalTxt, marginStart: 10 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>{accountType === 'Charity / Non Profit' ? "Charity / Non Profit" : "Business Owner"}</Text>
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
                    <View style={{ ...styles.boxcontainer, flexDirection: 'row', padding: 15, alignItems: 'center' }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,

                        }}
                            keyboardType="default"
                            onChangeText={setemail}
                            value={email} />
                    </View>

                    <Text style={{
                        ...styles.generalTxt, color: 'black', fontSize: 15,
                        marginBottom: 5, marginStart: 5, marginTop: 25
                    }}>No.of.Employees</Text>
                    <View style={{ ...styles.boxcontainer, flexDirection: 'row', padding: 15, alignItems: 'center' }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 8

                        }}
                            keyboardType="default"
                            onChangeText={setemail}
                            value={email} />

                        <Image source={Icons.icon_ios_arrow_down} />
                    </View>

                    <Text style={{
                        ...styles.generalTxt, color: 'black', fontSize: 15,
                        marginBottom: 5, marginStart: 5, marginTop: 25
                    }}>Website URL</Text>
                    <View style={{ ...styles.boxcontainer, flexDirection: 'row', padding: 15, alignItems: 'center' }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,

                        }}
                            keyboardType="default"
                            onChangeText={setemail}
                            value={email} />
                    </View>


                    {/* 
                    TODO
                        SET STATE FOR VISIBILITY W.R.T ACCOUNT TYPE
                        AND MOREOVER SET TEXT FOR UPLOAD DOCUMENT
                    */}

                    {accountType === 'Charity / Non Profit' ?
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

                <View>
                    <TouchableOpacity
                        onPress={() => openRegisterAccount()}
                        style={{
                            ...styles.styleButtons, marginTop: 25
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
        </View>
    );
}

const styles = StyleSheet.create({

    boxcontainer: {
        height: 50,
        backgroundColor: '#E3E3E3',
        borderRadius: 10
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
