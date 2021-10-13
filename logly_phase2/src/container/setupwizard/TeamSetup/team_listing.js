/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, ImageBackground, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Fonts, Colors, Icons, Images } from '../../../theme';


const vehicleData = ['Truck', 'PickUp', 'Car', 'MotorBike']

function TeamListing(props) {

    const { wholeServices, updateServiceValues, type, delTrainingProgram } = props;
    const [selectServices, setSelectServices] = useState([]);
    const [isEditShow, setEditShow] = useState(-1);

    return (
        <FlatList
            style={{ width:'102%' }}
            data={wholeServices}
            renderItem={({ item, index }) => {
                return (
                    getFriendItem(item, index)
                )
            }}
            keyExtractor={(item) => item.id}

        />
    )


    function getFriendItem(item, index) {
        return (
            <View style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                marginTop: 10,
                flex: 1,
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingEnd: 15,
  
            }} onPress={() => {

            }}>

                <Image source={Images.img_friend_sample} />


                <View style={{
                    flex: 1,
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={14}
                        fontSize={16}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            paddingStart: 10,
                            paddingEnd: 10,
                            color: '#585858'
                        }}>{item.name}
                    </AutoSizeText>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={14}
                        fontSize={16}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily:Fonts.type.base,
                            paddingStart: 10,
                            paddingEnd: 10,
                            color: '#585858'
                        }}>{item.email}
                    </AutoSizeText>
                </View>

                {isEditShow === index ?
                    <View style={{ height: 70, flex: 0.18, marginTop: 0, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={Images.img_popup_services} style={{ position: 'absolute', height: '100%', width: '100%' }} />
                        <TouchableOpacity
                            flex={0.1}
                            onPress={() => {
                                setEditShow(-1)
                                updateServiceValues(item)
                            }}>
                            <Image source={Icons.icon_services_edit} style={{ marginEnd: 2 }} />
                        </TouchableOpacity>
                        <View style={{
                            width: '50%', height: 0.5,
                            backgroundColor: '#585858',
                            marginEnd: 5,
                            marginTop: 8, marginBottom: 8
                        }} />
                        <TouchableOpacity
                            flex={0.1}
                            onPress={() => {
                                setEditShow(-1)
                                delTrainingProgram(index)
                            }}>
                            <Image source={Icons.icon_services_delete} style={{ marginEnd: 5 }} />
                        </TouchableOpacity>
                    </View> : <View flex={0.18} />}

                <TouchableOpacity
                    flex={0.16}
                    onPress={() => {
                        setEditShow(index)
                    }}>
                    <Image
                        source={Icons.icon_three_colons} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: 30
    }

});

export default TeamListing;