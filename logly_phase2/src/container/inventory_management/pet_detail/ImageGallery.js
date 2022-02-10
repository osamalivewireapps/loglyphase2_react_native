/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { Pages } from 'react-native-pages';
import { useDispatch } from "react-redux";
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { DeleteImage, UploadAnimalImages, getAnimal } from '../../../actions/AnimalModule';
import { DisableLoader, EnableLoader } from '../../../actions/LoaderProgress';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import VideoPlayer from 'react-native-video-player';

function ImageGallery(props) {


    const { listCollection, style, removeImage } = props;
    const [listFileUri, setListFileUri] = useState([])


    useEffect(() => {
        console.log
        setListFileUri(props.route?.params ? props.route.params.listCollection : props.listCollection);
    }, [props.route?.params ? props.route.params.listCollection : props.listCollection])

    const [] = useState()
    return (
        <View style={{
            ...props.route?.params ? props.route.params.style : props.style,

        }}>

            <Pages
                style={{
                    flex: 1,
                }}
                indicatorColor='#fff'
            >
                {listFileUri && listFileUri.length > 0 ? listFileUri.map((item, index) => {
                    console.log("images--->", item.filename)
                    return (
                        <View

                            style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}>
                            {item.type ? !item.type.toLowerCase().includes('video') ?
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        marginEnd: 100
                                    }}
                                >


                                    <ImagePlaceholder
                                        showActivityIndicator={true}
                                        activityIndicatorProps={{
                                            size: 'small',
                                            color: '#777777',
                                        }}
                                        resizeMode='cover'
                                        placeholderStyle={{
                                            width: Dimensions.get('screen').width,
                                            height: '100%'

                                        }}
                                        imgStyle={{
                                            width: Dimensions.get('screen').width,
                                        }}

                                        style={{
                                        }}

                                        src={item.filename?item.filename:''}
                                        placeholder={Icons.icon_paw}
                                    />



                                </View> :
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        marginEnd: 100
                                    }}
                                >
                                    <VideoPlayer
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                        }}
                                        video={{ uri: item.filename }}
                                        videoWidth={1600}
                                        videoHeight={900}
                                    />
                                </View>
                                : <View />}

                            <TouchableOpacity
                                onPress={() => removeImage(item._id)}
                                style={{
                                    justifyContent: 'center',
                                    margin: moderateScale(10),
                                }}>
                                <Image source={Icons.icon_close} resizeMode='contain' style={{
                                    tintColor: 'white',
                                    height: verticalScale(10), width: verticalScale(10)
                                }} />
                            </TouchableOpacity>
                        </View>
                    )
                }) : <View />}


            </Pages>




        </View>
    )


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
        borderRadius: moderateScale(10)
    }
});

export default ImageGallery;