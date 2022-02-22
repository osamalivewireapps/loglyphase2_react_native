/* eslint-disable no-dupe-keys */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, Keyboard } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Fonts, Colors, Icons, Images } from "../../../theme";
import Util from "../../../utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { duration } from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { BUS_LISTING, BUS_SER_PROVIDER, INDIVIDUAL } from "../../../constants";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AboutUserView from "./about_user";
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import GalleryUser from "./gallery_user";
import GalleryUserVideos from "./videos_user";
import PetListing from "./pet_listing";

function ProfileView(props) {

    const [tabs, setTab] = useState(1);
    const { userObject, accountType, updateUser, capturePic, imgUri } = props;

    const [dialogVisibleStatus, setDialogVisibleStatus] = useState(false);

    const isSameUser = props.route.params?.id? false : true;

    return (
        <View style={{ flex: 1, }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />

            <View
                style={{
                    height: verticalScale(200),
                }}
            >
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute'
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
                            height: '100%',
                            width: '100%',

                        }}
                        imgStyle={{
                            height: '100%',
                            width: '100%',
                        }}

                        style={{
                        }}

                        src={userObject.coverImage ? userObject.coverImage : ''}
                        placeholder={Icons.icon_paw}
                    />

                </View>
                <View flexDirection='row' width='100%'
                    style={{
                        paddingStart: moderateScale(25),
                        paddingTop: verticalScale(30),
                    }}
                >
                    {props.route.params?.id ?
                        <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                            <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ margin: moderateScale(0), height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                            <Image source={Icons.icon_burger_menu} resizeMode='contain' style={{ height: moderateScale(25), width: moderateScale(25) }} />
                        </TouchableOpacity>
                    }

                </View>

               {isSameUser?
                <View
                    style={{ position: 'absolute', right: moderateScale(25), top: verticalScale(140) }}
                    flexDirection='row'>
                    <TouchableOpacity onPress={() => { setDialogVisibleStatus(true); }}>
                        <Image source={Icons.icon_black_edit_profile}
                            resizeMode='contain'
                            style={{
                                height: moderateScale(50),
                                width: moderateScale(50)
                            }} />
                    </TouchableOpacity>

                </View>:<View/>}

            </View>


            <View style={{ marginTop: verticalScale(-60) }}>
                <ImageBackground
                    style={{
                        backgroundColor: 'white',
                        borderTopStartRadius: moderateScale(30),
                        borderTopEndRadius: moderateScale(30),
                        marginTop: verticalScale(40),
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        position: 'absolute'
                    }}

                />
            </View>




            <View style={{
                marginTop: verticalScale(30),
                padding: moderateScale(25),
                alignItems: 'center',
                alignItems: 'flex-start',
                flexDirection: 'row',
                paddingBottom: moderateScale(10)

            }}>

                <View style={{
                    flex: 0.9,
                    marginStart: moderateScale(12)
                }}>


                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(18)}
                        style={{
                            fontFamily: Fonts.type.bold,
                            color: Colors.appBgColor,

                        }}
                    >
                        {userObject.name}
                    </AutoSizeText>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(16)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#464646',

                        }}
                    >
                        {accountType ? (accountType.toLowerCase().includes(INDIVIDUAL) ? 'Pet Lover' : accountType) : ''}
                    </AutoSizeText>




                </View>

                {isSameUser ?
                <TouchableOpacity
                    style={{
                        flex: 0.1,
                        tintColor: '#464646',
                        width: moderateScale(13),
                        height: moderateScale(13),
                        marginTop: verticalScale(10)

                    }}
                    onPress={() => props.navigation.navigate('EditProfile', { updateUser: updateUser })}
                >


                    <Image
                        resizeMode='contain'
                        style={{
                            tintColor: '#464646',
                            width: '100%',
                            height: '100%',

                        }}
                        source={Icons.icon_edit_petprofile} />
                </TouchableOpacity>:<View/>}
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: verticalScale(0)
            }}>

                <TouchableOpacity
                    onPress={() => {
                        setTab(0)
                    }
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Timeline</Text>

                    {tabs === 0 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setTab(1)
                    }
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>About</Text>
                    {tabs === 1 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setTab(2)
                    }
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Photos</Text>
                    {tabs === 2 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setTab(3)
                    }
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Videos</Text>
                    {tabs === 3 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

                <View
                    style={{
                        backgroundColor: 'transparent',
                        width: 1,
                        marginStart: moderateScale(10),
                        marginEnd: moderateScale(10),
                        height: verticalScale(10),
                        marginBottom: verticalScale(5)
                    }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setTab(4)
                    }
                    }
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        ...styles.generalTxt,
                        textAlign: 'center',
                        color: '#464646',
                        fontSize: moderateScale(14),
                        marginBottom: verticalScale(5)
                    }}>Pets</Text>
                    {tabs === 4 ? getHorizontalLine() : <View />}
                </TouchableOpacity>

            </View>

            <View
                style={{
                    width: '100%',
                    backgroundColor: '#DCDCDC',
                    height: verticalScale(2),
                    marginBottom: verticalScale(10)
                }}
            />
            <View>


                {getInnerScreens()}

            </View>


            <Dialog
                visible={dialogVisibleStatus}
                width={Dimensions.get("screen").width - 100}
                height={Dimensions.get("screen").height / 6}
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
                                capturePic('gallery');
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
                                capturePic('camera');
                                setDialogVisibleStatus(false);
                            }}>
                            Camera
                        </Text>
                    </View>
                </DialogContent>
            </Dialog>





        </View>
    );

    function getInnerScreens() {
        switch (tabs) {
            // case 0:
            //     return <ScheduleListingView {...props} />;

            case 1:
                return (
                    <AboutUserView {...props} isSameUser={isSameUser}/>
                );


            case 2:
                return (
                    <GalleryUser {...props} isSameUser={isSameUser}/>
                );


            case 3:
                return (
                    <GalleryUserVideos {...props} isSameUser={isSameUser}/>
                );

            case 4:
                return (<PetListing {...props} isSameUser={isSameUser} memberId={props.route.params?.id}/>)



        }
    }
    function getHorizontalLine() {
        return (
            <View style={{
                backgroundColor: Colors.appBgColor,
                borderTopStartRadius: moderateScale(5),
                borderTopEndRadius: moderateScale(5),
                height: verticalScale(3), width: moderateScale(30)
            }} />
        )
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
        height: moderateScale(48),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%',
        marginTop: verticalScale(2)
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(22),
        fontFamily: Fonts.type.base
    },
    generalTxt2: {
        color: 'white',
        fontSize: moderateScale(18),
        fontFamily: Fonts.type.base
    },
    bottomSheetHeader: {
        color: '#464646',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.medium
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(14),
        color: '#464646',
        width: '100%'

    },
    suffix: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(14),
        paddingStart: moderateScale(10),
        color: '#464646',
        width: '100%'
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(22),
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width,
        height: 350,
        margin: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: 'white',
        padding: moderateScale(30),
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

const theme = {
    'stylesheet.calendar.header': {
        dayHeader: {
            fontWeight: '600',
            color: '#48BFE3'
        }
    },
    'stylesheet.day.basic': {
        today: {
            borderColor: '#48BFE3',
            borderWidth: 0.8
        },
        todayText: {
            color: '#5390D9',
            fontWeight: '800'
        }
    }
};

export default ProfileView;