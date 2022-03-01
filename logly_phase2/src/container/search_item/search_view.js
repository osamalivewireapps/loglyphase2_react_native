/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { TextInput, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../theme';

import ViewPager from '@react-native-community/viewpager';
import SearchResults from './searchresult';
import { ActivityIndicator } from 'react-native';

function SearchView(props) {

    const { searchData, globalSearch, addSearch, resentSearch, delSearch, isLoading } = props;

    const [searchTxt, setSearchTxt] = useState('');

    const pagerRef = useRef(null)

    console.log('recent search-->', resentSearch.length + '--' + globalSearch.length)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                padding: moderateScale(25),
                paddingBottom: moderateScale(10),
                flexDirection: 'row', alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                    <Image source={Icons.icon_black_arrow} resizeMode='contain' style={{ height: moderateScale(20), width: moderateScale(20) }} />
                </TouchableOpacity>
                <View style={{
                    marginStart: moderateScale(10),
                    flex: 1, flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(25)
                }}>

                    <TextInput
                        onChangeText={(e) => {
                            searchData(e)
                            setSearchTxt(e)
                        }}
                        value={searchTxt}
                        placeholder='Search'
                        numberOfLines={1}
                        keyboardType='default'
                        autoCapitalize='none'
                        style={{
                            keyboardShouldPersistTaps: true,
                            flex: 0.9,
                            height: verticalScale(30),
                            ...styles.generalTxt,
                        }} />

                    {isLoading ? <ActivityIndicator style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10) }} /> :

                        <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10) }} />
                    }

                </View>
            </View>

            <View style={{ backgroundColor: '#707070', width: '100%', height: verticalScale(0.5) }} />



            <ViewPager

                style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>

                {getSearchView()}
                <View key={1} style={{ paddingTop: verticalScale(10) }}>
                    <SearchResults {...props} searchData={globalSearch} addSearch={addSearch} navigateScreen={(e) => navigateScreen(e)} />
                </View>

            </ViewPager>



        </View>);

    function getSearchView() {
        return (
            <View key={0} style={{ padding: moderateScale(25), paddingTop: 0 }}>

                {globalSearch.length > 0 || resentSearch.length === 0 ? <View /> :
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            marginTop: verticalScale(10),
                            marginStart: moderateScale(25),
                            fontFamily: Fonts.type.medium,
                            color: '#404040'
                        }}>Recent Searches
                    </AutoSizeText>
                }
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{
                        paddingBottom: verticalScale(80),
                    }}
                    data={globalSearch.length > 0 ? globalSearch : resentSearch}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => resentSearch.length > 0 ? navigateScreen(item) : pagerRef.current.setPage(1)}

                                style={{
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    height: verticalScale(30),
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>

                                <Image source={Icons.icon_feather_search} resizeMode='contain'
                                    style={{
                                        height: moderateScale(15),
                                        width: moderateScale(15),
                                    }} />
                                <View style={{
                                    flex: 1,
                                    marginStart: moderateScale(15),
                                    marginEnd: moderateScale(15),
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontFamily: Fonts.type.medium,
                                            color: Colors.appBgColor
                                        }}>{item.name}
                                    </AutoSizeText>


                                </View>
                                {globalSearch.length > 0 ? null :
                                    <TouchableOpacity
                                        onPress={() => delSearch(item._id)}
                                    >
                                        <Image source={Icons.icon_close} resizeMode='contain'
                                            style={{
                                                height: moderateScale(15), width: moderateScale(15),
                                            }} />
                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        )
                    }}

                />

            </View>
        )
    }

    function navigateScreen(item) {
        switch (item.type.toLowerCase()) {
            case 'animal':
                props.navigation.navigate('PetDetail', { id: item.searchId ? item.searchId : item.id, updateContacts: {} });
                if (!item.searchId) {
                    addSearch({
                        name: item.name,
                        searchId: item.id,
                        type: item.type
                    })
                }
                break;

            case 'product':
                props.navigation.navigate('ProductDetail', { id: item.searchId ? item.searchId : item.id, updateContacts: {} })
                if (!item.searchId) {
                    addSearch({
                        name: item.name,
                        searchId: item.id,
                        type: item.type
                    })
                }
                break;

            default:
                props.navigation.navigate('ViewProfile', { id: item.searchId ? item.searchId : item.id})
                if (!item.searchId) {
                    addSearch({
                        name: item.name,
                        searchId: item.id,
                        type: item.type
                    })
                }
                break;
        }
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
        width: '100%'
    },
    generalTxt: {
        color: '#464646',
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

export default SearchView;
