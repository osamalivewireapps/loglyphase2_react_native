/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import ModalDropdown from 'react-native-modal-dropdown';
import { getAnimalCategories, getAnimalBreed } from '../../../actions/AnimalModule';
import AppLoader from '../../../components/AppLoader';
import DropDownPicker from 'react-native-dropdown-picker';

function FilterAnimal(props) {

    const { filterList, customFilters } = props.route.params;


    const TABS = ["Alive", "Dead", "Sick", "Pregnant"];

    const modalBreed = useRef(null);
    const modalAnimal = useRef(null);

    const [initialPg, setInitialPg] = useState(customFilters.animalType === 'Active' ? 0 : 1);
    const [tabsSelect, setTabsSelect] = useState(!customFilters.status ? -1 : TABS.findIndex((value) => value === customFilters.status));
    const [arrCategory, setArrCategory] = useState([]);
    const [breedId, setBreedId] = useState(null);
    const [catId, setCatId] = useState(null);
    const [listBreedType, setlistBreedType] = useState([]);
    const [breedType, setBreedType] = useState();
    const [isLoad, setIsLoading] = useState(false);

    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    useEffect(() => {

        setIsLoading(true);
        getAnimalCategories().then((response) => {
            setIsLoading(false);
            
            setItems(response.animalCategory.map((value) => {
                if (value.categoryId._id === customFilters.animalId)
                    setValue(value.categoryId.name);
                return ({ label: value.categoryId.name, value: value.categoryId._id })
            }))

        }).catch(() => {
            setIsLoading(false);
        });

    }, []);

    // useEffect(() => {
    //     if (!catId) {
    //         return;
    //     }

    //     modalBreed.current.select(-1);
    //     setIsLoading(true);
    //     getAnimalBreed(catId).then((response) => {
    //         setIsLoading(false);
    //         setlistBreedType(response.animalBreed.categoryId.breeds);
    //         setBreedType(response.animalBreed.categoryId.breeds[0].name);
    //     }).catch(() => {
    //         setIsLoading(false);
    //     });
    // }, [catId]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: verticalScale(30) }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                flex: 1, padding: moderateScale(30),

            }}>


                <View style={{
                    flexDirection: 'row', alignItems: 'center',

                }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                        <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{ height: moderateScale(20), width: moderateScale(20) }} />
                    </TouchableOpacity>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(20)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: '#464646',
                            textAlign: 'left',
                            marginStart: moderateScale(15),
                            fontFamily: Fonts.type.medium,
                        }}>Filter
                    </AutoSizeText>
                </View>

                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row',
                    marginTop: verticalScale(15),
                    height: verticalScale(35),
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
                            setInitialPg(0);
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
                            setInitialPg(1);
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

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(16)}
                    fontSize={moderateScale(16)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                        fontFamily: Fonts.type.medium,
                    }}>Health Status
                </AutoSizeText>

                <FlatList
                    data={TABS}
                    horizontal
                    style={{
                        marginTop: verticalScale(5),
                        maxHeight: verticalScale(35),
                    }}

                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity style={{
                                backgroundColor: tabsSelect === index ? '#503A9F' : 'white',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#503A9F',
                                borderWidth: 1,
                                marginEnd: moderateScale(10),
                            }} onPress={() => {
                                setTabsSelect(index);
                            }}>

                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: tabsSelect === index ? 'white' : '#464646',
                                        textAlign: 'center',
                                        fontSize: moderateScale(16),
                                        fontFamily: Fonts.type.medium,
                                        paddingStart: moderateScale(10),
                                        paddingEnd: moderateScale(10),
                                    }}>{item}
                                </Text>
                            </TouchableOpacity>

                        );
                    }}

                />

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                    }}>Animal Category
                </AutoSizeText>

                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    height: verticalScale(35),
                    marginTop: verticalScale(10),
                }}>

                    <DropDownPicker
                        showArrow={false}
                        labelStyle={{
                            fontSize: moderateScale(14),
                            color: 'black',
                            width: '100%',

                        }}
                        itemStyle={{
                            width: '100%', justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ width: Dimensions.get('screen').width - moderateScale(60) }}
                        style={{
                            width: Dimensions.get('screen').width - moderateScale(85),
                            height: verticalScale(40),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: moderateScale(15),

                        }}
                        items={items}
                        onChangeItem={(item) => {
                            setlistBreedType([]);
                            setCatId(item.value);
                        }}
                        placeholder={value ? value : "Select an item"}
                    />
                    
                    <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                </View>

                {/* <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                    }}>Breed
                </AutoSizeText> */}

                {/* <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    height: verticalScale(35),
                    marginTop: verticalScale(10),
                }}>

                    <ModalDropdown
                        ref={modalBreed}
                        style={{
                            width: '94%',
                            height: verticalScale(40),
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: moderateScale(15),

                        }}
                        defaultValue="Please select"
                        textStyle={{
                            fontSize: moderateScale(14),
                            color: 'black',
                            width: '100%',
                        }}

                        renderRow={(option) => {

                            return (
                                <Text style={{
                                    fontSize: moderateScale(14),
                                    padding: moderateScale(10),
                                    color: 'black',
                                    width: '100%',
                                }}>
                                    {option.name}
                                </Text>


                            );
                        }}

                        renderButtonText={(rowData) => {
                            return rowData.name;
                        }}

                        dropdownStyle={{
                            marginTop: verticalScale(20),
                            backgroundColor: 'white', width: Dimensions.get('screen').width - moderateScale(50),
                            marginStart: moderateScale(-16),
                        }}
                        dropdownTextStyle={{
                            fontSize: moderateScale(14),
                            color: 'black',
                            margin: moderateScale(5),
                            backgroundColor: 'white',
                        }}
                        onSelect={(index) => {
                            setBreedId(listBreedType[index].value);
                        }}
                        //defaultIndex={0}
                        options={listBreedType} />

                    <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                </View> */}
            </View>
            <View style={{
                padding: moderateScale(25),
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0.4,
                    backgroundColor: 'transparent',
                }} onPress={(e) => resetFilter(e)}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 22, textAlign: 'center',
                            padding: verticalScale(10),
                            fontFamily: Fonts.type.base,
                            color: '#464646',
                        }}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0.6, justifyContent: 'center',
                }} onPress={(e) => applyFilter(e)}>
                    <Text style={{
                        fontSize: 22, textAlign: 'center',
                        ...styles.generalTxt,
                    }}>APPLY FILTER</Text>
                </TouchableOpacity>
            </View>
            <AppLoader loader={{ isLoading: isLoad }} />
        </View>);

    function resetFilter() {
        setTabsSelect(-1);
        setInitialPg(0);
        props.navigation.pop()
    }

    function applyFilter() {
        filterList({
            animalType: initialPg === 0 ? 'Active' : 'Archieve',
            status: TABS[tabsSelect],
            animalId: catId,
            breedId: breedId
        })
        props.navigation.pop()
    }
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'white',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        height: moderateScale(46),
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
});

export default FilterAnimal;
