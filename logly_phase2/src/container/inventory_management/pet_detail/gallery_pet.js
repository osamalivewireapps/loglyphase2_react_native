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
import ImageGallery from './ImageGallery';


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

    useEffect(() => {
        setListFileUri(animalData.gallery);
    }, [animalData.gallery])

    const [] = useState()
    return (
        <View style={{
            flexDirection: 'column',
            height: Dimensions.get('screen').height / 2,
            justifyContent: 'flex-end',
            paddingBottom: verticalScale(30)

        }}>

            <ImageGallery
                style={{ flex: 1,paddingStart:moderateScale(20) }}
                listCollection={listFileUri} removeImage={(e) => removeImage(e)} />
            {/* <Pages
                containerStyle={{ flex: 1, paddingBottom: verticalScale(20) }}
                indicatorColor={Colors.appBgColor}
            >
                {listFileUri.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onLongPress={(e) => removeImage(item)}
                            style={{ flex: 1, alignItems: 'center' }}>
                            <ImagePlaceholder
                                showActivityIndicator={false}
                                activityIndicatorProps={{
                                    size: 'small',
                                    color: '#777777',
                                }}
                                resizeMode='cover'
                                placeholderStyle={{
                                    width: Dimensions.get('screen').width,

                                }}
                                imgStyle={{
                                    width: Dimensions.get('screen').width,
                                }}

                                style={{

                                }}

                                src={item.filename}
                                placeholder={Icons.icon_paw}
                            />
                        </TouchableOpacity>
                    )
                })}


            </Pages> */}

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
        values.animals = e._id
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
    function uploadImages(id) {


        let formdata2 = new FormData();
        formdata2.append("id", id);

        console.log("listFileUri--->", listFileUri);

        listFileUri.forEach((file, inn) => {
            if (!file.filename.includes('http')) {
                formdata2.append('file', {
                    uri: file.filename,
                    name: 'animalImage' + inn + ".jpg", type: 'image/jpg'
                });
            }
        })

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
                    const source = { uri: response.assets[0].uri, type: response.assets[0].type, fileName: response.assets[0].fileName };
                    //this.props.uploadPicRequest(source)

                    let tmp = listFileUri;
                    tmp.push({ filename: response.assets[0].uri })
                    setListFileUri(tmp)
                    uploadImages(props.route.params.id)
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
                    const source = { uri: response.assets[0].uri, type: response.assets[0].type, fileName: response.assets[0].fileName };
                    let tmp = listFileUri;
                    tmp.push({ filename: response.assets[0].uri })
                    setListFileUri(tmp)
                    uploadImages(props.route.params.id)
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