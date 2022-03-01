/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';

import ViewPager from '@react-native-community/viewpager';
import moment from 'moment';
import ImageBlurLoading from 'react-native-image-blur-loading';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { TextInput } from 'react-native';
import { getAnimals, getAnimalsById } from '../../../actions/AnimalModule';

function PetListing(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [animalList, setAnimalList] = useState([]);
    const [orgAnimalList, setOrgAnimalList] = useState([]);

    const isTablet = Platform.isTV;

    const { isSameUser, memberId } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (orgAnimalList.length > 0) {
            setAnimalList(orgAnimalList.filter((e) => {
                return (e.data.name.toLowerCase().startsWith(searchTxt.toLowerCase()) || e.categoryName.toLowerCase().includes(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);


    useEffect(() => {
        getAnimalsList();
    }, []);

    return (<ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ flex: 1, minHeight: Dimensions.get('window').height }}>

            <View style={{
                padding: moderateScale(25),
                paddingTop: verticalScale(10),
                paddingBottom: 0, flexDirection: 'row', width: '100%'
            }}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'flex-end', backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                    }}>

                        <TextInput
                            onChangeText={(e) => {
                                setSearchTxt(e)
                            }}
                            value={searchTxt}
                            placeholder='Search an animal'
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

            <View flex={1}>
                <FlatList
                    numColumns={2}
                    contentContainerStyle={{
                        flex: 1, padding: moderateScale(25), paddingTop: moderateScale(10)
                    }}
                    data={animalList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('PetDetail', { id: item._id, updateAnimal: (e) => getAnimalsList(e) })
                                }}
                                style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginEnd: (index % 2 === 0) ? (index === animalList.length - 1) ? 0 : verticalScale(10) : 0,
                                    flex: 1,
                                    height: isTablet ? verticalScale(195) : verticalScale(160),
                                }}>

                                <View style={{
                                    width: '100%',
                                    flex: 1,
                                    backgroundColor: 'white',
                                    borderRadius: moderateScale(10),

                                }}>

                                    <ImagePlaceholder
                                        showActivityIndicator={false}
                                        activityIndicatorProps={{
                                            size: 'small',
                                            color: '#777777',
                                        }}
                                        resizeMode='cover'
                                        placeholderStyle={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: moderateScale(10),
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,

                                        }}
                                        imgStyle={{
                                            borderRadius: moderateScale(10),
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderWidth: 1,
                                            borderColor: 'transparent',
                                        }}

                                        style={{
                                            borderRadius: moderateScale(10)
                                        }}

                                        src={item.image ? item.image : ''}
                                        placeholder={Icons.icon_paw}
                                    />


                                    <View style={{
                                        padding: moderateScale(5),
                                        paddingTop: moderateScale(8),
                                        paddingStart: moderateScale(8),
                                        paddingEnd: moderateScale(8),
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(15)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                fontFamily: Fonts.type.bold,
                                                color: '#464646',
                                                width: '60%',
                                                textAlign: 'left',
                                                textAlignVertical: 'center',
                                            }}>{item.data.name}
                                        </AutoSizeText>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                fontFamily: Fonts.type.medium,
                                                color: '#464646',
                                                width: '40%',
                                                textAlign: 'right'

                                            }}>{item.categoryName}
                                        </AutoSizeText>
                                    </View>
                                    <View style={{
                                        padding: moderateScale(5),
                                        paddingTop: 0,
                                        paddingStart: moderateScale(8),
                                        paddingEnd: moderateScale(8),
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(10)}
                                            fontSize={moderateScale(12)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#777777',
                                                width: '30%',
                                                textAlign: 'left',
                                            }}>Reg Date
                                        </AutoSizeText>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(10)}
                                            fontSize={moderateScale(12)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#777777',
                                                width: '70%',
                                                textAlign: 'right'

                                            }}>{moment(item.createdAt).format('DD MMM YYYY')}
                                        </AutoSizeText>
                                    </View>
                                    <View style={{
                                        padding: moderateScale(5),
                                        paddingTop: 0,
                                        paddingStart: moderateScale(8),
                                        paddingEnd: moderateScale(8),
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(10)}
                                            fontSize={moderateScale(12)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#777777',
                                                width: '30%',
                                                textAlign: 'left',
                                            }}>Status
                                        </AutoSizeText>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(10)}
                                            fontSize={moderateScale(12)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#464646',
                                                width: '70%',
                                                textAlign: 'right'

                                            }}>{item.status}
                                        </AutoSizeText>
                                    </View>

                                </View>



                            </TouchableOpacity>
                        )
                    }}

                />

            </View>


        </View>
    </ScrollView>);


    function getAnimalsList() {

        if (isSameUser)
            dispatch(getAnimals('Active')).then((response) => {
                console.log("animal list---->", response.payload)
                setOrgAnimalList(response.payload);
                setAnimalList(response.payload);

            })

        else { 
            dispatch(getAnimalsById(memberId)).then((response) => {
                console.log("animal list---->", response.payload)
                setOrgAnimalList(response.payload);
                setAnimalList(response.payload);

            })
        }
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
export default PetListing;