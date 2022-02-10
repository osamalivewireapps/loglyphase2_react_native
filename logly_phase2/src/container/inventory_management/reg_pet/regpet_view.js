/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-gesture-handler';
import Util from '../../../utils';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AppLoader from '../../../components/AppLoader';
import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import VideoPlayer from 'react-native-video-player';
import { INDIVIDUAL } from '../../../constants';

function RegisterPetView(props) {


    const { accountType, deletePic, isLoad, animalCategories, animalBreed, getAnimalBreed,
        capturePic, imgUri, addProduct, capturePicCollections, listPhotoCollections } = props;

    const animalData = props.route?.params?.animalData;

    console.log('animalData---->', animalData);

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [isCalSheetVisible, setCloseCalSheet] = useState(false)
    const [isBreedSheetVisible, setCloseBreedSheet] = useState(false)

    const [petIndex, setPetIndex] = useState(-1);
    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(animalData ? animalData.data.name : '');
    const [valueDesc, setDesc] = useState(animalData ? animalData.data.Notes : '');
    const [validateDesc, setValidateDesc] = useState(true);
    const [serviceTypeIndex, setServiceTypeIndex] = useState(animalData ? animalData.data.Sex === 'Male' ? 0 : 1 : 0);
    const [listBreed, setListBreed] = useState([]);
    const [listAnimalBreed, setListAnimalBreed] = useState([]);
    const [dialogVisibleStatus, setDialogVisibleStatus] = useState(false);
    const [validateQuantity, setValidateQuantity] = useState(true);
    const [valueQuantity, setValueQuantity] = useState(animalData && animalData.data.quantity != null ? animalData.data.quantity + "" : '1');
    const [captureCollection, setCaptureCollection] = useState(false);
    const [validatePrice, setValidatePrice] = useState(true);
    const [valuePrice, setValuePrice] = useState(animalData ? animalData.data.price : '');
    const [father, setFather] = useState();
    const [mother, setMother] = useState();
    const [children, setChildren] = useState([]);
    const [searchTxt, setSearchTxt] = useState('');

    const sheetRef = useRef(null);
    const sheetCalRef = useRef(null);
    const sheetBreedRef = useRef(null);

    const isTablet = DeviceInfo.isTablet();

    useEffect(() => {

        if (animalData) {
            let index = animalCategories.findIndex((value) => {
                return value.categoryId._id === props.route.params.animalData.categoryId._id;
            })
            setPetIndex(index);

            if (index > -1) {
                animalData.data.breed.forEach((value) => {
                    animalCategories[index].categoryId.breeds.forEach((inner) => {
                        if (value === inner.name) {
                            selectBreed(inner);
                        }
                    });

                });
            }
        }
    }, [animalCategories])

    useEffect(() => {
        if (animalBreed.length > 0) {
            setListAnimalBreed(animalBreed.filter((e) => {
                return (e.name.toLowerCase().startsWith(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

    useEffect(() => {
        if (animalBreed.length > 0) {
            setListAnimalBreed(animalBreed)
        }
    }, [animalBreed]);

    //////////////////////////  CALENDAR ////////////////////////
    const initialDate = moment().format('YYYY-MM-DD');
    const [selected, setSelected] = useState(animalData ? (animalData.data.DOB ? moment(animalData.data.DOB).format('YYYY-MM-DD') : initialDate) : initialDate);

    let markedDates = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.appBgColor,
            selectedTextColor: 'white',
        }
    };

    const onDayPress = day => {
        setSelected(day.dateString);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#FFB531',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(160)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View> */}

                </View>

                <View style={{
                    flexDirection: 'row',
                    height: moderateScale(60),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(25)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: '#161D6E',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        {animalData ? 'Edit Profile' : 'Register Pet'}

                    </AutoSizeText>
                    <Image source={Images.img_reg_pet} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}

            >
                <ScrollView
                    keyboardShouldPersistTaps='handled'>




                    <View style={{
                        flex: 1,
                        padding: moderateScale(25),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%'
                                    }}>
                                    {petIndex > -1 ? animalCategories[petIndex].categoryId.name : 'Select Pet Category'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showPetCategory()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}

                        <RBSheet
                            ref={sheetCalRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showCalendarSheet()}
                        </RBSheet>

                        {isCalSheetVisible ? sheetCalRef.current.open() : null}

                        {petIndex > -1 ?
                            <View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#F4F4F4', alignSelf: 'center',
                                        height: moderateScale(90),
                                        width: moderateScale(90),
                                        borderRadius: moderateScale(100),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: verticalScale(20),
                                        marginBottom: verticalScale(10),
                                    }}
                                    onPress={() => {
                                        setDialogVisibleStatus(true);
                                    }}
                                >

                                    <ImagePlaceholder
                                        showActivityIndicator={false}
                                        activityIndicatorProps={{
                                            size: 'small',
                                            color: '#777777',
                                        }}
                                        resizeMode='cover'
                                        placeholderStyle={{
                                            height: moderateScale(90),
                                            width: moderateScale(90),
                                            borderRadius: moderateScale(100),

                                        }}
                                        imgStyle={{
                                            borderRadius: moderateScale(100),
                                            borderWidth: 1,
                                            height: moderateScale(90),
                                            width: moderateScale(90),
                                            borderColor: 'transparent'
                                        }}

                                        style={{
                                            borderRadius: moderateScale(100),
                                            position: 'absolute'
                                        }}

                                        src={imgUri}
                                        placeholder={imgUri ? Icons.icon_user : ''}
                                    />

                                    {!imgUri ?
                                        <Image
                                            source={Icons.icon_awesome_plus}

                                            resizeMode="contain"
                                            style={{
                                                height: verticalScale(10),
                                                width: verticalScale(10),
                                            }} />
                                        : <View />}

                                </TouchableOpacity>


                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                        width: '100%',
                                        textAlign: 'center',
                                        marginBottom: verticalScale(10)
                                    }}>
                                    Add Animal Photo

                                </AutoSizeText>

                                <View style={{
                                    ...styles.boxcontainer,
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateName ? 'transparent' : 'darkred',
                                    shadowOpacity: validateName ? 0.25 : 1,
                                    paddingStart: moderateScale(15),
                                    paddingEnd: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Name" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        onChangeText={(e) => {
                                            setValidateName(Util.isLengthGreater(e));
                                            setValueName(e)
                                        }
                                        }
                                        value={valueName} />
                                </View>

                                <TouchableOpacity style={{
                                    ...styles.styleButtons, width: '100%',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(25),
                                    backgroundColor: 'white',
                                    borderWidth: moderateScale(1),
                                    padding: moderateScale(10),
                                    paddingBottom: verticalScale(10)
                                }} onPress={() => {
                                    getAnimalBreed(animalCategories[petIndex].categoryId._id)
                                    setCloseBreedSheet(true)
                                }}>
                                    <Text style={{
                                        ...styles.generalTxt,
                                        textAlign: 'center',
                                        paddingBottom: 0,
                                        color: Colors.appBgColor
                                    }}>Select Breed</Text>


                                    <FlatList
                                        numColumns={2}
                                        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        data={listBreed}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#F5F5F5',
                                                    borderRadius: moderateScale(10),
                                                    marginTop: verticalScale(5),
                                                    height: verticalScale(30),
                                                    width: Dimensions.get('screen').width / 2.6,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginStart: moderateScale(5),
                                                }}>

                                                    <AutoSizeText
                                                        numberOfLines={1}
                                                        minFontSize={moderateScale(14)}
                                                        fontSize={moderateScale(16)}
                                                        mode={ResizeTextMode.max_lines}
                                                        style={{
                                                            ...styles.generalTxt,
                                                            color: '#464646',
                                                            textAlign: 'center'
                                                        }}>{item.name}
                                                    </AutoSizeText>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />

                                </TouchableOpacity>
                                <RBSheet
                                    ref={sheetBreedRef}
                                    height={Dimensions.get('screen').height - moderateScale(130)}
                                    openDuration={250}
                                    customStyles={{
                                        container: {
                                            borderRadius: moderateScale(30)
                                        }
                                    }}
                                    onClose={() => setCloseBreedSheet(false)}
                                >
                                    {showBreed()}
                                </RBSheet>

                                {animalBreed.length > 0 && isBreedSheetVisible ? sheetBreedRef.current.open() : null}

                                {accountType === INDIVIDUAL ? <View /> : <View>
                                    <Text style={{
                                        marginTop: verticalScale(25),
                                        ...styles.generalTxt, color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                    }}>Quantity</Text>

                                    <View style={{
                                        ...styles.boxcontainer,
                                        marginTop: verticalScale(10),
                                        flexDirection: 'row', alignItems: 'center',
                                        shadowColor: validateQuantity ? 'transparent' : 'darkred',
                                        shadowOpacity: validateQuantity ? 0.25 : 1,
                                        padding: moderateScale(15),
                                    }}>


                                        <TextInput placeholder="Quantity" style={{
                                            ...styles.styleTextInput,
                                            flex: 1,
                                            textAlign: 'left',
                                        }}
                                            underlineColorAndroid="transparent"
                                            require={true}
                                            numberOfLines={1}
                                            autoCapitalize="none"
                                            keyboardType="number-pad"
                                            onChangeText={(e) => {
                                                setValidateQuantity(Util.isGraterThanZero(e));
                                                setValueQuantity(e);
                                            }
                                            }
                                            value={valueQuantity} />
                                    </View>
                                </View>}
                                <Text style={{
                                    marginTop: verticalScale(25),
                                    ...styles.generalTxt, color: '#464646',
                                    fontFamily: Fonts.type.medium,
                                }}>Price</Text>
                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validatePrice ? 'transparent' : 'darkred',
                                    shadowOpacity: validatePrice ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>

                                    <Text
                                        style={{
                                            ...styles.styleTextInput,
                                            textAlign: 'left',
                                            width:'5%',
                                        }}>$
                                    </Text>

                                    <TextInput
                                        placeholder="Price" style={{
                                            ...styles.styleTextInput,
                                            flex: 1,
                                            textAlign: 'left',
                                        }}
                                        underlineColorAndroid="transparent"
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize="none"
                                        keyboardType="decimal-pad"
                                        onChangeText={(e) => {
                                            setValidatePrice(Util.isTwoDecimalPlaces(e));
                                            setValuePrice(e);
                                        }
                                        }
                                        value={valuePrice} />
                                </View>
                                <Text
                                    style={{
                                        ...styles.generalTxt,
                                        color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                        width: '100%',
                                        textAlign: 'left',
                                        marginTop: verticalScale(25),
                                        marginBottom: verticalScale(10)
                                    }}>

                                    Select DOB
                                </Text>

                                <TouchableOpacity style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(0),
                                    flex: 1,
                                    width: '100%',
                                    height: verticalScale(40),
                                    flexDirection: 'row',
                                    paddingStart: moderateScale(15),
                                    paddingEnd: moderateScale(15),
                                    alignItems: 'center',
                                    marginStart: 0,
                                }} onPress={() => {
                                    setCloseCalSheet(true)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: '#464646',
                                            paddingEnd: moderateScale(5),
                                            flex: 7,
                                        }}>{selected}
                                    </AutoSizeText>
                                    <Image source={Icons.icon_material_date_range} resizeMode='contain' style={{ height: verticalScale(13), width: verticalScale(13) }} />
                                </TouchableOpacity>

                                {getServiceType(false)}

                                <View style={{
                                    ...styles.boxcontainer,
                                    height: verticalScale(100),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateDesc ? 'transparent' : 'darkred',
                                    shadowOpacity: validateDesc ? 0.25 : 1,
                                    marginTop: verticalScale(25),
                                }}>


                                    <TextInput placeholder="Notes" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        paddingTop: verticalScale(15),
                                        padding: moderateScale(15),
                                        textAlign: 'left',
                                        height: verticalScale(100),
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        maxLength={75}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        onChangeText={(e) => {
                                            setValidateDesc(Util.isLengthGreater(e))
                                            setDesc(e)
                                        }
                                        }
                                        value={valueDesc} />
                                </View>

                                {!animalData ? <View>
                                    <Text style={{
                                        marginTop: verticalScale(25),
                                        ...styles.generalTxt, color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                    }}>Parents</Text>

                                    <View flexDirection='row' marginTop={0}>

                                        <TouchableOpacity style={{
                                            backgroundColor: '#F5F5F5',
                                            borderRadius: moderateScale(10),
                                            marginTop: verticalScale(5),
                                            flex: 1,
                                            height: verticalScale(40),
                                            flexDirection: 'row',
                                            paddingStart: moderateScale(15),
                                            paddingEnd: moderateScale(15),
                                            alignItems: 'center',
                                            marginStart: 0,
                                        }} onPress={() => {
                                            if (!father) {
                                                let family = getFamily();
                                                props.navigation.navigate('AllAnimal', { FamilyData: family, mainId: '', updateAnimal: (e) => { addAnimalasParent(e, true) } })
                                            }
                                            else {
                                                deleteAnimalasParent(father, true)
                                            }
                                        }}>

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(14)}
                                                fontSize={moderateScale(16)}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    color: '#464646',
                                                    paddingEnd: moderateScale(5),
                                                    flex: 7,
                                                }}>{father ? father.data.name : 'Add Father'}
                                            </AutoSizeText>
                                            <Image source={father ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#F5F5F5',
                                            borderRadius: moderateScale(10),
                                            marginTop: verticalScale(5),
                                            flex: 1,
                                            height: verticalScale(40),
                                            paddingStart: moderateScale(15),
                                            paddingEnd: moderateScale(15),
                                            alignItems: 'center',
                                            marginStart: moderateScale(10),
                                            flexDirection: 'row'
                                        }} onPress={() => {
                                            if (!mother) {
                                                let family = getFamily();
                                                props.navigation.navigate('AllAnimal', { FamilyData: family, mainId: '', updateAnimal: (e) => { addAnimalasParent(e, false) } })
                                            }
                                            else {
                                                deleteAnimalasParent(mother, false)
                                            }
                                        }}>

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(14)}
                                                fontSize={moderateScale(16)}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    color: '#464646',
                                                    flex: 7,
                                                }}>{mother ? mother.data.name : 'Add Mother'}
                                            </AutoSizeText>
                                            <Image source={mother ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                        </TouchableOpacity>


                                    </View>
                                    <Text style={{
                                        marginTop: verticalScale(25),
                                        ...styles.generalTxt, color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                    }}>Child</Text>

                                    <FlatList
                                        numColumns={2}
                                        data={children}
                                        renderItem={({ item, index }) => {

                                            return (
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#F5F5F5',
                                                    borderRadius: moderateScale(10),
                                                    marginTop: verticalScale(5),
                                                    flex: 0.5,
                                                    height: verticalScale(40),
                                                    flexDirection: 'row',
                                                    paddingStart: moderateScale(15),
                                                    paddingEnd: moderateScale(15),
                                                    alignItems: 'center',
                                                    marginStart: index % 2 === 0 ? 0 : moderateScale(10),
                                                }} onPress={() => {
                                                    let tmp = children;
                                                    tmp.splice(index, 1)
                                                    setChildren([...tmp]);
                                                }}>

                                                    <AutoSizeText
                                                        numberOfLines={1}
                                                        minFontSize={moderateScale(14)}
                                                        fontSize={moderateScale(16)}
                                                        mode={ResizeTextMode.max_lines}
                                                        style={{
                                                            ...styles.generalTxt,
                                                            color: '#464646',
                                                            paddingEnd: moderateScale(5),
                                                            flex: 7,
                                                        }}>{item && item.data ? item.data.name : ''}
                                                    </AutoSizeText>
                                                    <Image source={item && item.data ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />

                                    <TouchableOpacity style={{
                                        backgroundColor: '#F5F5F5',
                                        borderRadius: moderateScale(10),
                                        marginTop: verticalScale(5),
                                        flex: 0.5,
                                        width: '50%',
                                        height: verticalScale(40),
                                        flexDirection: 'row',
                                        paddingStart: moderateScale(15),
                                        paddingEnd: moderateScale(15),
                                        alignItems: 'center',
                                        marginStart: 0,
                                    }} onPress={() => {
                                        let family = getFamily();
                                        family.children = children;
                                        props.navigation.navigate('AllAnimal', {
                                            FamilyData: family, mainId: '', updateAnimal: (e) => {
                                                let tmp = children;
                                                tmp.push(e)
                                                setChildren([...tmp])
                                            }
                                        })
                                    }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(16)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                color: '#464646',
                                                paddingEnd: moderateScale(5),
                                                flex: 7,
                                            }}>Add Children
                                        </AutoSizeText>
                                        <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                    </TouchableOpacity>
                                </View> : <View />}

                            </View> : null}
                    </View>

                    {petIndex > -1 && !animalData ?

                        <View style={{

                        }}>
                            {listPhotoCollections.length > 0 ?
                                <FlatList
                                    horizontal
                                    data={listPhotoCollections}
                                    style={{
                                        width: '100%',
                                        marginStart: moderateScale(25),
                                        marginBottom: verticalScale(20),
                                    }}
                                    contentContainerStyle={{
                                        height: verticalScale(80)
                                    }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    deletePic(index)
                                                }}
                                                style={{
                                                    flexDirection: 'row',
                                                    marginEnd: verticalScale(10)
                                                }}>

                                                {item.includes('jpg') || item.includes('png') || item.includes('jpeg') ?
                                                    <View
                                                        style={{

                                                            width: moderateScale(100), height: '100%', alignItems: 'flex-end', justifyContent: 'flex-start'
                                                        }}
                                                    >
                                                        <Image
                                                            source={{ uri: item }}
                                                            resizeMode="cover" style={{
                                                                position: 'absolute',
                                                                borderRadius: moderateScale(20),
                                                                height: '100%', width: '100%'
                                                            }}
                                                        />

                                                        <Image
                                                            source={Icons.icon_metro_cancel}
                                                            resizeMode="contain" style={{
                                                                margin: moderateScale(5),
                                                                height: verticalScale(20), width: moderateScale(20)
                                                            }}
                                                        />
                                                    </View> :

                                                    <View
                                                        style={{

                                                            width: moderateScale(100), height: '100%', alignItems: 'flex-end', justifyContent: 'flex-start'
                                                        }}
                                                    >

                                                        <View
                                                            style={{
                                                                position: 'absolute',
                                                                borderRadius: moderateScale(20),
                                                                height: '100%', width: '100%'
                                                            }}
                                                        >
                                                            <VideoPlayer
                                                                style={{
                                                                    height: '100%', width: '100%',
                                                                    borderRadius: moderateScale(20),
                                                                }}
                                                                video={{ uri: item }}
                                                                videoWidth={1600}
                                                                videoHeight={900}
                                                                duration={1}
                                                            />
                                                        </View>

                                                        <Image
                                                            source={Icons.icon_metro_cancel}
                                                            resizeMode="contain" style={{
                                                                margin: moderateScale(5),
                                                                height: verticalScale(20), width: moderateScale(20),
                                                                tintColor: 'white'
                                                            }}
                                                        />
                                                    </View>

                                                }
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id}

                                /> : <View />}

                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                marginTop: 0,
                                backgroundColor: 'white',
                                borderWidth: moderateScale(1),
                                marginBottom: verticalScale(0),
                            }} onPress={(e) => {
                                setCaptureCollection(true);
                                setDialogVisibleStatus(true)
                            }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),
                                    color: Colors.appBgColor
                                }}>Add Videos / Photos</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                    {petIndex > -1 ?
                        <View>

                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                marginTop: verticalScale(15)
                            }} onPress={() => {

                                let tmpFamily = getFamily();
                                let childs = []
                                children.forEach((data, inn) => {
                                    childs.push(data._id)
                                });
                                tmpFamily.children = childs

                                addProduct({
                                    categoryId: animalCategories[petIndex].categoryId._id,
                                    name: valueName,
                                    Notes: valueDesc,
                                    price: valuePrice,
                                    quantity: valueQuantity,
                                    breed: listBreed.map((value) => value.name),
                                    DOB: selected,
                                    Sex: serviceTypeIndex === 0 ? 'Male' : 'Female',
                                    family: tmpFamily
                                })
                            }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                                }}>  {animalData ? 'SAVE' : 'REGISTER'} </Text>
                            </TouchableOpacity>
                        </View> : null}

                    <Dialog
                        visible={dialogVisibleStatus}
                        width={Dimensions.get('screen').width - 100}
                        height={Dimensions.get('screen').height / 6}
                        onTouchOutside={() => {
                            setDialogVisibleStatus(false);
                        }}
                        dialogTitle={<DialogTitle title="Profile Picture" />}
                        dialogAnimation={new ScaleAnimation({
                            toValue: 0,
                            useNativeDriver: true,
                        })}
                    >
                        <DialogContent
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    flex: 5,
                                    height: 50,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    onPress={() => {
                                        if (!captureCollection)
                                            capturePic('gallery');
                                        else {
                                            capturePicCollections('gallery');
                                            setCaptureCollection(false)
                                        }
                                        setDialogVisibleStatus(false);
                                    }}>
                                    Gallery
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    flex: 5,
                                    height: 50,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    onPress={() => {
                                        if (!captureCollection)
                                            capturePic('camera');
                                        else {
                                            capturePicCollections('camera');
                                            setCaptureCollection(false)
                                        }
                                        setDialogVisibleStatus(false);
                                    }}>
                                    Camera
                                </Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </ScrollView>
            </KeyboardAvoidingView>

            <AppLoader loader={{ isLoading: isLoad }} />
        </View>

    );

    function getServiceType(isShowThird) {

        return (<View>
            <Text style={{
                marginTop: verticalScale(25),
                ...styles.generalTxt, color: '#464646',
                fontFamily: Fonts.type.medium,
            }}>Select Sex</Text>
            <View flexDirection='row' marginTop={verticalScale(10)} style={{ justifyContent: 'space-between', width: isShowThird ? '90%' : '60%' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{
                        ...styles.generalTxt, color: '#464646',
                        fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                    }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                    <Text style={{
                        ...styles.generalTxt, color: '#464646',
                        fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                    }}>Female</Text>
                </TouchableOpacity>
                {isShowThird ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(2) }}>
                        <Image source={serviceTypeIndex === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} resizeMode='contain' style={{ height: verticalScale(16), width: moderateScale(16) }} />
                        <Text style={{
                            ...styles.generalTxt, color: '#464646',
                            fontFamily: Fonts.type.medium, marginStart: moderateScale(5)
                        }}>Other</Text>
                    </TouchableOpacity> : null
                }
            </View>
        </View>)
    }

    function showPetCategory() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Pet Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={animalCategories}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setPetIndex(index);
                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === petIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item.categoryId.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function showBreed() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Breed</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        margin: moderateScale(25),
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(15),
                        justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                    }}>

                        <TextInput
                            onChangeText={(e) => {
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
                                height: verticalScale(40),
                                ...styles.generalTxt,
                                color: '#777777',
                                fontSize: moderateScale(14),
                            }} />
                        <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                    </View>
                    <FlatList
                        data={listAnimalBreed}
                        contentContainerStyle={{
                            padding: moderateScale(30),
                            paddingTop: 0,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        selectBreed(item)
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={isBreedSelect(item) ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function selectBreed(e) {
        let tmp = listBreed;
        let itemService = tmp.find(item => item._id === e._id);
        if (itemService) {
            tmp.splice(tmp.indexOf(itemService), 1);
        } else {
            tmp.push(e);
        }
        setListBreed([...tmp]);
    }

    function isBreedSelect(item) {
        let itemService = listBreed.find(e => e._id === item._id);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }

    function showCalendarSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: moderateScale(30),
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>
                    <Calendar
                        enableSwipeMonths={true}
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        hideExtraDays
                        theme={{
                            monthTextColor: Colors.appBgColor,
                            textMonthFontFamily: Fonts.type.bold,
                            textMonthFontSize: moderateScale(20),
                            textDayFontSize: moderateScale(12),
                            textDayHeaderFontSize: moderateScale(12),
                            calendarBackground: '#F5F5F5',
                            borderRadius: moderateScale(100),
                            textSectionTitleColor: '#595959',
                            dayTextColor: '#595959',

                        }}
                    />




                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(25), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                                setCloseCalSheet(false);
                                sheetCalRef.current.close()
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(15), backgroundColor: 'white'
                    }} onPress={() => {
                        setCloseCalSheet(false);
                        sheetCalRef.current.close()
                    }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: moderateScale(18),
                            textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }

    function getFamily() {
        let family = {};
        let parent1 = { id: father ? father._id : null, name: father ? father.data.name : '' }
        let parent2 = { id: mother ? mother._id : null, name: mother ? mother.data.name : '' }
        family.parent1 = parent1;
        family.parent2 = parent2;
        console.log('family--->', family);
        return family;
    }
    function addAnimalasParent(e, isFather) {
        if (isFather)
            setFather(e)
        else
            setMother(e)

    }
    function deleteAnimalasParent(e, isFather) {
        if (isFather)
            setFather('')
        else
            setMother('')
    }
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

export default RegisterPetView;