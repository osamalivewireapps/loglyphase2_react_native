/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import ViewPager from '@react-native-community/viewpager';
import Util from '../../../utils';
import styles from '../styles';
import AddAnimalsGroups from './add_animals_groups';
import AddTeamGroups from './add_team_groups';
import SummaryGroups from './summary_group';
import { useDispatch } from 'react-redux';
import { getAnimals } from '../../../actions/AnimalModule';
import { getTeamMembers } from '../../../actions/TeamMembersModule';
import Loader from '../../../components/Loader';
import { DisableLoader, EnableLoader } from '../../../actions/LoaderProgress';
import AppLoader from '../../../components/AppLoader';
import utils from '../../../utils';

function CreateGroupView(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [contactList, setGroupsList] = useState([]);

    const isTablet = DeviceInfo.isTablet();

    const { listGroups, updateContacts, route } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(props.route.params.groupData ? props.route.params.groupData.name:'');
    const [pageNumber, setPageNumber] = useState(0);

    const [addAnimals, setAddAnimals] = useState([]);
    const [addTeams, setTeams] = useState([]);

    const [allAnimals, setAllAnimals] = useState([]);
    const [allTeams, setAllTeams] = useState([]);

    const pagerRef = useRef(null)


    let dispatch = useDispatch();

    console.log("props group data-->", props.route.params)

    useEffect(() => {
        if (listGroups.length > 0) {
            setGroupsList(listGroups.filter((e) => {
                return (e.name.toLowerCase().startsWith(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

    useEffect(() => {
        setGroupsList(listGroups)
    }, [listGroups]);

    useEffect(() => {
        if (props.route.params?.groupData) {
            allAnimals.length > 0 ? allAnimals : getAnimal().then(response => {

                console.log('response--->', response)
                setExistingAnimalsValues(response)
                setAllAnimals(response)


            });

            allTeams.length > 0 ? allTeams : getTeams().then(response => {
                console.log('response--->', response)
                setExistingTeamValues(response)
                setAllTeams(response)
            });



        }
    }, [props.route.params?.groupData])

    function setExistingAnimalsValues(tmpAllAnimals) {
        let tmpAnimals = [];
        props.route.params?.groupData.animals.filter((value) => {
            console.log('outer animal--->', value.id);
            tmpAllAnimals.forEach((innerValue) => {
                console.log('inner animal--->', innerValue._id);
                if (value.id === innerValue._id)
                    tmpAnimals.push(innerValue)
            })
        })

        console.log('existying animal--->', tmpAnimals);
        setAddAnimals(tmpAnimals);
    }

    function setExistingTeamValues(tmpAllTeams) {
        let tmpAnimals = [];
        props.route.params?.groupData.employees.filter((value) => {
            console.log('outer team--->', value.id);
            tmpAllTeams.forEach((innerValue) => {
                console.log('inner team--->', innerValue._id);
                if (value.id === innerValue._id)
                    tmpAnimals.push(innerValue)
            })
        })

        console.log('existying teams--->', tmpAnimals);
        setTeams(tmpAnimals);
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
                    <TouchableOpacity onPress={() => {
                        backScreen();
                    }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>


                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginBottom: verticalScale(15)
                }}>

                    {
                        getHeaderSubView()
                    }

                    <TouchableOpacity

                        style={{
                            flex: isTablet ? 0.18 : 0.45,
                            width: '100%'
                        }}
                        onPress={() => {
                            if (props.route.params.groupData || pageNumber > 0) {
                                setIsEdit(!isEdit)
                            } else
                                setIsEdit(false)
                        }}>
                        <Image source={!props.route.params.groupData && pageNumber === 0 ? Icons.icon_header_add_contacts : Icons.icon_edit_petprofile} resizeMode='contain'
                            style={{
                                tintColor: Colors.appBgColor,
                                width: '100%', height: !props.route.params.groupData && pageNumber === 0 ? moderateScale(40) : moderateScale(15)
                            }} />

                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ flex: 1, padding: moderateScale(25) }}>

                {props.route.params?.groupData ?
                    getSummaryView()
                    : <ViewPager

                        style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>

                        {getCreateView()}
                        {getFirstView()}
                        {getSecondView()}
                        {getSummaryView()}

                    </ViewPager>
                }


            </View>
            {props.route.params.groupData && ((props.route.params.groupData.animals.length > 0 || props.route.params.groupData.length > 0) && addTeams.length === 0 && addAnimals.length === 0) ?
                <AppLoader loader={{ isLoading: true }} />
                : <View />}


        </View>);

    function getCreateView() {
        return (
            <View key={0} style={{
                paddingStart: moderateScale(5), paddingEnd: moderateScale(5)
            }}>
                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: '#404040',
                        marginTop: verticalScale(10),
                        marginStart: moderateScale(10)

                    }}
                >
                    Group Name
                </AutoSizeText>

                <View style={{
                    ...styles.boxcontainer,
                    backgroundColor: '#F5F5F5',
                    borderRadius: moderateScale(10),
                    flexDirection: 'row', alignItems: 'center',
                    shadowColor: validateName ? 'transparent' : 'darkred',
                    shadowOpacity: validateName ? 0.25 : 1,
                    padding: moderateScale(15),
                    marginTop: verticalScale(10),
                    paddingTop: moderateScale(10),
                    paddingBottom: moderateScale(10)
                }}>


                    <TextInput placeholder="Group Name" style={{
                        ...styles.styleTextInput,
                        flex: 1,
                        textAlign: 'left',
                    }}
                        underlineColorAndroid="transparent"
                        require={true}
                        numberOfLines={1}
                        autoCapitalize="none"
                        keyboardType="default"
                        onChangeText={(e) => {
                            setValidateName(Util.isLengthGreater(e));
                            setValueName(e);
                        }
                        }
                        value={valueName} />
                </View>

                <View style={{
                    marginTop: verticalScale(10),
                    flex: 1,
                    padding: moderateScale(10),
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity style={{
                        ...styles.styleButtons,
                        width: '100%',


                    }} onPress={() => {
                        if (utils.isLengthGreater(valueName))
                            nextScreen()
                        else {
                            utils.topAlertError("Group name is required");
                        }
                    }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: moderateScale(12),
                            paddingBottom: moderateScale(12),
                            ...styles.generalTxt
                        }}>CREATE GROUP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons,
                        backgroundColor: 'white',
                        width: '100%'
                    }} onPress={() => { props.navigation.pop() }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: moderateScale(12),
                            paddingBottom: moderateScale(12),
                            ...styles.generalTxt,
                            color: '#404040',
                        }}>Discard</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    function getSummaryView() {
        return (
            <View key={3} style={{ height: '100%' }}>
                <SummaryGroups {...props} nextScreen={() => nextScreen()} animals={addAnimals} team={addTeams}
                    
                    groupName={valueName}
                    getAnimalList={() => {
                        return new Promise((resolve) => {
                            if (!allAnimals || allAnimals.length === 0) {
                                getAnimal().then(response => {
                                    console.log('response--->', response)
                                    setAllAnimals(response)
                                    resolve(response)
                                });
                            } else if (allAnimals.length > 0) {
                                resolve(allAnimals)
                            }
                        })
                    }}

                    getTeamList={() => {
                        return new Promise((resolve) => {
                            if (!allTeams || allTeams.length === 0) {
                                getTeams().then(response => {
                                    console.log('response--->', response)
                                    setAllTeams(response)
                                    resolve(response)
                                });
                            } else if (allTeams.length > 0) {
                                resolve(allTeams)
                            }
                        })
                    }}
                />

            </View>
        )
    }

    function getFirstView() {
        return (<View key={1}>
            <AddAnimalsGroups {...props} nextScreen={(e) => nextScreen(e)} animals={addAnimals} getAnimalList={() => {
                return new Promise((resolve) => {
                    if (!allAnimals || allAnimals.length === 0) {
                        getAnimal().then(response => {
                            console.log('response--->', response)
                            setAllAnimals(response)
                            resolve(response)
                        });
                    } else if (allAnimals.length > 0) {
                        resolve(allAnimals)
                    }
                })
            }} />
        </View>)



    }

    function getSecondView() {
        return (
            <View key={2}>
                <AddTeamGroups {...props} nextScreen={(e) => nextScreen(e)} team={addTeams}
                    getTeamList={() => {
                        return new Promise((resolve) => {
                            if (!allTeams || allTeams.length === 0) {
                                getTeams().then(response => {
                                    console.log('response--->', response)
                                    setAllTeams(response)
                                    resolve(response)
                                });
                            } else if (allTeams.length > 0) {
                                resolve(allTeams)
                            }
                        })
                    }}

                />
            </View>
        )
    }
    function nextScreen(e) {
        if (pageNumber + 1 < 4) {

            if (pageNumber === 1) {
                setAddAnimals(e)
            } else if (pageNumber === 2) {
                setTeams(e)
            }
            pagerRef.current.setPage(pageNumber + 1);
            setPageNumber(pageNumber + 1)


        } else {
            setTimeout(() => {
                setPageNumber(0)

            }, 1000)
            props.navigation.pop()
        }


    }

    function backScreen(e) {
        if (pageNumber > 0) {
            pagerRef.current.setPage(pageNumber - 1);
            setPageNumber(pageNumber - 1)
            setIsEdit(false)
        }
        else {
            props.navigation.pop()
        }
    }

    function getHeaderSubView() {

        if (!props.route.params.groupData && pageNumber === 0)
            return (
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
                    Create Group

                </AutoSizeText>)

        else
            return (
                <View style={{
                    flex: 1, paddingStart: moderateScale(25),
                }}>
                    <Text style={{
                        color: '#A1A1A1',
                        fontSize: moderateScale(14),
                        fontFamily: Fonts.type.base
                    }}>Group Name</Text>

                    <TextInput
                        editable={isEdit ? true : false}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(22)}
                        onChangeText={(value) => setValueName(value)}
                        selectTextOnFocus={isEdit ? true : false}
                        style={{
                            color: Colors.appBgColor,
                            flex: 0.9,
                            textAlignVertical:'center',
                            fontFamily: Fonts.type.medium
                        }}>

                        {valueName}

                    </TextInput>
                </View>)

    }

    function getAnimal() {
        return new Promise((resolve) => {
            dispatch(getAnimals()).then((response) => {
                resolve(response.payload);
            })
        })
    }

    function getTeams() {
        return new Promise((resolve) => {
            dispatch(getTeamMembers()).then((response) => {
                resolve(response.payload);
            })
        })
    }

}


export default CreateGroupView;