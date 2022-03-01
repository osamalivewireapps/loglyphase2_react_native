/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { RefreshControl, TextInput, FlatList, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { getBreederForSale } from '../../../actions/Sales';
import { useDispatch } from 'react-redux';


function TransferListingView(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [contactList, setContactList] = useState([]);

    const isTablet = Platform.isTV;

    const { listContacts, updateContacts, removeMember, refreshList } = props;
    const { animalData, updateAnimalList } = props.route.params;

    const listBorderColors = ['#FE8B19', '#F044F7'];
    const [isEditShow, setEditShow] = useState(-1);

    console.log('contacts--->', listContacts);

    let disptach = useDispatch();

    useEffect(() => {
        if (searchTxt.length > 3) {
            getGlobalTeamMembers();
        } else if (searchTxt.length ===0){
            refreshList()
        }
    }, [searchTxt]);

    useEffect(() => {
        setContactList(listContacts);
        setRefreshing(false);
    }, [listContacts]);


    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        refreshList();
    }

    function getGlobalTeamMembers() {
        disptach(getBreederForSale(searchTxt)).then((response) => {
            setContactList(response.payload)
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'black',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(15)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: Colors.appBgColor,
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Transfer Animals

                    </AutoSizeText>
                    <Image source={Icons.icon_header_teammember} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }} />
                </View>

            </View>
            <View style={{ flex: 1 }}>

                <View style={{ padding: moderateScale(25), paddingBottom: 0, flexDirection: 'row', width: '100%' }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'flex-end',
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10)
                        }}>

                            <TextInput
                                onChangeText={(e) => {
                                    setSearchTxt(e)
                                }}
                                value={searchTxt}
                                placeholder='Search Team Members'
                                numberOfLines={1}
                                keyboardType='default'
                                autoCapitalize='none'
                                style={{
                                    keyboardShouldPersistTaps: true,
                                    flex: 0.9,
                                    height: verticalScale(40),
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    fontSize: moderateScale(14),
                                }} />
                            <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                        </View>


                    </View>
                </View>


                <FlatList
                    contentContainerStyle={{
                        padding: moderateScale(25),
                        paddingBottom: verticalScale(80)
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={contactList}
                    renderItem={({ item, index }) => {
                        return (
                            getFriendItem(item, index)
                        )
                    }}
                    keyExtractor={(item) => item.id}

                />




            </View>

            <TouchableOpacity
                style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                    alignSelf: 'flex-end',
                    top: Dimensions.get('screen').height - (Platform.OS === 'ios' ? verticalScale(80) : verticalScale(120)),
                    right: moderateScale(20),
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
                onPress={() => {
                    props.navigation.navigate('AddTeamMember', { updateContacts: updateContacts, isTransfer: true })
                }}>
                <Image backgroundColor={Colors.appBgColor}
                    style={{
                        height: moderateScale(50),
                        width: moderateScale(50),
                        borderRadius: moderateScale(50),
                        position: 'absolute'

                    }}

                />
                <Image
                    source={Icons.icon_white_plus}
                    style={{
                        height: moderateScale(20),
                        width: moderateScale(20),
                    }}>

                </Image>
            </TouchableOpacity>
        </View>

    );

    function getFriendItem(item, index) {

        console.log("image--->", item.image);

        return (
            <TouchableOpacity

                onPress={() => props.navigation.navigate('SummaryAnimalsView', { id: item._id, updateContacts: updateContacts, staffData: item, animalData: animalData, popScreen: 2, updateList: updateAnimalList })}
                style={{
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(10),
                    height: verticalScale(50),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingEnd: moderateScale(0)

                }}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: verticalScale(50), width: moderateScale(60)
                }} >

                    <ImagePlaceholder
                        showActivityIndicator={false}
                        activityIndicatorProps={{
                            size: 'small',
                            color: '#777777',
                        }}
                        resizeMode='cover'
                        placeholderStyle={{
                            width: moderateScale(50),
                            height: moderateScale(50),
                            borderRadius: moderateScale(50),

                        }}
                        imgStyle={{
                            borderRadius: moderateScale(50),
                            borderColor: 'transparent',
                            borderWidth: moderateScale(2),
                            width: moderateScale(50),
                            height: moderateScale(50),
                        }}

                        style={{
                            borderRadius: moderateScale(50),
                            height: moderateScale(50),
                        }}

                        src={item.image ? item.image : ''}
                        placeholder={Images.img_user_placeholder}
                    />
                </View>

                <View style={{
                    flex: 1,
                    marginStart: moderateScale(15),
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            paddingEnd: moderateScale(10),
                            color: Colors.appBgColor
                        }}>{item.name}
                    </AutoSizeText>
                    <View style={{ flexDirection: 'row' }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                paddingEnd: moderateScale(10),
                                color: '#464646',
                                marginTop: verticalScale(5)
                            }}>{item.phone && item.phone.length > 0 ? item.phone : ''}
                        </AutoSizeText>
                    </View>

                </View>

                {isEditShow === index ?
                    <View style={{
                        height: verticalScale(70),
                        flex: moderateScale(0.145),
                        marginTop: 0,
                        marginBottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageBackground
                            source={Images.img_popup_services}
                            style={{
                                position: 'absolute', height: '100%',
                                width: '100%'
                            }} />
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            style={{
                                justifyContent: 'center', width: '90%', height: verticalScale(15),
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                setEditShow(-1)
                                props.navigation.navigate('AddTeamMember', { contactData: item, updateContacts: updateContacts,isTransfer:true })
                            }}>
                            <Image source={Icons.icon_services_edit}
                                resizeMode='contain' style={{
                                    marginEnd: moderateScale(2), height: verticalScale(10), width: moderateScale(15)
                                }}

                            />
                        </TouchableOpacity>
                        <View style={{
                            width: '50%',
                            height: verticalScale(0.5),
                            backgroundColor: '#585858',
                            marginEnd: moderateScale(5),
                            marginTop: verticalScale(8),
                            marginBottom: verticalScale(8)
                        }} />
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            style={{
                                justifyContent: 'center', width: '90%', height: verticalScale(15),
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setEditShow(-1)
                                removeMember(item._id);
                            }}>
                            <Image source={Icons.icon_services_delete}
                                resizeMode='contain'
                                style={{
                                    marginEnd: moderateScale(3),
                                    height: verticalScale(12),
                                    width: moderateScale(15)
                                }} />
                        </TouchableOpacity>
                    </View> : <View flex={moderateScale(0.1)} />}

            </TouchableOpacity>
        )
    }

}

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

export default TransferListingView;