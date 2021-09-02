/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable semi */
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
import { Keyboard } from 'react-native';
import zipCodes from '../../../helpers/zipcodes'
import { POLICY, TERMS } from '../../../constants';


const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

function RegistrationView(props) {

    const { backScreen, openRegisterAccount,
        arrStates, userStateLocation, userState,
        arrCity, userCityLocation, userCity,
        validateName, enterName, setUserName,
        enterEmail, validateEmail, setEmail,
        enterPhone,
        validatePhone,
        setPhone, validateState, validateCity,
        enterZipCode, validateZipCode, setZipCode,
        enterPassword, validatePassword, setPassword,
        checkTerms, setCheckTerms, openPolicyScreen


    } = props;

    //STATES...
    const inputEl = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [filterArray, setFilterArr] = useState([]);

    //CITY...
    const inputCity = useRef(null);
    const [isCityVisible, setIsCityVisible] = useState(false);
    const [filterCityArray, setFilterCityArr] = useState([]);

    //ZipCode...
    const inputZipCode = useRef(null);
    const [isZipVisible, setIsZipVisible] = useState(false);
    const [filterZipArray, setFilterZipArr] = useState([]);

    //SCROLLVIEW
    const scroll = useRef(null);


    useEffect(() => {


        if (isVisible && arrStates) {

            setFilterArr(arrStates.filter((e) => {
                return e.name.includes(userState)
            }))
        }
    }, [userStateLocation])

    useEffect(() => {
        if (isCityVisible && arrCity) {

            setFilterCityArr(arrCity.filter((e) => {
                return e.name.includes(userCity)
            }))
        }
    }, [userCityLocation])

    let GetZipcodeByCity = userCity ? zipCodes.filter(e => e.City === userCity) : [];

    useEffect(() => {

    
        if (isZipVisible && GetZipcodeByCity) {
        if (!enterZipCode)
                setFilterZipArr(GetZipcodeByCity);
            else
                setFilterZipArr(GetZipcodeByCity.filter((e) => {
                    return (e.name.includes(enterZipCode))
                }))
        }
    }, [setZipCode])

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
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 0 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>Register Account</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Please fill the details below</Text>
            </View>
            <ScrollView
                ref={scroll}
                keyboardShouldPersistTaps='handled'
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <View style={{
                        flex: 8, marginStart: 30, marginTop: 15,
                        marginEnd: 30
                    }}>

                        <View style={{
                            ...styles.boxcontainer,

                            flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center',
                            shadowColor: validateName ? 'black' : 'darkred',
                            shadowOpacity: validateName ? 0.25 : 1
                        }}>

                            <Image source={Icons.icon_user} />
                            <TextInput placeholder="Name" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,
                            }}
                                autoCapitalize='none'
                                keyboardType="default"
                                onChangeText={(e) => setUserName(e)}
                                value={enterName} />
                        </View>


                        <View style={{
                            ...styles.boxcontainer,
                            marginTop: 15, flexDirection: 'row', padding: 20,
                            paddingTop: 0, paddingBottom: 0, alignItems: 'center',
                            shadowColor: validateEmail ? 'black' : 'darkred',
                            shadowOpacity: validateEmail ? 0.25 : 1
                        }}>

                            <Image source={Icons.icon_email} />
                            <TextInput placeholder="Email" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,
                                flex: 1,
                                marginEnd: 10,
                   
                            }}
                                autoCapitalize='none'
                                keyboardType="email-address"
                                onChangeText={(e) => setEmail(e)}
                                value={enterEmail} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validatePhone ? 'black' : 'darkred',
                            shadowOpacity: validatePhone ? 0.25 : 1,
                            marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 0,
                            paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_phone} />
                            <TextInput placeholder="Phone No" style={{
                                ...styles.styleTextInput,
                                marginStart: 10,
                                flex: 1,
                                marginEnd: 10,
                     
                            }}
                                maxLength={10}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                onChangeText={(e) => setPhone(e)}
                                value={enterPhone} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateState ? 'black' : 'darkred',
                            shadowOpacity: validateState ? 0.25 : 1,
                            marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_state} />
                            <TextInput placeholder="Select State"
                                ref={inputEl}
                            autoCapitalize='none'

                                onPressIn={() => {

                                    inputEl.current.focus();
                                    if (inputCity.current.isFocused())
                                        return

                                    setIsVisible(true);
                                    setIsCityVisible(false)
                                    setIsZipVisible(false)
                                    setFilterArr(arrStates)
                                    scroll.current.scrollTo({ x: 0, y: 150, animated: true })
                                }}
                                onChangeText={(e) => {
                                    userStateLocation({ name: e, stateId: -1 });
                                    setIsVisible(isVisible)
                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: 10,
                                    flex: 8,
                                    marginEnd: 10,

                                }}
                                keyboardType="default"
                                value={userState} />
                            <TouchableOpacity
                                onPress={() => {
                                    //setIsVisible(!isVisible);
                                    //setIsCityVisible(false)
                                    //setIsZipVisible(false)


                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} />
                            </TouchableOpacity>


                        </View>

                        {(isVisible) ? <View style={{
                            width: '100%',
                            marginTop: 10,
                            ...styles.boxcontainer,
                            height: 150,
                            shadowRadius: 4,
                            borderRadius: 10,
                            zIndex: 1

                        }}>

                            <FlatList
                                keyboardShouldPersistTaps='handled'
                                data={filterArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss()
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

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateCity ? 'black' : 'darkred',
                            shadowOpacity: validateCity ? 0.25 : 1,
                            marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 0,
                            paddingBottom: 0, alignItems: 'center',
                        }}>

                            <Image source={Icons.icon_city} />
                            <TextInput placeholder="Select City"
                                ref={inputCity}
                                autoCapitalize='none'
                                onPressIn={() => {
                                    setIsVisible(false)
                                    if (userState.length !== 0) {
                                        setIsCityVisible(true)
                                        setFilterCityArr(arrCity)
                                        setIsZipVisible(false)
                                        scroll.current.scrollTo({ x: 0, y: 200, animated: true })
                                    } else {
                                        alert("Please select state first..")
                                        setIsCityVisible(false)
                                        setIsZipVisible(false)
                                    }
                                }
                                }
                                onChangeText={(e) => {
                                    setIsVisible(false)
                                    userCityLocation({ name: e, cityId: -1 });
                                    setIsCityVisible(true)
                                    setIsZipVisible(false)
                                    scroll.current.scrollTo({ x: 0, y: 200, animated: true })

                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: 10,
                                    flex: 8,
                                    marginEnd: 10

                                }}
                                keyboardType="default"
                                autoCapitalize='none'
                                value={userCity}

                            />

                            <TouchableOpacity
                                onPress={() => {
                                    //setIsCityVisible(!isCityVisible);

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
                                keyboardShouldPersistTaps='handled'
                                data={filterCityArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss();
                                            userCityLocation({ name: item.item.name, cityId: item.item.id });
                                            setIsCityVisible(false)
                                            setIsZipVisible(false)

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

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateZipCode ? 'black' : 'darkred',
                            shadowOpacity: validateZipCode ? 0.25 : 1,
                            marginTop: 15, flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_zipcode} />

                            <TextInput placeholder="Zip Code"
                                ref={inputZipCode}
                                autoCapitalize='none'
                                onPressIn={() => {
                                    setIsVisible(false)
                                    setIsCityVisible(false)
                                    if (userCity.length !== 0) {
                                        setIsVisible(false)
                                        setIsCityVisible(false)
                                        setIsZipVisible(true)
                                        setFilterZipArr(GetZipcodeByCity)
                                        scroll.current.scrollTo({ x: 0, y: 300, animated: true })
                                    } else {
                                        alert("Please select city first..")
                                        setIsCityVisible(false)
                                        setIsZipVisible(false)
                                        setIsZipVisible(false)
                                    }
                                }
                                }
                                onChangeText={(e) => {
                                    setIsVisible(false)
                                    setIsCityVisible(false)
                                    setZipCode(e)
                                    setIsZipVisible(true)
                                    scroll.current.scrollTo({ x: 0, y: 300, animated: true })

                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: 10,
                                    flex: 8,
                                    marginEnd: 10

                                }}
                                autoCapitalize='none'
                                keyboardType="default"
                                value={enterZipCode}

                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setIsCityVisible(!isCityVisible);

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} />
                            </TouchableOpacity>
                        </View>
                        {(isZipVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: 10,
                            ...styles.boxcontainer,
                            height: 150,
                            shadowRadius: 4,
                            borderRadius: 10

                        }}>
                            <FlatList
                                keyboardShouldPersistTaps='handled'
                                data={filterZipArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss();
                                            setZipCode(item.item.name);
                                            setIsCityVisible(false)
                                            setIsZipVisible(false)

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
                                keyExtractor={item => item.City}
                            />
                        </View> : null}

                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            shadowColor: validatePassword ? 'black' : 'darkred',
                            shadowOpacity: validatePassword ? 0.25 : 1,
                            marginTop: 15, padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} />
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: 10
                                }}
                                autoCapitalize='none'
                                placeholder="Password"
                                value={enterPassword}
                                onChangeText={(e) => setPassword(e)} />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 25, alignItems: 'center',
                            paddingStart: 15,
                            paddingEnd: 0
                        }}>

                            <CheckBox
                                onClick={() => {
                                    setCheckTerms(!checkTerms)
                                }}
                                style={{ flex: 0 }}
                                isChecked={checkTerms}

                            />

                            <Text
                                numberOfLines={1}
                                style={{
                                    ...styles.generalTxt, fontSize: 14, color: 'black',
                                    textAlign: 'center'
                                }}>
                                {/* <Text> */}
                                I accept the </Text>
                                <TouchableOpacity style={{marginTop:-2}} onPress={(e) => openPolicyScreen(TERMS)}>
                                <Text
                                    style={{
                                        ...styles.generalTxt, fontSize: 14,
                                        textDecorationLine: 'underline',
                                        color: Colors.appBgColor,
                                    }}>Terms of Use</Text>
                                </TouchableOpacity>
                            <Text style={{
                                ...styles.generalTxt, fontSize: 14, color: 'black',
                                textAlign: 'center'
                            }}> and </Text>
                                <TouchableOpacity style={{ marginTop: -2 }} onPress={(e) => openPolicyScreen(POLICY)}>
                                <Text
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: Colors.appBgColor
                                    }}>Privacy Policy</Text>
                                </TouchableOpacity>
                            {/* </Text> */}


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
