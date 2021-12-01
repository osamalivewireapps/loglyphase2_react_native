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
import { getFormCategory } from '../../../actions/AnimalModule';
import AppLoader from '../../../components/AppLoader';
import DropDownPicker from 'react-native-dropdown-picker';
import { VENDOR_ID, VET_ID } from '../../../constants';

function FilterContacts(props) {

    const { filterList, customFilters } = props.route.params;

    const [value, setValue] = useState(null);
    const [contactType, setContactType] = useState('');

    const [items, setItems] = useState([
        { label: 'Vendors', value: VENDOR_ID },
        { label: 'Veterinary', value: VET_ID }]);

    const isTablet = DeviceInfo.isTablet();

    useEffect(() => {
        if (customFilters.contactType) {
            setValue(customFilters.contactType === 'Vendors' ? items[0].label : items[1].label);
            setContactType(value)
        }
    }, []);


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




                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                    }}>Select Category
                </AutoSizeText>


                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    zIndex: 2,
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
                        dropDownStyle={{
                            width: Dimensions.get('screen').width - moderateScale(60)
                        }}
                        style={{
                            width: Dimensions.get('screen').width - moderateScale(85),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: moderateScale(15),

                        }}
                        items={items}
                        onChangeItem={(item) => {
                            setContactType(item.label)
                        }}
                        placeholder={value ? value : "Select an item"}
                    />

                    <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                </View>




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
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: verticalScale(10),
                            fontFamily: Fonts.type.base,
                            color: '#464646',
                        }}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0.6, justifyContent: 'center',
                }} onPress={(e) => applyFilter(e)}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center',
                        ...styles.generalTxt,
                    }}>APPLY FILTER</Text>
                </TouchableOpacity>
            </View>
        </View>);

    function resetFilter() {
        filterList({
            contactType: '',
        })
        props.navigation.pop()
    }

    function applyFilter() {
        filterList({
            contactType: contactType,
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

export default FilterContacts;
