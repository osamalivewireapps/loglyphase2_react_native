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
import _ from 'lodash'


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
            <View style={{ flex: 1, paddingStart: 30, paddingEnd: 30, paddingBottom: 30 }}>

                <Text style={{
                    ...styles.generalTxt, width: '100%', textAlign: 'center', color: 'black',
                    fontSize: 16, fontFamily: Fonts.type.base, marginTop: 15, marginBottom: -5
                }}>Pick upto 3 services</Text>
                <FlatList
                    data={DATA}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TouchableOpacity style={{
                                    backgroundColor: item.bg,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingStart: 20,
                                    paddingEnd: 10,
                                    marginTop: 20,
                                    height: 80,
                                    justifyContent: 'flex-end'

                                }} onPress={() => addServices({
                                    type: item.name,
                                    isSelect: selectedServices.length === 0 ? true : !isSelectService(selectedServices, index, item),
                                    index: index
                                })}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={18}
                                        fontSize={22}
                                        mode={ResizeTextMode.max_lines}
                                        style={{ ...styles.generalTxt, textAlign: 'left', flex: 7 }}>{item.name}
                                    </AutoSizeText>
                                    <Image source={item.url} flex={3} resizeMode='contain' />
                                </TouchableOpacity>

                                {selectedServices.length > 0 && isSelectService(selectedServices, index, item) ?
                                    (<Image source={Icons.icon_awesome_check_circle}
                                        style={{ position: 'absolute', marginTop: 20, marginStart: 0, height: 25, width: 25 }} />)
                                    : (null)
                                }

                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}

                />

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: 20
                }} onPress={() => btnNext()}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center', padding: 10,
                        paddingStart: 127, paddingEnd: 127,
                        paddingTop: 15, paddingBottom: 15,
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
        fontSize: 22,
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }
});

export default ServicesView;