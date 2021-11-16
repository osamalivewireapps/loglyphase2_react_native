/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import ViewPager from '@react-native-community/viewpager';
import ActiveProfile from './ActiveProfile';
import ArchiveProfile from './ArchiveProfile';
import { CommonActions } from '@react-navigation/routers';

function PetProfileView(props) {

    const pagerRef = useRef(null);
    const [initialPg, setInitialPg] = useState(0);

    const isTablet = DeviceInfo.isTablet();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#161D6E',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(200)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                            });

                            props.navigation.dispatch(resetAction);

                        }}>


                            <Image source={Icons.icon_header_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(25)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Pet Profile

                    </AutoSizeText>
                    <Image source={Icons.icon_pet_profile} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ flex: 1, height: Dimensions.get('window').height }}>

                    <View style={{
                        ...styles.boxcontainer, margin: moderateScale(20),
                        marginBottom: 0, width: '88%', flexDirection: 'row',
                    }}>

                        <TouchableOpacity
                            style={{
                                width: '50%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: moderateScale(10),
                                backgroundColor: initialPg === 0 ? '#FFC081' : 'transparent',
                            }}
                            onPress={() => {
                                pagerRef.current.setPage(0)
                                setInitialPg(0)
                            }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.medium,
                                color: Colors.appBgColor,
                            }}>
                                Active
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: '50%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: moderateScale(10),
                                backgroundColor: initialPg === 1 ? '#FFC081' : 'transparent',
                            }}
                            onPress={() => {
                                pagerRef.current.setPage(1)
                                setInitialPg(1)
                            }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.medium,
                                color: Colors.appBgColor,
                            }}>
                                Archive
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ViewPager style={{ flex: 1 }}
                        initialPage={initialPg}
                        scrollEnabled={false} ref={pagerRef}>
                        <ActiveProfile key={0} {...props} />
                        <ArchiveProfile key={1} {...props}/>

                    </ViewPager>


                </View>
            </ScrollView>
        </View>

    );


}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'transparent',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(46),
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
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
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    }
});

export default PetProfileView;