/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo, { useFirstInstallTime } from 'react-native-device-info';
import styles from '../styles'
import AddAnimalsGroups from './add_animals_groups';
import AddTeamGroups from './add_team_groups';
import { editGroup, addGroup } from '../../../actions/GroupsModule';
import { useDispatch } from 'react-redux';
import utils from '../../../utils';



function SummaryGroups(props) {

    const { nextScreen, animals, team, getAnimalList, getTeamList, groupName } = props;

    console.log('sumaary prop getAnimalList--->', props)


    const [tabs, setTab] = useState(-1);
    const [finalAnimalList, setFinalAnimalList] = useState(animals);
    const [finalTeamList, setFinalTeamList] = useState(team);

    let dispatch = useDispatch();

    useEffect(() => setFinalAnimalList(animals), [animals]);
    useEffect(() => setFinalTeamList(team), [team]);

    useEffect(() => {
    }, [finalAnimalList]);

    useEffect(() => {
    }, [finalTeamList]);

    useEffect(() => {
        console.log('group Name-->', groupName)
    }, [groupName]);

    useEffect(() => {
        setTab(0)

    }, [props.isAllData])

    return (
        <View style={{ flex: 1 }}>


            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: verticalScale(15)
            }}>

                <TouchableOpacity
                    onPress={() => setTab(0)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Animals</Text>

                    {tabs === 0 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: '#BEBEBE',
                        width: 1,
                        marginStart: moderateScale(30),
                        marginEnd: moderateScale(30),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => setTab(1)}
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Team Members</Text>
                    {tabs === 1 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

            </View>
            <View style={{ minHeight: Dimensions.get('screen').height / 2 }}>


                {getInnerScreens()}

            </View>

            <TouchableOpacity style={{
                ...styles.styleButtons,
                width: '100%',


            }} onPress={() => { editGroups(props.route.params.groupData?._id) }}>
                <Text style={{
                    fontSize: moderateScale(22), textAlign: 'center',
                    padding: moderateScale(10),
                    paddingTop: moderateScale(12),
                    paddingBottom: moderateScale(12),
                    ...styles.generalTxt
                }}>Done</Text>
            </TouchableOpacity>




        </View>
    );


    function getInnerScreens() {

        switch (tabs) {
            case 0:
                return <AddAnimalsGroups {...props} isSummary animals={finalAnimalList} getAnimalList={getAnimalList} getFinalAnimalList={(e) => {
                    console.log('final animals--->', e)
                    setFinalAnimalList(e)
                }} />;

            case 1:
                return <AddTeamGroups {...props} isSummary team={finalTeamList} getTeamList={getTeamList} getFinalTeamList={(e) =>{
                    console.log('final teams--->',e)
                    setFinalTeamList(e)}
                 } />;


        }
    }

    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: '#F3950D',
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
        )
    }

    function editGroups(id) {

        if (!utils.isLengthGreater(groupName)) {
            utils.topAlertError("Group name is required");
            return
        }

        let animals = [], employees = []
        finalAnimalList.forEach((value) => {
            animals.push({ id: value._id })
        })
        finalTeamList.forEach((value) => {
            employees.push({ id: value._id })
        })
        let postData = { animals, employees, name: groupName }

        if (props.route.params.groupData)
            dispatch(editGroup(id, postData)).then((response) => {
                if (response) {
                    props.navigation.pop()
                    props.route.params.updateContacts();
                }
            })
        else {
            dispatch(addGroup(postData)).then((response) => {
                if (response) {
                    props.navigation.pop()
                    props.route.params.updateContacts();
                }
            })
        }

    }


}

export default SummaryGroups;
