/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
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
import ImageGallery from './ImageGallery';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';

function GalleryPetView(props) {

    let options = {
        title: 'Select Image',
        mediaType: 'mixed',
        maxWidth: 500,
        maxHeight: 500,
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const { animalData, route } = props;
    const dispatch = useDispatch();
    const [listFileUri, setListFileUri] = useState([])

    const isTablet = DeviceInfo.isTablet();

    useEffect(() => {
        setListFileUri(animalData.gallery);
    }, [animalData.gallery])

    const [] = useState()
    return (
        <View style={{
            height: '80%',
            justifyContent: 'flex-end',
            paddingBottom: verticalScale(10)

        }}>

         
            {listFileUri && listFileUri.length > 0 ?

                <FlatList
                    numColumns={2}
                    contentContainerStyle={{
                        padding: moderateScale(25),
                    }}
                    data={listFileUri}
                    renderItem={({ item, index})=>{
                        console.log('item---->',item)
                        return(
                            <View

                                style={{
                                    flex: 0.5,
                                    backgroundColor:'yellow',
                                    marginTop:verticalScale(10),
                                    height: isTablet ? verticalScale(195) : verticalScale(120),
                                    marginEnd: (index % 2 === 0) ? (index === listFileUri.length - 1) ? 0 : verticalScale(10) : 0,

                                }}>
                                {item.type ? !item.type.toLowerCase().includes('video') ?
                                    <View
                                        style={{
                                            ...styles.boxcontainer,
                                            width: '100%',
                                            position: 'absolute',
                                            height: isTablet ? verticalScale(195) : verticalScale(120),


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
                                                

                                            }}
                                            imgStyle={{
                                                borderRadius: moderateScale(10),
                                                borderWidth: 1,
                                                borderColor: 'transparent',
                                            }}

                                            style={{
                                                width:'100%',
                                                borderRadius: moderateScale(10),
                                            }}

                                          
                                            src={item.filename}
                                            placeholder={Icons.icon_paw}
                                        />



                                    </View> :
                                    <View
                                        style={{
                                            width: '100%',
                                            position: 'absolute',
                                            height: isTablet ? verticalScale(195) : verticalScale(120),

                                        }}
                                    >
                                        <VideoPlayer
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: moderateScale(10),
                                            }}
                                            video={{ uri: item.filename }}
                                            videoWidth={1600}
                                            videoHeight={900}
                                        />
                                    </View>
                                    : <View style={{
                                        width:'100%',
                                        backgroundColor:'red',
                                        height:Dimensions.get('window').height/2}}/>}

                                <TouchableOpacity
                                    onPress={() => removeImage(item._id)}
                                    style={{
                                        alignSelf:'flex-end',
                                        margin: moderateScale(10),
                                    }}>
                                    <Image source={Icons.icon_close} resizeMode='contain' style={{
                                        tintColor: 'white',
                                        height: verticalScale(10), width: verticalScale(10)
                                    }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />

                : <View style={{flex:1}}/>}

            <TouchableOpacity style={{
                ...styles.styleButtons, flex: 0,
                margin: verticalScale(25),
                marginStart: moderateScale(25),
                marginTop: verticalScale(15)
            }} onPress={() => { getPic('gallery') }}>
                <Text style={{
                    ...styles.generalTxt,
                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                }}>Add Photos / Videos</Text>
            </TouchableOpacity>
        </View>
    )

    ///////////////////////   DELETE IMAGES ////////////////
    function deleteHandler(e) {
        let values = {};
        values.id = animalData._id
        values.animals = e
        dispatch(DeleteImage(values)).then((response) => {
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }



    function removeImage(e) {
        Alert.alert('Delete Image', 'Are you sure?',
            [{ text: 'Cancel' },
            {
                text: 'OK', onPress: () => { deleteHandler(e) }
            },],
            { cancelable: false }
        );
    }


    ///////////////////////   UPLOAD IMAGES ////////////////
    function uploadImages(id, isVideo, videoUri) {

        console.log('isVideo-->', videoUri)

        let formdata2 = new FormData();
        formdata2.append("id", id);

        console.log("listFileUri--->", listFileUri);

        if (!isVideo)
            listFileUri.forEach((file, inn) => {
                if (!file.filename.includes('http')) {
                    formdata2.append('file', {
                        uri: file.filename,
                        name: 'animalImage' + moment().unix() + ".jpg", type: 'image/jpg'
                    });
                }
            })
        else {
            formdata2.append('file', {
                uri: Platform.OS === "android" ? videoUri : videoUri.replace("file://", ""),
                name: 'user_video' + moment().unix() + ".mp4", type: 'video/quicktime',
            });
        }

        dispatch(UploadAnimalImages(formdata2)).then((response) => {
            dispatch(getAnimal(id));
            props.route.params.updateAnimal();
        })
    }


    //////////////////////////  CAMERA && GALLERY //////////////////
    function getPic(txt, isAddCollection) {

        if (txt === 'camera') {
            launchCamera({ options, mediaType: 'photo' }, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.errorCode) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    //this.props.uploadPicRequest(source)

                    let tmp = listFileUri;
                    tmp.push({ filename: response.uri })
                    setListFileUri(tmp)
                    //uploadImages(props.route.params.id,tmp)
                }
            });
        }
        else {
            launchImageLibrary(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    let tmp = listFileUri;
                    tmp.push({ filename: response.uri })

                    if (!response.duration)
                        setListFileUri(tmp)
                    uploadImages(props.route.params.id, response.duration ? true : false, response.uri)
                }
            });
        }
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
        borderRadius: moderateScale(10)
    }
});

export default GalleryPetView;