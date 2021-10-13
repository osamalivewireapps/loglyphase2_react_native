/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, TextInput, Keyboard, Modal, ImageBackground } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Fonts, Colors, Icons } from '../../../theme';
import _ from 'lodash';
import RBSheet from "react-native-raw-bottom-sheet";
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import Util from "../../../utils";
import ServicesListing from "./services_listing";

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

const arrDuration = [
    '15 Mins',
    '30 Mins',
    '45 Mins',
    '60 Mins',
    '75 Mins',
    '100 Mins',
    '120 Mins',
]

const arrBookingPeriod = [
    'Day(s)',
    'Month(s)',
    'Year(s)',
]

const arrDisType = [
    'Amount',
    'Percentage',
]

const AnimalCategories = ["Dog", "Cat", "Horse", "Parrot", "Deer", "Rabbit"];

function AddNewServiceView(props) {
    const { animalType, clickNextBtn,
        wholeServices, addServices, delTrainingProgram
    } = props;

    const sheetRef = React.useRef(null);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [classDate, setClassDate] = useState(0)
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [validateProgramName, setValidateProgramName] = useState(true);
    const [programName, setProgramName] = useState('');
    const [recurringProgramIndex, setRecurringProgramIndex] = useState(0);
    const [serviceTypeIndex, setServiceTypeIndex] = useState(0);
    const [validateServiceName, setValidateServiceName] = useState(true);
    const [serviceName, setServiceName] = useState('');
    const [validateDuration, setValidateDuration] = useState(true);
    const [valueDuration, setDuration] = useState(arrDuration[0]);
    const [validateOnSite, setValidateOnSite] = useState(true);
    const [onSitePrice, setOnSitePrice] = useState('');
    const [validateOffSite, setValidateOffSite] = useState(true);
    const [offSitePrice, setOffSitePrice] = useState('');
    const [selectFrequency, setFrequency] = useState(0);
    const [valueStartTiming, setValueStartTiming] = useState('');
    const [valueEndTiming, setValueEndTiming] = useState('');
    const [isStartTiming, setIsStartTiming] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [recurStartDate, setRecurStartDate] = useState('');
    const [recurEndDate, setRecurEndDate] = useState('');
    const [isStartDate, setIsStartDate] = useState(true);
    const [validateAddress, setValidateAddress] = useState(true);
    const [valueAddress, setValueAddress] = useState('');
    const [arrIndex, setArrIndex] = useState(0);
    const [selectWeekFrequency, setSelectWeekFrequency] = useState([]);
    const [addNonRecurringClass, setAddNonRecurringClass] = useState([]);
    const [nonRecurrIndex, setNonRecurrIndex] = useState(0);
    const [showDate, setShowDate] = useState(false)
    const [btnLabel,setBtnLabel] = useState(false);

    ///////////////// TRANSPORTATION /////////////////
    const [validateRegNumber, setValidateRegNumber] = useState(true);
    const [regNumber, setRegNumber] = useState('');
    const [validateRentPerMile, setValidateRentPerMile] = useState(true);
    const [rentPerMile, setRentPerMile] = useState('');
    const [animalCategory, SetAnimalCategory] = useState([]);
    const [vehicleTypeIndex, setVehicleTypeIndex] = useState(0);

    ////////////////// PET BOARDING //////////////////

    const [validatePackageName, setValidatePackageName] = useState(true);
    const [packageName, setPackageName] = useState('');
    const [validateRatePerDay, setValidateRatePerDay] = useState(true);
    const [ratePerDay, setRatePerDay] = useState('');
    const [bookingPeriod, setBookingPeriod] = useState(arrBookingPeriod[0]);
    const [discountType, setDiscountType] = useState(arrDisType[0]);
    const [valueBookingPeriod, setValueBookingPeriod] = useState('0')
    const [arrPetBoardingDiscount, setArrPetBoardingDiscount] = useState([]);
    const [modalDiscountVisible, setModalDiscountVisible] = useState(false);
    const [currPetBoardDisIndex, setCurrPetBoardDisIndex] = useState(0);

    //////////////////// BREEDING ////////////////////
    const [areaConsultancy, setAreaConsultancy] = useState('')

    //////////////////// PET WALKING ////////////////////
    const [coverageArea, setCoverageArea] = useState('')
    const [validateCoverageArea, setValidateCoverageArea] = useState(true);
    const [valueBufferTime, setValueBufferTime] = useState(arrDuration[0]);

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
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
                            style={{
                                ...styles.generalTxt, textAlign: 'left',
                                color: (getAnimalCategory(animalType).name.toLowerCase().includes('pet walking') ||
                                    getAnimalCategory(animalType).name.toLowerCase().includes('breeding') ||
                                    getAnimalCategory(animalType).name.toLowerCase().includes('boarding')) ? 'white' : 'black', marginTop: 10,
                            }}>{getAnimalCategory(animalType).name.toString().toUpperCase()}
                        </AutoSizeText>
                    </View>
                    <Image source={getAnimalCategory(animalType).url} flex={3} resizeMode='contain' />
                </View>

                <TouchableOpacity style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 10,
                    marginTop: 20,
                    flex: 1,
                    height: 50,
                    paddingStart: 25,
                    paddingEnd: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }} onPress={() => {
                    setBtnLabel(false)
                    updateServiceValues(null);
                    setCloseBottonSheet(true)
                }
                }>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={14}
                        fontSize={16}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            color: 'black',
                            textAlign: 'left',
                            width: '100%',
                        }}>{getServiceProviderName()}
                    </AutoSizeText>
                    <Image source={Icons.icon_awesome_plus} />
                </TouchableOpacity>

                {isBottonSheetVisible ? sheetRef.current.open() : null}
                <RBSheet
                    ref={sheetRef}
                    height={Dimensions.get('screen').height - 130}
                    openDuration={250}
                    customStyles={{
                        container: {
                            borderRadius: 30
                        }
                    }}
                    onClose={() => setCloseBottonSheet(false)}
                >
                    {showBottomSheet()}
                    {
                        modalVisible ? createClassProgram() : null
                    }
                </RBSheet>
                {wholeServices.length > 0 ?


                    <ServicesListing wholeServices={wholeServices}
                        delTrainingProgram={(e) => { delTrainingProgram(e) }}
                        type={animalType}
                        updateServiceValues={(e) => {
                            setBtnLabel(true)
                            setCloseBottonSheet(true)
                            updateServiceValues(e)
                        }} /> :
                    null}

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    marginTop: 35
                }} onPress={() => { clickNextBtn() }}>
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


    function showBottomSheet() {

        const { animalType,
            addServices } = props;
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                {

                    createView(animalType)

                }

                <View style={{
                    padding: 30,
                    paddingTop: 0,
                }}>
                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 0
                    }}>Description</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        height: 100,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateDesc ? 'black' : 'darkred',
                        shadowOpacity: validateDesc ? 0.25 : 1,
                        padding: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,
                            textAlign: 'left',
                            textAlignVertical: "top",
                            height: 100,
                            paddingTop: 15
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
                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: 75, backgroundColor: '#FFC081'
                    }} onPress={() => {
                        setTimeout(() => {
                            addServices({
                                programName: programName,
                                serviceName: serviceName,
                                serviceDuration: valueDuration,
                                onSitePrice: onSitePrice,
                                offSitePrice: offSitePrice,
                                recurrIndex: recurringProgramIndex,
                                classFrequency: selectFrequency,
                                startTiming: valueStartTiming,
                                endTiming: valueEndTiming,
                                address: valueAddress,
                                serviceTypeIndex: serviceTypeIndex,
                                desc: valueDesc,
                                id: arrIndex,
                                recurStartDate: recurStartDate,
                                recurEndDate: recurEndDate,
                                weekFrequency: selectWeekFrequency,
                                arrNonRecurr: addNonRecurringClass,
                                vehicleType: vehicleTypeIndex,
                                regNum: regNumber,
                                rentPerMile: rentPerMile,
                                transportAnimalType: animalCategory,
                                packageName: packageName,
                                ratePerDay: ratePerDay,
                                bookingPeriod: bookingPeriod,
                                discountType: discountType,
                                valueBookingPeriod: valueBookingPeriod,
                                arrPetBoardingDiscount: arrPetBoardingDiscount,
                                areaConsultancy: areaConsultancy,
                                covergaeArea: coverageArea,
                                valueBufferTime: valueBufferTime
                            })
                            sheetRef.current.close()
                        }, 200)
                    }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: 22, textAlign: 'center', padding: 10,
                            paddingTop: 5, paddingBottom: 5,

                        }}>{!btnLabel?'Add':'Save'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: 15, backgroundColor: 'white'
                    }} onPress={() => { sheetRef.current.close() }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: 18, textAlign: 'center', padding: 10,
                            paddingTop: 5, paddingBottom: 5,

                        }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    function createView(animalType) {
        switch (animalType) {
            case 'Veterinary':
            case 'Pet Grooming':
                return getPetGroomingView();

            case 'Pet Training':
                return getPetTraining();

            case 'Transportation':
                return getTransportationView();

            case 'Pet Boarding':
                return getPetBoardingView();

            case 'Breeding':
                return getBreedingView();

            default:
                return getPetWalkingView();


        }
    }

    {/** Veterinary/Pet Grooming */ }
    function getPetGroomingView() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>

                    {getServiceType(props, true)}

                    {getServiceName(props)}
                    {getDuration(props)}
                    {getOnSitePrice(props)}


                </View>


            </View>
        )
    }

    {/** Transportation */ }
    function getTransportationView() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>

                    <View>
                        <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Vehicle Type *</Text>
                        <View flexDirection='row' marginTop={15} style={{ justifyContent: 'space-between', width: '90%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setVehicleTypeIndex(0) }}>
                                <ImageBackground style={vehicleTypeIndex === 0 ? { ...styles.boxcontainer, position: 'absolute', height: 60, width: 65 } : ''} />
                                <Image source={Icons.icon_truck} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setVehicleTypeIndex(1) }}>
                                <ImageBackground style={vehicleTypeIndex === 1 ? { ...styles.boxcontainer, position: 'absolute', height: 60, width: 65 } : ''} />
                                <Image source={Icons.icon_pickup} marginTop={5} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setVehicleTypeIndex(2) }}>
                                <ImageBackground style={vehicleTypeIndex === 2 ? { ...styles.boxcontainer, position: 'absolute', height: 60, width: 65 } : ''} />
                                <Image source={Icons.icon_car} marginTop={5} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { setVehicleTypeIndex(3) }}>
                                <ImageBackground style={vehicleTypeIndex === 3 ? { ...styles.boxcontainer, position: 'absolute', height: 60, width: 80 } : ''} />
                                <Image source={Icons.icon_motorbike} marginTop={5} />
                            </TouchableOpacity>

                        </View>
                    </View>



                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Registration Number *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        shadowColor: validateRegNumber ? 'black' : 'darkred',
                        shadowOpacity: validateRegNumber ? 0.25 : 1,
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidateRegNumber(Util.isLengthGreater(e))
                                setRegNumber(e)
                            }}
                            value={regNumber} />
                    </View>

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Rent Per Mile *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        shadowColor: validateRentPerMile ? 'black' : 'darkred',
                        shadowOpacity: validateRentPerMile ? 0.25 : 1,
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="numeric"
                            onChangeText={(e) => {
                                setValidateRentPerMile(Util.isGraterThanZero(e))
                                setRentPerMile(e)
                            }}
                            value={rentPerMile} />
                    </View>

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Animal Type *</Text>
                    <FlatList
                        numColumns={2}
                        data={AnimalCategories}
                        contentContainerStyle={{ marginTop: 0 }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    backgroundColor: isSelectService(item) ? '#FFC081' : '#F5F5F5',
                                    borderRadius: 10,
                                    marginTop: 10,
                                    flex: 1,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginStart: (index % 2) === 0 ? 0 : 10,
                                }} onPress={() => addAnimalCategory({
                                    type: item,
                                    isSelect: animalCategory.length === 0 ? true : !isSelectService(item),
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

                </View>


            </View>
        )
    }

    {/** Pet Walking ******/ }
    function getPetWalkingView() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>

                    {getServiceType(false)}
                    {getServiceName()}

                    {getDuration(props)}
                    <View style={{
                        marginTop: 20,
                    }}>

                        <Text style={{
                            ...styles.bottomSheetHeader,
                            marginBottom: 5, marginTop: 0,
                            marginStart: 5
                        }}>Buffer Time *</Text>
                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                            alignItems: 'center',
                            backgroundColor: '#F5F5F5',
                        }}>

                            <ModalDropdown
                                style={{
                                    backgroundColor: '#F5F5F5', width: '92%', height: 50,
                                    borderTopLeftRadius: 30, borderTopRightRadius: 30,
                                    justifyContent: 'center', alignItems: 'center',
                                    paddingStart: 15,
                                    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,

                                }}
                                defaultValue={valueBufferTime}
                                textStyle={{
                                    ...styles.bottomSheetHeader,
                                    fontSize: 14,
                                    color: 'black',
                                    width: '100%',
                                }}

                                dropdownStyle={{ marginTop: 20, backgroundColor: 'white', width: '85%', marginStart: -15 }}
                                dropdownTextStyle={{
                                    ...styles.bottomSheetHeader,
                                    fontSize: 14,
                                    color: 'black',
                                    backgroundColor: 'white'
                                }}
                                onSelect={(item) => {
                                    setValueBufferTime(arrDuration[item])
                                }}
                                defaultIndex={0}
                                options={arrDuration} />

                            <Image source={Icons.icon_ios_arrow_down} />

                        </View>
                    </View>
                    {getOnSitePrice(props)}
                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 20
                    }}>Coverage Areas *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        shadowColor: validateCoverageArea ? 'black' : 'darkred',
                        shadowOpacity: validateCoverageArea ? 0.25 : 1,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="Enter Zip Code" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setCoverageArea(e)
                                setValidateCoverageArea(Util.isLengthGreater(e))
                            }}
                            value={coverageArea} />
                    </View>


                </View>


            </View>
        )
    }

    {/** Pet Boarding */ }
    function getPetBoardingView() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>




                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Package Name *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        shadowColor: validatePackageName ? 'black' : 'darkred',
                        shadowOpacity: validatePackageName ? 0.25 : 1,
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidatePackageName(Util.isLengthGreater(e))
                                setPackageName(e)
                            }}
                            value={packageName} />
                    </View>

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Rate Per Day *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        shadowColor: validateRatePerDay ? 'black' : 'darkred',
                        shadowOpacity: validateRatePerDay ? 0.25 : 1,
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="numeric"
                            onChangeText={(e) => {
                                setValidateRatePerDay(Util.isGraterThanZero(e))
                                setRatePerDay(e)
                            }}
                            value={ratePerDay} />
                    </View>

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Want to add a discount? ( optional )</Text>
                    {createDiscountView()}
                    {modalDiscountVisible ? createDiscountModal() : null}
                    <FlatList
                        data={arrPetBoardingDiscount}
                        contentContainerStyle={{ marginTop: 0 }}
                        renderItem={({ item, index }) => {

                            return (
                                <TouchableOpacity style={{
                                    backgroundColor: '#F0ECFF',
                                    borderRadius: 10,
                                    marginTop: 10,
                                    flex: 1,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }} onPress={() => {
                                    setCurrPetBoardDisIndex(item.id)
                                    setValueBookingPeriod(item.bookingperiod.substring(0, item.bookingperiod.lastIndexOf(" ")))
                                    setBookingPeriod(item.bookingperiod.substring(item.bookingperiod.lastIndexOf(" ") + 1, item.bookingperiod.length))
                                    setDiscountType(item.discountType)
                                    setModalDiscountVisible(true)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={12}
                                        fontSize={14}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            fontSize: 14,
                                            flex: 0.3,
                                            textAlign: 'center',
                                            color: Colors.appBgColor
                                        }}>{item.bookingperiod}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={12}
                                        fontSize={14}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: Colors.appBgColor,
                                            flex: 0.4,
                                            textAlign: 'center',
                                            fontSize: 14
                                        }}>{item.discountType}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={12}
                                        fontSize={14}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: Colors.appBgColor,
                                            flex: 0.3,
                                            textAlign: 'center',
                                            fontSize: 14
                                        }}>10$
                                    </AutoSizeText>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />

                </View>


            </View>
        )
    }

    {/** Breeding ******/ }
    function getBreedingView() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>

                    {getServiceType(props, true)}

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5,
                        marginTop: 15
                    }}>Areas of Consultancy </Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setAreaConsultancy(e)
                            }}
                            value={areaConsultancy} />
                    </View>
                    {getDuration(props)}
                    {getOnSitePrice(props)}


                </View>


            </View>
        )
    }

    function createDiscountView() {

        return (
            <View style={{
                ...styles.boxcontainer,
                padding: 0,
                paddingStart: 15, paddingEnd: 15,
                height: 300
            }}>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    fontSize: 14, fontFamily: Fonts.type.base,
                    marginBottom: 15, marginTop: 15, marginStart: 5
                }}>Booking Period</Text>
                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row', padding: 0, alignItems: 'center',
                    paddingStart: 15, paddingEnd: 30,
                    height: 40
                }}>

                    <View style={{ backgroundColor: '#464646', height: 20, width: 1 }} />

                    <TextInput placeholder="" style={{
                        ...styles.styleTextInput,
                        flex: 0.3,
                        paddingStart: 10
                    }}
                        maxLength={75}
                        autoCapitalize='none'
                        keyboardType="numeric"
                        onChangeText={(e) => {
                            setValueBookingPeriod(e)
                        }}
                        value={valueBookingPeriod} />

                    <View style={{
                        flexDirection: 'row', padding: 0,
                        alignItems: 'center',
                        flex: 0.7
                    }}>

                        <ModalDropdown
                            style={{
                                justifyContent: 'center', alignItems: 'center',
                                paddingStart: 15,
                                borderBottomLeftRadius: 30, borderBottomRightRadius: 30,

                            }}
                            defaultValue={bookingPeriod}
                            textStyle={{
                                ...styles.bottomSheetHeader,
                                fontSize: 14,
                                color: '#464646',
                                width: '100%',
                            }}

                            dropdownStyle={{ marginTop: 20, backgroundColor: 'white', width: '50%', marginStart: -15 }}
                            dropdownTextStyle={{
                                ...styles.bottomSheetHeader,
                                fontSize: 14,
                                color: '#464646',
                                paddingStart: 15,
                                backgroundColor: 'white'
                            }}
                            onSelect={(index) => {
                                setBookingPeriod(arrBookingPeriod[index])
                            }}
                            defaultIndex={0}
                            options={arrBookingPeriod} />

                        <Image source={Icons.icon_ios_arrow_down} />

                    </View>
                </View>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    fontSize: 14, fontFamily: Fonts.type.base,
                    marginBottom: 15, marginTop: 15, marginStart: 5
                }}>Discount Type</Text>
                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row', padding: 0, alignItems: 'center',
                    paddingStart: 15, paddingEnd: 30,
                    height: 40
                }}>


                    <View style={{
                        flexDirection: 'row', padding: 0,
                        alignItems: 'center',
                        flex: 1
                    }}>

                        <ModalDropdown
                            style={{
                                justifyContent: 'center', alignItems: 'center',
                                borderBottomLeftRadius: 30, borderBottomRightRadius: 30,

                            }}
                            defaultValue={discountType}
                            textStyle={{
                                ...styles.bottomSheetHeader,
                                fontSize: 14,
                                color: '#464646',
                                width: '100%',
                                textAlign: 'left',
                            }}

                            dropdownStyle={{ height: 80, marginTop: 20, backgroundColor: 'white', width: '78%', marginStart: -30 }}
                            dropdownTextStyle={{
                                ...styles.bottomSheetHeader,
                                fontSize: 14,
                                color: '#464646',
                                paddingStart: 15,
                                backgroundColor: 'white'
                            }}
                            onSelect={(index) => {
                                setDiscountType(arrDisType[index])
                            }}
                            defaultIndex={0}
                            options={arrDisType} />

                        <Image source={Icons.icon_ios_arrow_down} />

                    </View>
                </View>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    fontSize: 14, fontFamily: Fonts.type.base,
                    marginBottom: 15, marginTop: 25, marginStart: 5,
                }}>Discount Value</Text>

                <View style={{
                    flexDirection: 'row', padding: 0, alignItems: 'center',
                    height: 40, width: '100%'
                }}
                >


                    <View style={{
                        ...styles.boxcontainer,
                        padding: 0, alignItems: 'center',
                        paddingStart: 15, paddingEnd: 30,
                        height: 40, justifyContent: 'center',
                        flex: 0.3
                    }}>
                        <Text style={{
                            ...styles.styleTextInput,
                        }}>
                            $
                        </Text>
                    </View>

                    <View flex={0.2} />
                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0.6,
                        borderWidth: 1,
                        borderRadius: 10, borderColor: Colors.appBgColor,
                        backgroundColor: 'white'
                    }} onPress={() => {
                        let tmp = {
                            id: modalDiscountVisible ? currPetBoardDisIndex : arrPetBoardingDiscount.length,
                            bookingperiod: (valueBookingPeriod + " " + bookingPeriod),
                            discountType: discountType,
                            discountValue: '10%'
                        }
                        addPetBoardingDiscount(tmp)
                        setModalDiscountVisible(false)

                    }}>
                        <Text style={{
                            ...styles.generalTxt,
                            padding: 10,
                            color: Colors.appBgColor,
                            fontSize: 14, textAlign: 'center',

                        }}>Add Discount</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function createDiscountModal() {

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDiscountVisible}
                onRequestClose={() => {
                    setModalDiscountVisible(false)
                }}

            >

                <View style={{ ...styles.centeredView }}>
                    <View style={styles.modalView}>
                        {createDiscountView()}
                    </View>

                </View>
            </Modal>
        )

    }


    {/** Pet Training */ }
    function getPetTraining() {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 30,
                    paddingTop: 20,
                    paddingBottom: 20,
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
            >
                <View style={{
                }}>

                    {getServiceType(false)}

                    <Text style={{
                        ...styles.bottomSheetHeader,
                        marginBottom: 5, marginStart: 5, marginTop: 15,
                    }}>Program Name *</Text>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', padding: 0, alignItems: 'center',
                        shadowColor: validateProgramName ? 'black' : 'darkred',
                        shadowOpacity: validateProgramName ? 0.25 : 1,
                        paddingStart: 15, paddingEnd: 15,
                    }}>


                        <TextInput placeholder="" style={{
                            ...styles.styleTextInput,
                            flex: 1,

                        }}
                            maxLength={75}
                            autoCapitalize='none'
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidateProgramName(Util.isLengthGreater(e))
                                setProgramName(e)
                            }}
                            value={programName} />
                    </View>
                    {getOnSitePrice(props)}
                    <View marginTop={15} marginStart={10}>
                        <Text style={styles.bottomSheetHeader}>Recurring Program *</Text>
                        <View flexDirection='row' marginTop={15} style={{ justifyContent: 'space-between', width: '35%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setRecurringProgramIndex(0); setValueStartTiming(''); setValueEndTiming('') }}>
                                <Image source={recurringProgramIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                                <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setRecurringProgramIndex(1); setValueStartTiming(''); setValueEndTiming('') }}>
                                <Image source={recurringProgramIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                                <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>No</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {recurringProgramIndex === 0 ? getRecurringProgram() : getNonRecurringProgram()}


                </View>


            </View>
        )
    }





    {/******************** COMMON COMPONENTS ******************** */ }
    function getServiceType(isShowThird) {

        return (<View>
            <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Service Type *</Text>
            <View flexDirection='row' marginTop={15} style={{ justifyContent: 'space-between', width: isShowThird ? '90%' : '60%' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(0) }}>
                    <Image source={serviceTypeIndex === 0 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>On-Site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(1) }}>
                    <Image source={serviceTypeIndex === 1 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                    <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Off-Site</Text>
                </TouchableOpacity>
                {isShowThird ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setServiceTypeIndex(2) }}>
                        <Image source={serviceTypeIndex === 2 ? Icons.icon_servicetype_checked : Icons.icon_servicetype_unchecked} />
                        <Text style={{ ...styles.bottomSheetHeader, marginStart: 5 }}>Both</Text>
                    </TouchableOpacity> : null
                }
            </View>
        </View>)
    }

    function getServiceName() {

        return (
            <View style={{
                marginTop: 15,
            }}>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginBottom: 5, marginStart: 5
                }}>Service Name *</Text>
                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row', padding: 0, alignItems: 'center',
                    shadowColor: validateServiceName ? 'black' : 'darkred',
                    shadowOpacity: validateServiceName ? 0.25 : 1,
                    paddingStart: 15, paddingEnd: 15,
                }}>


                    <TextInput placeholder="" style={{
                        ...styles.styleTextInput,
                        flex: 1,

                    }}
                        maxLength={75}
                        autoCapitalize='none'
                        keyboardType="default"
                        onChangeText={(e) => {
                            setValidateServiceName(Util.isLengthGreater(e))
                            setServiceName(e)
                        }}
                        value={serviceName} />
                </View>
            </View>
        )
    }

    function getDuration() {

        return (
            <View style={{
                marginTop: 15,
            }}>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginBottom: 5, marginTop: 0,
                    marginStart: 5
                }}>Select Duration *</Text>
                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    shadowColor: validateDuration ? 'black' : 'darkred',
                    shadowOpacity: validateDuration ? 0.25 : 1,
                    backgroundColor: '#F5F5F5'
                }}>

                    <ModalDropdown
                        style={{
                            backgroundColor: '#F5F5F5', width: '92%', height: 50,
                            borderTopLeftRadius: 30, borderTopRightRadius: 30,
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: 15,
                            borderBottomLeftRadius: 30, borderBottomRightRadius: 30,

                        }}
                        defaultValue={valueDuration}
                        textStyle={{
                            ...styles.bottomSheetHeader,
                            fontSize: 14,
                            color: 'black',
                            width: '100%',
                        }}

                        dropdownStyle={{ marginTop: 20, backgroundColor: 'white', width: '85%', marginStart: -15 }}
                        dropdownTextStyle={{
                            ...styles.bottomSheetHeader,
                            fontSize: 14,
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        onSelect={(item) => {
                            setDuration(arrDuration[item])
                        }}
                        defaultIndex={0}
                        options={arrDuration} />

                    <Image source={Icons.icon_ios_arrow_down} />

                </View>
            </View>
        )
    }


    function getOnSitePrice() {
        return (
            <View flexDirection='row' marginTop={20}>

                {serviceTypeIndex === 0 || serviceTypeIndex === 2 ?
                    <View flex={5}>
                        <Text style={{
                            ...styles.bottomSheetHeader,
                            marginBottom: 5, marginStart: 5
                        }}>On-Site Price *</Text>
                        <View style={{
                            ...styles.boxcontainer,
                            flexDirection: 'row', padding: 0, alignItems: 'center',
                            shadowColor: validateOnSite ? 'black' : 'darkred',
                            shadowOpacity: validateOnSite ? 0.25 : 1,
                            paddingStart: 15, paddingEnd: 15,
                        }}>


                            <TextInput placeholder="" style={{
                                ...styles.styleTextInput,
                                flex: 1,

                            }}
                                maxLength={75}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                onChangeText={(e) => {
                                    setValidateOnSite(Util.isGraterThanZero(e))
                                    setOnSitePrice(e)
                                }
                                }
                                value={onSitePrice} />
                        </View>
                    </View> : null}
                {serviceTypeIndex === 1 || serviceTypeIndex === 2 ?
                    <View flex={5} marginStart={serviceTypeIndex === 1 ? 0 : 20}>
                        <Text style={{
                            ...styles.bottomSheetHeader,
                            marginBottom: 5, marginStart: 5
                        }}>Off-Site Price *</Text>
                        <View style={{
                            ...styles.boxcontainer,
                            flexDirection: 'row', padding: 0, alignItems: 'center',
                            shadowColor: validateOffSite ? 'black' : 'darkred',
                            shadowOpacity: validateOffSite ? 0.25 : 1,
                            paddingStart: 15, paddingEnd: 15,
                        }}>


                            <TextInput placeholder="" style={{
                                ...styles.styleTextInput,
                                flex: 1,

                            }}
                                maxLength={75}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                onChangeText={(e) => {
                                    setValidateOffSite(Util.isGraterThanZero(e))
                                    setOffSitePrice(e)
                                }}
                                value={offSitePrice} />
                        </View>
                    </View> : null}

            </View>
        )
    }
    function getAddressView() {

        const { isVisible, isCityVisible, isZipVisible,
        } = props;
        return (
            <View>
                <View style={{
                    ...styles.boxcontainer,
                    // shadowColor: validateState ? 'black' : 'darkred',
                    // shadowOpacity: validateState ? 0.25 : 1,
                    marginTop: 25, flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                }}>

                    <Image source={Icons.icon_blue_real_estate_agency} />
                    <TextInput placeholder="Select State"
                        // ref={inputEl}
                        autoCapitalize='none'

                        onPressIn={() => {

                            // inputEl.current.focus();
                            // if (inputCity.current.isFocused())
                            //     return

                            // setIsVisible(true);
                            // setIsCityVisible(false)
                            // setIsZipVisible(false)
                            // setFilterArr(arrStates)
                            // scroll.current.scrollTo({ x: 0, y: 150, animated: true })
                        }}
                        onChangeText={(e) => {
                            // userStateLocation({ name: e, stateId: -1 });
                            // setIsVisible(isVisible)
                        }}
                        style={{
                            ...styles.styleTextInput,
                            marginStart: 10,
                            flex: 8,
                            marginEnd: 10,

                        }}
                        keyboardType="default"
                    //value={userState} 
                    />
                    <TouchableOpacity
                        onPress={() => {

                        }}
                    >
                        <Image source={Icons.icon_ios_arrow_down} />
                    </TouchableOpacity>


                </View>

                {(isVisible) ? <View style={{
                    width: '100%',
                    marginTop: 10,
                    ...styles.boxcontainer,
                    height: 150,
                    shadowRadius: 4,
                    borderRadius: 10,
                    zIndex: 1

                }}>

                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        //data={filterArray}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                    // chooseState({ name: item.item.name, stateId: item.item.id });
                                    // setIsVisible(false)

                                }}>
                                    <View >
                                        <Text style={{
                                            ...styles.generalTxt, borderColor: 'black',
                                            borderWidth: 0, width: '100%', padding: 10,
                                            borderRadius: 10, marginTop: 0,
                                            backgroundColor: 'white',
                                            color: 'black', fontSize: 14

                                        }}>{item.item.name}</Text>
                                    </View>
                                </TouchableOpacity>)
                        }}
                        keyExtractor={item => item.Country}
                    />

                </View> : null}

                <View style={{
                    ...styles.boxcontainer,
                    // shadowColor: validateCity ? 'black' : 'darkred',
                    // shadowOpacity: validateCity ? 0.25 : 1,
                    marginTop: 25, flexDirection: 'row', padding: 20, paddingTop: 0,
                    paddingBottom: 0, alignItems: 'center',
                }}>

                    <Image source={Icons.icon_blue_awesome_city} />
                    <TextInput placeholder="Select City"
                        //ref={inputCity}
                        autoCapitalize='none'
                        onPressIn={() => {
                            // setIsVisible(false)
                            // if (userState.length !== 0) {
                            //     setIsCityVisible(true)
                            //     setFilterCityArr(arrCity)
                            //     setIsZipVisible(false)
                            //     scroll.current.scrollTo({ x: 0, y: 200, animated: true })
                            // } else {
                            //     alert("Please select state first..")
                            //     setIsCityVisible(false)
                            //     setIsZipVisible(false)
                            // }
                        }
                        }
                        onChangeText={(e) => {
                            // setIsVisible(false)
                            // userCityLocation({ name: e, cityId: -1 });
                            // setIsCityVisible(true)
                            // setIsZipVisible(false)
                            // scroll.current.scrollTo({ x: 0, y: 200, animated: true })

                        }}
                        style={{
                            ...styles.styleTextInput,
                            marginStart: 10,
                            flex: 8,
                            marginEnd: 10

                        }}
                        keyboardType="default"
                    //value={userCity}

                    />

                    <TouchableOpacity
                        onPress={() => {
                            //setIsCityVisible(!isCityVisible);

                        }}
                    >
                        <Image source={Icons.icon_ios_arrow_down} />
                    </TouchableOpacity>
                </View>

                {(isCityVisible) ? <View style={{
                    zIndex: 1,
                    width: '100%',
                    marginTop: 10,
                    ...styles.boxcontainer,
                    height: 150,
                    shadowRadius: 4,
                    borderRadius: 10

                }}>
                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        //data={filterCityArray}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss();
                                    // chooseCity({ name: item.item.name, cityId: item.item.id });
                                    // setIsCityVisible(false)
                                    // setIsZipVisible(false)

                                }}>
                                    <View >
                                        <Text style={{
                                            ...styles.generalTxt, borderColor: 'black',
                                            borderWidth: 0, width: '100%', padding: 10,
                                            borderRadius: 10, marginTop: 0,
                                            backgroundColor: 'white',
                                            color: 'black', fontSize: 14

                                        }}>{item.item.name}</Text>
                                    </View>
                                </TouchableOpacity>)
                        }}
                        keyExtractor={item => item.Country}
                    />
                </View> : null}

                <View style={{
                    ...styles.boxcontainer,
                    //shadowColor: validateZipCode ? 'black' : 'darkred',
                    //shadowOpacity: validateZipCode ? 0.25 : 1,
                    marginTop: 25, flexDirection: 'row', padding: 20, paddingTop: 0, paddingBottom: 0, alignItems: 'center'
                }}>

                    <Image source={Icons.icon_blue_postalcode} />

                    <TextInput placeholder="Zip Code"
                        //ref={inputZipCode}
                        autoCapitalize='none'
                        onPressIn={() => {
                            // setIsVisible(false)
                            // setIsCityVisible(false)
                            // if (userCity.length !== 0) {
                            //     setIsVisible(false)
                            //     setIsCityVisible(false)
                            //     setIsZipVisible(true)
                            //     setFilterZipArr(GetZipcodeByCity)
                            //     scroll.current.scrollTo({ x: 0, y: 300, animated: true })
                            // } else {
                            //     alert("Please select city first..")
                            //     setIsCityVisible(false)
                            //     setIsZipVisible(false)
                            //     setIsZipVisible(false)
                            // }
                        }
                        }
                        onChangeText={(e) => {
                            // setIsVisible(false)
                            // setIsCityVisible(false)
                            // setZipCode(e)
                            // setIsZipVisible(true)
                            // scroll.current.scrollTo({ x: 0, y: 300, animated: true })

                        }}
                        style={{
                            ...styles.styleTextInput,
                            marginStart: 10,
                            flex: 8,
                            marginEnd: 10,
                        }}
                        maxLength={5}
                        keyboardType="number-pad"
                    //value={enterZipCode}

                    />

                    <TouchableOpacity
                        onPress={() => {
                            //setIsCityVisible(!isCityVisible);

                        }}
                    >
                        <Image source={Icons.icon_ios_arrow_down} />
                    </TouchableOpacity>
                </View>
                {(isZipVisible) ? <View style={{
                    zIndex: 1,
                    width: '100%',
                    marginTop: 10,
                    ...styles.boxcontainer,
                    height: 150,
                    shadowRadius: 4,
                    borderRadius: 10

                }}>
                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        //data={filterZipArray}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss();
                                    // setZipCode(item.item.zipcode);
                                    // setIsCityVisible(false)
                                    // setIsZipVisible(false)

                                }}>
                                    <View >
                                        <Text style={{
                                            ...styles.generalTxt, borderColor: 'black',
                                            borderWidth: 0, width: '100%', padding: 10,
                                            borderRadius: 10, marginTop: 0,
                                            backgroundColor: 'white',
                                            color: 'black', fontSize: 14

                                        }}>{item.item.zipcode}</Text>
                                    </View>
                                </TouchableOpacity>)
                        }}
                        keyExtractor={item => item.City}
                    />
                </View> : null}

                {getAddressCompOnly()}
            </View>
        )
    }

    function getAddressCompOnly() {
        return (
            <View>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginBottom: 5, marginStart: 5, marginTop: 15,
                }}>Address *</Text>
                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row', padding: 0, alignItems: 'center',
                    shadowColor: validateAddress ? 'black' : 'darkred',
                    shadowOpacity: validateAddress ? 0.25 : 1,
                    paddingStart: 15, paddingEnd: 15,
                }}>


                    <TextInput placeholder="" style={{
                        ...styles.styleTextInput,
                        flex: 1,

                    }}
                        maxLength={75}
                        autoCapitalize='none'
                        keyboardType="default"
                        onChangeText={(e) => {
                            setValidateAddress(Util.isLengthGreater(e))
                            setValueAddress(e)
                        }}
                        value={valueAddress} />
                </View>
            </View>
        )
    }
    {/******************** COMMON COMPONENTS ******************** */ }

    {/******************** PET TRAINING ******************** */ }

    function getRecurringProgram() {

        return (
            <View style={{
                marginTop: 15,
                marginLeft: -5
            }}>

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginBottom: 5, marginStart: 5
                }}>Class Frequency *</Text>
                <FlatList
                    numColumns={3}
                    data={['Daily', 'Weekly', 'Monthly']}
                    style={{}}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: selectFrequency === index ? '#FFC081' : '#F5F5F5',
                                borderRadius: 10,
                                marginTop: 5,
                                flex: 1,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: index === 0 ? 0 : 8,
                            }} onPress={() => setFrequency(
                                index
                            )}>

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

                {selectFrequency === 2 ? getMonthlyRecurring() : null}
                {selectFrequency === 1 ? getWeeklyRecurring() : null}
                {getClassTiming()}
                {serviceTypeIndex === 0 ? getAddressView() : null}
            </View>
        )
    }

    function getClassTiming() {

        return (
            <View marginTop={15} >
                {show ?
                    (isStartTiming ?
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            date={valueStartTiming ? new Date(valueStartTiming) : new Date()}
                            maximumDate={valueEndTiming ? new Date(valueEndTiming) : ''}
                            onConfirm={(time) => {
                                console.log('start-timing', time)
                                setValueStartTiming(time)
                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        /> :
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            date={valueEndTiming ? new Date(valueEndTiming) : new Date()}
                            minimumDate={valueStartTiming ? new Date(valueStartTiming) : ''}
                            onConfirm={(time) => {
                                console.log('end-timing', time)
                                setValueEndTiming(time);
                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        />) : null}

                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginStart: 5
                }}>Class Timing *</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 0,
                    }} onPress={() => {
                        setIsStartTiming(true)
                        setMode('time')
                        setShow(true);
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}>Start {valueStartTiming ? moment(valueStartTiming).format('hh:mm') : ''}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 10,
                        flexDirection: 'row'
                    }} onPress={() => {
                        setIsStartTiming(false)
                        setMode('time')
                        setShow(true);
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}>End {valueEndTiming ? moment(valueEndTiming).format('hh:mm') : ""}
                        </AutoSizeText>
                        <Image source={Icons.icon_blue_clock} />
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    function getNonRecurringProgram() {

        return (
            <View style={{
                marginTop: 15,
                marginLeft: -5,
            }}>

                <View style={{
                    backgroundColor: '#F5F5F5',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 10
                }}>
                    <TouchableOpacity style={{
                        borderRadius: 10,
                        paddingStart: 25,
                        paddingEnd: 25,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }} onPress={() => {
                        setShowDate(false)
                        setNonRecurrIndex(addNonRecurringClass.length)
                        setValueStartTiming('')
                        setValueEndTiming('')
                        setClassDate('');
                        setModalVisible(true);
                    }}
                    >

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.bottomSheetHeader,
                                textAlign: 'left',
                                width: '100%',
                            }}>Add Class
                        </AutoSizeText>
                        <Image source={Icons.icon_awesome_plus} />
                    </TouchableOpacity>
                    {addNonRecurringClass.length > 0 ?
                        <FlatList
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ paddingStart: 10, paddingEnd: 10, width: Dimensions.get('screen').width - 55 }}
                            data={addNonRecurringClass}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        marginTop: 5,
                                        height: 50,
                                        width: '100%',
                                        flexDirection: 'row'

                                    }} onPress={() => {
                                        setShowDate(false)
                                        setNonRecurrIndex(item.id)
                                        setValueStartTiming(addNonRecurringClass.length > 0 ? item.startTiming : '')
                                        setValueEndTiming(addNonRecurringClass.length > 0 ? item.endTiming : '')
                                        setClassDate(addNonRecurringClass.length > 0 ? item.date : '');
                                        setModalVisible(true)
                                    }
                                    }>

                                        <View
                                            style={{
                                                height: '100%', backgroundColor: Colors.appBgColor,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 0.2
                                            }} >

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={16}
                                                fontSize={30}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    fontFamily: Fonts.type.bold,
                                                    color: 'white'
                                                }}>{item.date ? moment(item.date).format("D") : ''}
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={10}
                                                fontSize={12}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    includeFontPadding: false,
                                                    fontFamily: Fonts.type.base,
                                                    marginTop: -5,
                                                    color: 'white'
                                                }}>{item.date ? moment(item.date).format("MMM") : ''}
                                            </AutoSizeText>


                                        </View>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center'
                                        }}>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={14}
                                                fontSize={16}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    fontFamily: Fonts.type.base,
                                                    paddingStart: 10,
                                                    paddingEnd: 10,
                                                    color: '#585858'
                                                }}>Pet Walking
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={14}
                                                fontSize={16}
                                                mode={ResizeTextMode.max_lines}
                                                style={{
                                                    ...styles.generalTxt,
                                                    fontFamily: Fonts.type.base,
                                                    paddingStart: 10,
                                                    paddingEnd: 10,
                                                    color: '#585858'
                                                }}>12:00 pm
                                            </AutoSizeText>
                                        </View>

                                    </TouchableOpacity>
                                )
                            }}

                        /> : null}
                </View>
                {serviceTypeIndex === 0 ? getAddressView(props, sheetRef) : null}

            </View>
        )
    }

    function getWeeklyRecurring() {
        return (
            <View>
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: 15, marginStart: 10
                }}>Days of the week *</Text>
                <FlatList
                    numColumns={4}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                backgroundColor: isDaySelect(item) ? '#FFC081' : '#F5F5F5',
                                borderRadius: 10,
                                marginTop: 5,
                                width: Dimensions.get('screen').width / 5,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginStart: 5,
                            }} onPress={() => setWeekFrequency(
                                { day: item }
                            )}>

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

                />
            </View>
        )
    }

    function setWeekFrequency(e) {
        let tmp = selectWeekFrequency;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.day === e.day);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        setSelectWeekFrequency(result => [...result, tmp])
    }

    function getMonthlyRecurring() {

        return (
            <View>
                {show ?
                    (isStartDate ?
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            date={recurStartDate ? new Date(recurStartDate) : new Date()}
                            maximumDate={recurEndDate ? new Date(recurEndDate) : new Date()}
                            onConfirm={(date) => {
                                setRecurStartDate(moment(date).format('DD-MM-YYYY'))

                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        /> :
                        <DateTimePickerModal
                            isVisible={show}
                            mode={mode}
                            date={recurEndDate ? new Date(recurEndDate) : new Date()}
                            minimumDate={recurStartDate ? new Date(recurStartDate) : new Date()}
                            onConfirm={(date) => {
                                setRecurEndDate(moment(date).format('DD-MM-YYYY'));
                                setShow(false)

                            }}
                            onCancel={() => { setShow(false) }}
                        />) : null}
                <Text style={{
                    ...styles.bottomSheetHeader,
                    marginTop: 15, marginStart: 5
                }}>Monthly Date *</Text>
                <View flexDirection='row' marginTop={0}>

                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 0,
                    }} onPress={() => {
                        setMode('date');
                        setShow(true);
                        setIsStartDate(true)

                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}> Date {recurStartDate}
                        </AutoSizeText>
                        <Image source={Icons.icon_material_date_range} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 10,
                        marginTop: 5,
                        flex: 1,
                        height: 50,
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 10,
                        flexDirection: 'row'
                    }} onPress={() => {
                        setMode('date');
                        setShow(true);
                        setIsStartDate(false)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={14}
                            fontSize={16}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#777777',
                                flex: 7,
                            }}> End {recurEndDate}
                        </AutoSizeText>
                        <Image source={Icons.icon_material_date_range} />
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

    function createClassProgram() {

        console.log("existing date-->", showDate);
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}

            >
                {showDate ?
                    <DateTimePickerModal
                        isVisible={showDate}
                        mode={mode}

                        date={classDate ? new Date(classDate) : new Date()}
                        onConfirm={(date) => {
                            console.log("Date--->", date)
                            setClassDate(moment(date).format('YYYY-MM-DD'))
                            setShowDate(false)

                        }}

                        onCancel={() => { setShowDate(false) }}
                    /> : null}

                <View style={{ ...styles.centeredView }}>
                    <View style={styles.modalView}>

                        <Text style={{
                            ...styles.bottomSheetHeader,
                            marginStart: 5
                        }}>Class Date *</Text>


                        <TouchableOpacity style={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: 10,
                            marginTop: 5,
                            height: 50,
                            flexDirection: 'row',
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginStart: 0,
                            marginBottom: 20
                        }} onPress={() => {
                            setMode('date')
                            setShowDate(true);
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={14}
                                fontSize={16}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    flex: 7,
                                }}>Date {classDate}
                            </AutoSizeText>
                            <Image source={Icons.icon_material_date_range} />
                        </TouchableOpacity>

                        {getClassTiming()}

                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            width: '40%', alignSelf: 'center',
                            marginTop: 45, backgroundColor: '#FFC081'
                        }} onPress={() => {
                            setNonRecurringClassItem({ id: nonRecurrIndex, date: classDate, startTiming: valueStartTiming, endTiming: valueEndTiming });
                            setModalVisible(false)
                        }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                color: Colors.appBgColor,
                                fontSize: 22, textAlign: 'center', padding: 10,
                                paddingTop: 5, paddingBottom: 5,

                            }}>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            width: '40%', alignSelf: 'center',
                            marginTop: 15, backgroundColor: 'white'
                        }} onPress={() => { setModalVisible(false) }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.base,
                                color: 'black',
                                fontSize: 18, textAlign: 'center', padding: 10,
                                paddingTop: 5, paddingBottom: 5,

                            }}>Cancel</Text>
                        </TouchableOpacity>


                    </View>


                </View>
            </Modal>
        )

    }

    function setNonRecurringClassItem(e) {

        console.log('non-recu-item', e)
        let tmp = addNonRecurringClass;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.id === e.id);
            if (itemService) {
                tmp = tmp.map(x => (x.id === e.id ? { ...e } : x));
            } else {
                tmp.push(e);
            }
        }
        setAddNonRecurringClass(tmp);
    }

    function isDaySelect(item) {

        console.log("day select-->", selectWeekFrequency.length + "-" + item);
        let itemService = selectWeekFrequency.find(e => e.day === item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }


    {/******************** PET TRAINING ******************** */ }

    function getAnimalCategory(type) {
        return DATA.find((x) => {
            return x.name.toLowerCase() === type.toLowerCase()
        });
    }

    {/******************** TRANSPORTATION ******************** */ }

    function isSelectService(item) {

        let tmp = animalCategory;
        let itemService = tmp.find(e => e.type === item);
        if (itemService) {
            return itemService.isSelect;
        } else {
            return false;
        }
    }

    function addAnimalCategory(e) {
        let tmp = animalCategory;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item.type === e.type);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
            }

        }
        SetAnimalCategory(result => [...result, tmp]);
    }

    {/******************** PET BOARDING ******************** */ }


    function addPetBoardingDiscount(e) {
        let tmp = arrPetBoardingDiscount;
        if (tmp.length > 0) {
            let itemService = tmp.find(item => item.id === e.id);
            if (itemService) {
                tmp = tmp.map(x => (x.id === e.id ? { ...e } : x));
                setArrPetBoardingDiscount(tmp);
                return
            }
        }
        setArrPetBoardingDiscount([...tmp, e]);

    }

    {/******************** UPDATE SERVICES W.R.T ANIMAL TYPE ******************** */ }

    function updateServiceValues(item) {

        commonUpdateValues(item);

        switch (animalType) {
            case 'Pet Grooming':
            case 'Veterinary':
                setDuration(item ? item.serviceDuration : '')
                break;

            case 'Transportation':
                setVehicleTypeIndex(item ? item.vehicleType : 0);
                setRegNumber((item ? item.regNum : ''))
                setRentPerMile(item ? item.rentPerMile : '')
                SetAnimalCategory(item ? item.transportAnimalType : [])
                break;

            case 'Pet Training':
                setProgramName(item ? item.programName : '');
                setRecurringProgramIndex(item ? item.recurrIndex : 0)
                setFrequency(item ? item.classFrequency : 0)
                setValueStartTiming(item ? item.startTiming : '')
                setValueEndTiming(item ? item.endTiming : '')
                setValueAddress(item ? item.address : '')
                setSelectWeekFrequency(item ? item.weekFrequency : [])
                setAddNonRecurringClass(item ? item.arrNonRecurr : [])
                break;

            case 'Pet Walking / Sitting':
                setCoverageArea(item ? item.covergaeArea : '');
                setValueBufferTime(item ? item.valueBufferTime : arrDuration[0]);
                break;

            case 'Breeding':
                setAreaConsultancy(item ? item.areaConsultancy : '')
                break;

            case 'Pet Boarding':
                setPackageName(item ? item.packageName : '');
                setRatePerDay(item ? item.ratePerDay : '');
                setBookingPeriod(item ? item.bookingPeriod : '');
                setDiscountType(item ? item.discountType : '');
                setArrPetBoardingDiscount(item ? item.arrPetBoardingDiscount : []);
                break;
        }
    }

    function commonUpdateValues(item) {
        setServiceName(item ? item.serviceName : '')
        setServiceTypeIndex(item ? item.serviceTypeIndex : 0);
        setDesc(item ? item.desc : '')
        setArrIndex(item ? item.id : wholeServices.length)
        setOnSitePrice(item ? item.onSitePrice : '')
        setOffSitePrice(item ? item.offSitePrice : '')
        setValidateAddress(item ? Util.isLengthGreater(item.address) : true)
        setValidateDesc(item ? Util.isLengthGreater(item.desc) : true)
        setValidateOnSite(item ? Util.isGraterThanZero(item.onSitePrice) : true)
        setValidateOffSite(item ? Util.isGraterThanZero(item.offSitePrice) : true)
        setValidateServiceName(item ? Util.isGraterThanZero(item.serviceName) : true)
        setRecurEndDate(item ? item.recurEndDate : '')
        setRecurStartDate(item ? item.recurStartDate : '')
    }

    function getServiceProviderName() {
        switch (animalType) {
            case 'Pet Walking / Sitting':
            case 'Veterinary':
            case 'Pet Grooming':
                return 'Add a new Service';

            case 'Pet Training':
                return 'Add Training Program';

            case 'Transportation':
                return 'Add a Vehicle';

            case 'Pet Boarding':
                return 'Add a Package';

            case 'Breeding':
                return 'Areas of Consultancy'

        }
    }
}
const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 50,
        backgroundColor: '#F5F5F5',
        elevation: 5,
        borderRadius: 10,
        marginTop: 2
    },
    generalTxt: {
        color: 'white',
        fontSize: 22,
        fontFamily: Fonts.type.medium
    },
    bottomSheetHeader: {
        color: '#464646',
        fontSize: 16,
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 14,
        color: '#464646',
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width,
        height: 350,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default AddNewServiceView;