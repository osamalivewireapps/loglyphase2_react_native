/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { INDIVIDUAL, LOGLY_COMMUNITY, TYPES_OF_SERVICES } from '../../constants';
import { Colors, Fonts, Icons, Images } from '../../theme';

import * as Animatable from 'react-native-animatable';
import Util from '../../utils';
import { useCallback } from 'react';
import { Alert } from 'react-native';
//import messaging from '@react-native-firebase/messaging';

function HomeView(props) {


    const [isShow, setShow] = useState(false);
    const isTablet = Platform.isTV;

    const { toggleDrawer, userObject, accountType } = props;
    const PET_ACTIVITY =
        accountType && accountType.toLowerCase().includes(INDIVIDUAL.toLowerCase()) ?
            [{ bg: Images.img_pet_profile, txt: 'Pet Profiles' }, { bg: Images.img_activity, txt: 'Activity' }, { bg: Icons.icon_marketing, txt: 'Marketing' }] :
            [{ bg: Images.img_pet_profile, txt: 'Pet Profiles' }, { bg: Images.img_activity, txt: 'Activity' }, { bg: Icons.icon_reg_product, txt: 'Product\nInventory' }, { bg: Icons.icon_marketing, txt: 'Marketing' }];


    const rotateValueHolder = useRef(new Animated.Value(0)).current;

    const fadeAnim = useRef(new Animated.Value(0)).current;


    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 0,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
        }).start();
    };

    const marqueeAnimals = [
        ' Feed an Animal', ' Support a Non-Profit', ' Become a Foster',
        ' Volunteer',
    ];

    const bgColors = ["#4B24D5", "#39A8D6", "#45D685", "#C737AF", "#E58C45"];
    const [newName, setnewName] = useState(" Feed an Animal");
    const [newBgColor, setBgColor] = useState('#4B24D5');
  
    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * marqueeAnimals.length);
        setnewName(marqueeAnimals[index]);
        setBgColor(bgColors[index]);
    }, []);

    // useEffect(() => {
    //     const intervalID = setInterval(shuffle, 1500);
    //     return () => clearInterval(intervalID);
    // }, [shuffle]);

   
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { toggleDrawer.toggleDrawer(); }}>
                    <Image source={Icons.icon_burger_menu} resizeMode="contain" style={{ height: moderateScale(25), width: moderateScale(25) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                        <Image source={Icons.icon_search_home} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('NotificationListing')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                        <Image source={Icons.icon_notification} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    

                    <TouchableOpacity onPress={() => props.navigation.navigate('QrScan')} style={{ height: moderateScale(45), width: moderateScale(45) }}>

                        <Image source={Icons.icon_qrcode} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{}}>


                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(30),
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                    }}>Welcome,</Text>
                    <Text style={{
                        ...styles.generalTxt,
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                    }}>{userObject.name}</Text>

                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10) }}
                        data={PET_ACTIVITY}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (index === 0) {
                                            props.navigation.navigate('PetProfile');
                                        } else if (index === 1) {
                                            props.navigation.navigate('ScheduleListingActivity');
                                        }
                                        else if (index === 2) {
                                            if (accountType.toLowerCase().includes(INDIVIDUAL.toLowerCase())) { Util.topAlert('Coming Soon') }
                                            else {
                                            props.navigation.navigate('ProductListing');
                                        }
                                    }
                                        else if (index === 3) {
                                Util.topAlert('Coming Soon');
                            }
                        }}
                        style={{
                            borderRadius: moderateScale(10),
                            width: Dimensions.get('screen').width / moderateScale(2.2),
                            height: verticalScale(160),
                            marginEnd: moderateScale(10),
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            marginStart: index === 0 ? moderateScale(25) : 0,
                        }}
                    >
                        <Image
                            source={item.bg}
                            resizeMode="stretch"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }} />

                        <AutoSizeText
                            numberOfLines={2}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                fontFamily: Fonts.type.bold,
                                color: 'white',
                                marginBottom: verticalScale(15),
                                marginStart: moderateScale(15),
                            }}>{item.txt}
                        </AutoSizeText>
                    </TouchableOpacity>
                    );
                        }}


                    />

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(24),
                        marginTop: verticalScale(20),
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                    }}>Services</Text>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10) }}
                        data={TYPES_OF_SERVICES}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity

                                    onPress={() =>
                                        //props.navigation.navigate('AppointmentListing')
                                        Util.topAlert('Coming Soon')
                                    }
                                    style={{
                                        borderRadius: moderateScale(15),
                                        width: Dimensions.get('screen').width / moderateScale(2.2),
                                        height: verticalScale(130),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginEnd: moderateScale(10),
                                        marginStart: index === 0 ? moderateScale(25) : 0,
                                        backgroundColor: item.bg,
                                    }}
                                >
                                    <Image
                                        source={item.url}
                                        resizeMode="contain"
                                        resizeMethod="auto"
                                        style={{ width: '60%', height: '60%' }}
                                    />

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontFamily: Fonts.type.bold,
                                            color: 'white',
                                            paddingTop: verticalScale(10),
                                        }}>{item.name}
                                    </AutoSizeText>
                                </TouchableOpacity>
                            );
                        }}


                    />

                    <TouchableOpacity

                        onPress={() =>
                            Util.topAlert('Coming soon')
                        }
                        style={{
                            borderRadius: moderateScale(15),
                            flexDirection: 'row',
                            height: verticalScale(80),
                            marginTop: verticalScale(30),
                            marginEnd: moderateScale(25),
                            marginStart: moderateScale(25),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: newBgColor,
                        }}
                    >
                        <Image
                            source={Images.img_donate}
                            resizeMode="contain"
                            style={{
                                flex: 0.35,
                                height: '100%',
                            }}
                        />

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.bold,
                                color: 'white',
                                flex: 0.45,
                                marginStart: moderateScale(-45),
                                textAlign: 'left',
                            }}>{newName}
                        </AutoSizeText>


                        <TouchableOpacity
                            style={{
                                borderRadius: moderateScale(8),
                                justifyContent: 'center',
                                alignItems:'center',
                                backgroundColor: 'white',
                                height: moderateScale(30),
                                flex: 0.22,
                                margin: moderateScale(20),
                            }}
                        >
                            <AutoSizeText
                                numberOfLines={1}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.bold,
                                    color: Colors.appBgColor,
                                    textAlign: 'center',
                                    width:'100%'
                                }}>Donate Now
                            </AutoSizeText>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(24),
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                        marginTop: verticalScale(20),
                    }}>Logly Community</Text>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{
                            justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10),
                            marginBottom: verticalScale(10),
                        }}
                        data={LOGLY_COMMUNITY}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity

                                    onPress={() =>{
                                        //props.navigation.navigate('AppointmentListing')
                                        Util.topAlert('Coming Soon')
                                    }
                                    }
                                    style={{
                                        borderRadius: moderateScale(15),
                                        width: Dimensions.get('screen').width / moderateScale(2.2),
                                        height: verticalScale(100),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginEnd: moderateScale(10),
                                        marginStart: index === 0 ? moderateScale(25) : 0,
                                        backgroundColor: item.bg,
                                    }}
                                >

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontFamily: Fonts.type.bold,
                                            color: 'white',
                                            paddingTop: verticalScale(10),
                                        }}>{item.name}
                                    </AutoSizeText>
                                </TouchableOpacity>
                            );
                        }}


                    />

                </View>
            </ScrollView>

            {isShow ?

                <Animatable.View
                    animation="slideInUp"
                    duration={500}
                    direction="alternate"
                    easing="linear"
                    onAnimationEnd={() => { }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: Colors
                            .appBgColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                    <TouchableOpacity
                        onPress={() => setShow(false)}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                        <ImageBackground source={Images.img_bg_quickmenu}

                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                            }}
                        />


                        <Animated.View style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.bold,
                                    fontSize: moderateScale(30),
                                    marginBottom: moderateScale(30),
                                }}>Quick Menu</Text>
                                <View flexDirection="row" style={{
                                }}>
                                    {/* <Image source={Icons.icon_float_reg} resizeMode='contain'
                                style={{ height: moderateScale(20), width: moderateScale(20) }} /> */}

                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('RegisterPet');
                                        }}
                                    >
                                        <Text style={{
                                            ...styles.generalTxt,
                                            color: 'white',

                                            fontFamily: Fonts.type.medium,
                                            fontSize: moderateScale(20),
                                        }}>Register Animal</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: moderateScale(30),

                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('RegisterProduct', { updateProduct: {} });
                                        }}
                                    >
                                        <Text style={{
                                            ...styles.generalTxt,
                                            color: 'white',
                                            textAlign: 'center',
                                            fontFamily: Fonts.type.medium,
                                            fontSize: moderateScale(20),
                                        }}>Register Product</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: moderateScale(30),

                                }}>
                                    <Text style={{
                                        ...styles.generalTxt,
                                        color: 'white',

                                        fontFamily: Fonts.type.medium,
                                        fontSize: moderateScale(20),
                                    }}>Register a Sale</Text></View>


                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: moderateScale(30),

                                }}>
                                    <Text style={{
                                        ...styles.generalTxt,
                                        color: 'white',

                                        fontFamily: Fonts.type.medium,
                                        fontSize: moderateScale(20),
                                    }}>Book an Appointment</Text></View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: moderateScale(30),

                                }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('AddTeamMember', { updateContacts: {}, isTransfer: false });
                                        }}
                                    >
                                        <Text style={{
                                            ...styles.generalTxt,
                                            color: 'white',

                                            fontFamily: Fonts.type.medium,
                                            fontSize: moderateScale(20),
                                        }}>Add a Team Member</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: moderateScale(30),

                                }}>

                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('WelcomeRegistration');
                                        }}
                                    >
                                        <Text style={{
                                            ...styles.generalTxt,
                                            color: 'white',

                                            fontFamily: Fonts.type.medium,
                                            fontSize: moderateScale(20),
                                        }}>Setup Wizard</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </Animated.View>
                    </TouchableOpacity>
                </Animatable.View>

                :

                fadeOut()


            }

            <TouchableOpacity
                style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                    alignSelf: 'flex-end',
                    top: Dimensions.get('screen').height - (Platform.OS==='ios'?verticalScale(80):verticalScale(120)),
                    right: moderateScale(20),
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                onPress={() => {
                    setShow(!isShow);
                    spinImage();
                }}>
                <Image backgroundColor={isShow ? '#F7C637' : Colors.appBgColor}
                    style={{
                        height: moderateScale(50),
                        width: moderateScale(50),
                        borderRadius: moderateScale(50),
                        position: 'absolute',

                    }}

                />

                <Animated.Image
                    source={Icons.icon_white_plus}
                    style={{
                        height: moderateScale(20),
                        width: moderateScale(20),
                        transform: [{ rotate: isShow ? imgRotateClockWise() : imgRotateAntiClockWise() }],
                    }}>

                </Animated.Image>
            </TouchableOpacity>
            {fadeIn()}
            {spinImage()}


            {/* <FloatingAction
                actions={actions}
                shadow={
                    {
                        shadowOpacity: 0.35,
                        shadowOffset: { width: 0, height: 5 },
                        shadowColor: "transparent",
                        shadowRadius: 3
                    }
                }
                distanceToEdge={moderateScale(20)}
                iconWidth={moderateScale(20)}
                iconHeight={moderateScale(20)}
                buttonSize={moderateScale(50)}
                overlayColor="rgba(255, 255, 255, 0.95)"
                color={Colors.appBgColor}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}

            /> */}

        </View>
    );


    function spinImage() {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    function imgRotateClockWise() {

        if (!isShow) {
            return rotateValueHolder.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '0deg'],
            });
        }
        return rotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
        });
    }

    function imgRotateAntiClockWise() {

        if (!isShow) {
            return rotateValueHolder.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '0deg'],
            });
        }
        return rotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['45deg', '0deg'],
        });
    }
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
        width: '100%',
    },
    generalTxt: {
        color: '#464646',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base,
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30),
    },
});

export default HomeView;
