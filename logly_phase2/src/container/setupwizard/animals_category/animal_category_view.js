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

const AnimalCategories = ["Dog", "Cat", "Horse", "Parrot", "Deer", "Rabbit"];

function AnimalCategoryView(props) {
    const { addServices, selectedServices, animalType, clickNextBtn } = props;

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingStart: 30, paddingEnd: 30, paddingBottom: 30 }}>

                <View style={{
                    backgroundColor: getAnimalCategory(animalType).bg,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingStart: 20,
                    paddingEnd: 10,
                    marginTop: 35,
                    marginBottom: 15,
                    height: 100,
                    justifyContent: 'flex-end'

                }} >

                    <View flex={7}  >
                        <Text style={{ ...styles.generalTxt, fontSize: 14 }} >Please Select the Animal Categories for </Text>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={16}
                            fontSize={18}
                            mode={ResizeTextMode.max_lines}
                            style={{ ...styles.generalTxt, textAlign: 'left', 
                            
                                color: (getAnimalCategory(animalType).name.toLowerCase().includes('pet walking') ||
                                    getAnimalCategory(animalType).name.toLowerCase().includes('breeding') ||
                                    getAnimalCategory(animalType).name.toLowerCase().includes('boarding')) ? 'white' : 'black',
                            
                            marginTop: 10, }}>{getAnimalCategory(animalType).name.toString().toUpperCase()}
                        </AutoSizeText>
                    </View>
                    <Image source={getAnimalCategory(animalType).url} flex={3} resizeMode='contain' />
                </View>
                <FlatList
                    numColumns={2}
                    data={AnimalCategories}
                    style={{}}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isSelectService(selectedServices, index, item) ?'#FFC081':'#F5F5F5',
                                borderRadius: 10,
                                marginTop: 20,
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: (index % 2) === 0 ? 0 : 10,
                            }} onPress={() => addServices({
                                type: item,
                                isSelect: selectedServices.length === 0 ? true : !isSelectService(selectedServices, index, item),
                                index: index
                            })}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={14}
                                    fontSize={16}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: Colors.appBgColor
                                    }}>{item}
                                </AutoSizeText>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.id}

                />

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: 35
                }} onPress={() => { clickNextBtn()}}>
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

    let itemService = selectedServices.find(e => e.type === item);
    if (itemService) {
        return itemService.isSelect;
    } else {
        return false;
    }
}

function getAnimalCategory(type) {
    return DATA.find((x) => {
        return x.name.toLowerCase() === type.toLowerCase()
    });
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

export default AnimalCategoryView;