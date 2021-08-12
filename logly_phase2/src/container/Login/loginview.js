/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput } from 'react-native';
import InputPasswordToggle from '../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../theme';
import CheckBox from 'react-native-check-box';

function LoginView(props) {
    const { openRegisterScreen, backScreen, openForgotScreen } = props;

    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [rememberCheck, setrememberCheck] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    height: Dimensions.get('screen').height / 4.5,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>Welcome</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Sign in to continue</Text>
            </View>
            <View style={{
                flex: 4, justifyContent: 'center', marginStart: 30,
                marginEnd: 30
            }}>

                <View style={{ ...styles.boxcontainer, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                    <Image source={Icons.icon_email} />
                    <TextInput placeholder="Email" style={{
                        ...styles.styleTextInput,
                        marginStart: 10,

                    }}
                        keyboardType="email-address"
                        onChangeText={setemail}
                        value={email} />
                </View>
                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row',
                    marginTop: 15, padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center'
                }}>

                    <Image source={Icons.icon_lock} />
                    <InputPasswordToggle
                        inputStyle={{
                            ...styles.styleTextInput,
                            marginStart: 10
                        }}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 15, alignItems: 'center',
                    paddingStart: 15,
                    paddingEnd: 0
                }}>

                    <CheckBox
                        onClick={() => {
                            setrememberCheck(!rememberCheck)
                        }}
                        style={{ flex: 1 }}
                        isChecked={rememberCheck}
                        rightText={"Remember me"}
                        rightTextStyle={{ ...styles.generalTxt, fontSize: 14, color: 'black', marginStart: 5 }}
                    />

                    <TouchableOpacity onPress={() => { openForgotScreen() }}>
                        <Text style={{ ...styles.generalTxt, fontSize: 14, color: '#0467B2' }}>Forgot Password? </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{
                flex: 2, marginStart: 30,
                marginEnd: 30
            }}>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0
                }}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingStart: 127, paddingEnd: 127,
                        paddingTop: 15, paddingBottom: 15,
                        ...styles.generalTxt
                    }}>NEXT</Text>
                </TouchableOpacity>

                <View style={{
                    flex: 1, alignItems: 'center', justifyContent: 'center',

                }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.generalTxt, fontSize: 14, color: 'black',
                            textAlign: 'center'
                        }}>
                        <Text

                        >Don't have an account yet? </Text>
                        <TouchableOpacity onPress={() => openRegisterScreen()}>
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                    color: Colors.appBgColor
                                }}>Register Here</Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            ...styles.generalTxt, fontSize: 14, color: 'black',
                            textAlign: 'center', marginTop: 15
                        }}>
                        <Text

                        >Please look into </Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor
                            }}>Terms of Use</Text>
                        <Text> and </Text>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                color: Colors.appBgColor
                            }}>Privacy Policy</Text>
                    </Text>

                </View>

            </View>

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
        borderRadius: 40
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

export default LoginView;
