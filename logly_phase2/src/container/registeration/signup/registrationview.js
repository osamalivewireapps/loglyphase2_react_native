/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, Platform } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0

function RegistrationView(props) {

    const { backScreen, openRegisterAccount,
        arrStates, userStateLocation, userState,
        arrCity, userCityLocation, userCity,
        validateName, enterName, setUserName } = props;

    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [rememberCheck, setrememberCheck] = useState(false);


    //STATES...
    const inputEl = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [filterArray, setFilterArr] = useState([]);

    //CITY...
    const inputCity = useRef(null);
    const [isCityVisible, setIsCityVisible] = useState(false);
    const [filterCityArray, setFilterCityArr] = useState([]);


    useEffect(() => {
        if (isVisible && arrStates) {

            setFilterArr(arrStates.filter((e) => {
                console.log("state name----->", e.name + "--" + userState)
                return e.name.includes(userState)
            }))
        }
    }, [userStateLocation])

    useEffect(() => {
        if (isCityVisible && arrCity) {

            setFilterCityArr(arrCity.filter((e) => {
                console.log("city name----->", e.name + "--" + userCity)
                return e.name.includes(userCity)
            }))
        }
    }, [userCityLocation])

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
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>Register Account</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Please fill the details below</Text>
            </View>
            <ScrollView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <View style={{
                        flex: 8, marginStart: 30, marginTop: 15,
                        marginEnd: 30
                    }}>

                        <View style={{
                            ...styles.boxcontainer,

                            flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center',
                            shadowColor: validateName ? 'black' : 'darkred',
                            shadowOpacity: validateName ? 0.25 : 1
                        }}>

                            <Image source={Icons.icon_user} />
                            <TextInput placeholder="Enter name" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,

                            }}
                                keyboardType="default"
                                onChangeText={(e) => setUserName(e)}
                                value={enterName} />
                        </View>
                        <View style={{ ...styles.boxcontainer, marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                            <Image source={Icons.icon_email} />
                            <TextInput placeholder="Email" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,

                            }}
                                keyboardType="email-address"
                                onChangeText={setemail}
                                value={email} />
                        </View>

                        <View style={{ ...styles.boxcontainer, marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                            <Image source={Icons.icon_phone} />
                            <TextInput placeholder="Enter Phone No" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,

                            }}
                                keyboardType="number-pad"
                                onChangeText={setemail}
                                value={email} />
                        </View>

                        <View style={{ ...styles.boxcontainer, marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                            <Image source={Icons.icon_state} />
                            <TextInput placeholder="Select State"
                                ref={inputEl}
                                onTouchStart={() => setIsVisible(true)}
                                onChangeText={(e) => {
                                    userStateLocation({ name: e, stateId: -1 });
                                    setIsVisible(true)
                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: 10,
                                    flex: 8

                                }}
                                keyboardType="default"
                                value={userState} />
                            <TouchableOpacity
                                onPress={() => {
                                    inputEl.current.focus();
                                    setIsVisible(true);
                                    setFilterArr(arrStates)

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} />
                            </TouchableOpacity>


                        </View>

                        {(isVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: 10,
                            ...styles.boxcontainer,
                            height: 150,
                            shadowRadius: 4,
                            borderRadius: 10

                        }}>
                            <FlatList
                                data={filterArray}
                                renderItem={(item) => {
                                    console.log("state--->", item.item.name)
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            userStateLocation({ name: item.item.name, stateId: item.item.id });
                                            setIsVisible(false)

                                        }}>
                                            <View >
                                                <Text style={{
                                                    ...styles.generalTxt, borderColor: 'black',
                                                    borderWidth: 0, width: '100%', padding: 10,
                                                    borderRadius: 10, marginTop: 0,
                                                    backgroundColor: 'white',
                                                    color: 'black', fontSize: 14

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }}
                                keyExtractor={item => item.Country}
                            />
                        </View> : null}

                        <View style={{ ...styles.boxcontainer, marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                            <Image source={Icons.icon_city} />
                            <TextInput placeholder="Select City"
                                ref={inputCity}
                                onTouchStart={() => setIsCityVisible(true)}
                                onChangeText={(e) => {
                                    userCityLocation({ name: e, cityId: -1 });
                                    setIsCityVisible(true)
                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: 10,
                                    flex: 8

                                }}
                                keyboardType="default"
                                value={userCity}

                            />

                            <TouchableOpacity
                                onPress={() => {
                                    inputCity.current.focus();
                                    setIsCityVisible(true);
                                    setFilterCityArr(arrCity)

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} />
                            </TouchableOpacity>
                        </View>

                        {(isCityVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: 10,
                            ...styles.boxcontainer,
                            height: 150,
                            shadowRadius: 4,
                            borderRadius: 10

                        }}>
                            <FlatList
                                data={filterCityArray}
                                renderItem={(item) => {
                                    console.log("city--->", item.item.name)
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            userCityLocation({ name: item.item.name, cityId: item.item.id });
                                            setIsCityVisible(false)

                                        }}>
                                            <View >
                                                <Text style={{
                                                    ...styles.generalTxt, borderColor: 'black',
                                                    borderWidth: 0, width: '100%', padding: 10,
                                                    borderRadius: 10, marginTop: 0,
                                                    backgroundColor: 'white',
                                                    color: 'black', fontSize: 14

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }}
                                keyExtractor={item => item.Country}
                            />
                        </View> : null}

                        <View style={{ ...styles.boxcontainer, marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>

                            <Image source={Icons.icon_zipcode} />
                            <TextInput placeholder="Zip Code" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,

                            }}
                                keyboardType="default"
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
                            marginTop: 25, alignItems: 'center',
                            paddingStart: 15,
                            paddingEnd: 0
                        }}>

                            <CheckBox
                                onClick={() => {
                                    setrememberCheck(!rememberCheck)
                                }}
                                style={{ flex: 0 }}
                                isChecked={rememberCheck}

                            />

                            <Text
                                numberOfLines={1}
                                style={{
                                    ...styles.generalTxt, fontSize: 14, color: 'black',
                                    textAlign: 'center'
                                }}>
                                <Text

                                >I accept the </Text>
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

                        <TouchableOpacity
                            onPress={() => openRegisterAccount()}
                            style={{
                                ...styles.styleButtons, flex: 0, marginTop: 25
                            }}>
                            <Text style={{
                                fontSize: 22, textAlign: 'center', padding: 10,
                                paddingTop: 15, paddingBottom: 15,
                                ...styles.generalTxt
                            }}>CONTINUE</Text>
                        </TouchableOpacity>


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

export default RegistrationView;
