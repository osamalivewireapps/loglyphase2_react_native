/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { backgroundColor } from "styled-system";
import { Fonts, Colors, Icons } from '../../../theme';
import _ from 'lodash';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


function ServicesView(props) {
    const { addServices, selectedServices, btnNext } = props;
    const DATA = [
        {
            name: 'Pet Grooming',
            url: require('../../../assets/Images/img_pet_grooming/img_pet_grooming.png'),
            bg: '#39A8D6',
            id: 1,
        },
        {
            name: 'Veterinary',
            url: require('../../../assets/Images/img_veterinary/img_veterinary.png'),
            bg: '#45D685',
            id: 2,
        },
        {
            name: 'Transportation',
            url: require('../../../assets/Images/img_transportation/img_transportation.png'),
            bg: '#E6A32F',
            id: 3,
        },
        {
            name: 'Pet Training',
            url: require('../../../assets/Images/img_pet_training/img_pet_training.png'),
            bg: '#C737AF',
            id: 4,
        },
        {
            name: 'Pet Walking / Sitting',
            url: require('../../../assets/Images/img_pet_walking/img_pet_walking.png'),
            bg: '#32288B',
            id: 5,
        },
        {
            name: 'Breeding',
            url: require('../../../assets/Images/img_breeding/img_breeding.png'),
            bg: '#E58C45',
            id: 6,
        },
        {
            name: 'Pet Boarding',
            url: require('../../../assets/Images/img_pet_boarding/img_pet_boarding.png'),
            bg: '#C90F22',
            id: 7,
        }
    ];
    return (
        <ScrollView>
            <View style={{ flex: 1, 
            paddingStart: moderateScale(30), 
                paddingEnd: moderateScale(30),
                paddingBottom: moderateScale(30) }}>

                <Text style={{
                    ...styles.generalTxt, width: '100%', textAlign: 'center', 
                    color: 'black',
                    fontSize: moderateScale(16), fontFamily: Fonts.type.base, marginTop: verticalScale(15),
                    marginBottom: verticalScale(-5)
                }}>Pick upto 3 services</Text>
                <FlatList
                    data={DATA}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TouchableOpacity style={{
                                    backgroundColor: item.bg,
                                    borderRadius: moderateScale(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingStart: moderateScale(20),
                                    paddingEnd: moderateScale(10),
                                    marginTop: verticalScale(20),
                                    height: verticalScale(65),
                                    justifyContent: 'flex-end'

                                }} onPress={() => addServices({
                                    type: item.name,
                                    isSelect: selectedServices.length === 0 ? true : !isSelectService(selectedServices, index, item),
                                    index: index
                                })}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(18)}
                                        fontSize={moderateScale(22)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{ ...styles.generalTxt, textAlign: 'left', flex: moderateScale(7) }}>{item.name}
                                    </AutoSizeText>
                                    <Image source={item.url} flex={3} resizeMode='contain' style={{ height: verticalScale(45), width: moderateScale(45)}} />
                                </TouchableOpacity>

                                {selectedServices.length > 0 && isSelectService(selectedServices, index, item) ?
                                    (<Image source={Icons.icon_awesome_check_circle}
                                        resizeMode='contain'
                                        style={{ position: 'absolute', marginTop: verticalScale(20), marginStart: 0, height: verticalScale(17), width: moderateScale(18) }} />)
                                    : (null)
                                }

                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}

                />

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: verticalScale(20)
                }} onPress={() => btnNext()}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(10), paddingBottom: verticalScale(10),
                        ...styles.generalTxt
                    }}>NEXT</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

function isSelectService(selectedServices, index, item) {

    let itemService = selectedServices.find(e => e.type === item.name);
    if (itemService) {
        return itemService.isSelect;
    } else {
        return false;
    }


}

const styles = StyleSheet.create({

    generalTxt: {
        color: 'white',
        fontSize: moderateScale(22),
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30)
    }
});

export default ServicesView;