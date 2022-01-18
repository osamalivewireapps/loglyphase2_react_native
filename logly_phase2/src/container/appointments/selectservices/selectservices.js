/* eslint-disable react/self-closing-comp */
/* eslint - disable curly * /
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { AutoSizeText } from 'react-native-auto-size-text';
import CollapsibleSection from '../../../components/CollapsibleSection';
import { verticalScale, moderateScale } from 'react-native-size-matters';

export const SelectServiceView = (props) => {

    const SERVICES_DATA = ['Hair Grooming', 'Lice Treatment', 'Paw Cleaning', 'Nail Trimming'];
    const [select, isSelected] = useState(-1);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                padding: moderateScale(25),
                flexDirection: 'row', alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                    <Image source={Icons.icon_whitebg_back} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>


                    <TouchableOpacity onPress={() => {
                        const resetAction = CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                        });

                        props.navigation.dispatch(resetAction);

                    }}>


                        <Image source={Icons.icon_header_home} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                </View>

            </View>


            <View style={{
                flex: 1, justifyContent: 'flex-end',
                padding: moderateScale(25),
                paddingTop:0,
            }}>
                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(16)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#404040',
                        marginBottom: verticalScale(25),

                    }}
                >
                    Select the Service
                </AutoSizeText>

                {renderExpandableList()}


                <TouchableOpacity style={{
                    ...styles.styleButtons,
                    marginTop: verticalScale(10),
                    width: '80%',
                    alignSelf: 'center',



                }} onPress={() => { props.navigation.navigate('SelectDateServices'); }}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center',
                        padding: moderateScale(10),
                        paddingTop: moderateScale(12),
                        paddingBottom: moderateScale(12),
                        ...styles.generalTxt,
                    }}>PROCEED</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    function renderExpandableList() {
        return (
            <FlatList
                data={SERVICES_DATA}
                renderItem={({ item, index }) => (
                    renderCollapsibleItem(item, index)
                )}
            />
        );
    }


    function renderCollapsibleItem(item, index) {
        return (
            <CollapsibleSection
                styles={{
                    marginTop: verticalScale(8),
                    ...styles.boxcontainer,
                    shadowColor: 'white',

                }}
                header={
                    <View

                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            //height: verticalScale(40),
                            flexDirection: 'row',
                            paddingEnd: moderateScale(15),
                        }}>
                        <View style={{
                            width: '60%',
                            padding: moderateScale(15),
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.medium,
                                fontSize: moderateScale(13),
                                color: '#464646',


                            }}>{item}</Text>
                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(13),
                                color: '#A1A1A1',

                            }}>Duration 30 Mins</Text>
                        </View>

                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            fontSize: moderateScale(13),
                            color: Colors.appBgColor,
                            width: '15%',
                            textAlign: 'center',


                        }}>$30</Text>

                        <TouchableOpacity
                            onPress={() => addServices(index)}
                            style={{
                                width: '20%',
                                marginEnd: moderateScale(10),
                                alignItems: 'center',
                                borderRadius: moderateScale(6),
                                borderWidth: verticalScale(1),
                                borderColor: Colors.appBgColor,
                                backgroundColor: select === index ? Colors.appBgColor : 'white',
                            }}
                        >


                            <Text style={{
                                ...styles.generalTxt,
                                paddingStart: moderateScale(8),
                                paddingEnd: moderateScale(8),
                                padding: moderateScale(2),
                                color: select === index ? 'white' : Colors.appBgColor,
                                fontSize: moderateScale(10),
                            }}> {select === index ? 'Selected' : 'Select'} </Text>

                        </TouchableOpacity>
                        <Image source={Icons.icon_ios_arrow_down} style={{
                            height: verticalScale(5), width: moderateScale(8),
                        }} />

                    </View>
                }
                children={getAccountView(item, index)}
            >
            </CollapsibleSection>
        );
    }

    function getAccountView(subData, outerId) {


        return (
            <View

                style={{
                    padding:moderateScale(15),
                    justifyContent: 'center',

                }}>

                <Text
                    style={{
                        ...styles.generalTxt,
                        color: '#A1A1A1',
                        fontSize: moderateScale(12),

                    }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>


            </View>

        );



    }

    function addServices(index) {
        isSelected(index);
    }
};

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'black',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%',
    },
    generalTxt: {
        color: 'white',
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
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});
