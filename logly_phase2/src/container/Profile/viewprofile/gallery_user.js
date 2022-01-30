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
import { DeleteImage, uploadUserGallery } from '../../../actions/LoginModule';
import { DisableLoader, EnableLoader } from '../../../actions/LoaderProgress';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import ImageGallery from '../../inventory_management/pet_detail/ImageGallery';
import moment from 'moment';


function GalleryUser(props) {

    let options = {
        title: 'Select Image',
        mediaType: 'image',
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

    const { userObject, accountType, updateUser } = props;
    const dispatch = useDispatch();
    const [listFileUri, setListFileUri] = useState([])

    useEffect(() => {
        if (userObject.gallery.length > 0)
            setListFileUri(userObject.gallery.filter((value) => !value.type.toLowerCase().includes('video')));
    }, [userObject.gallery])

    const [] = useState()
    return (
        <View style={{
            flexDirection: 'column',
            height: Dimensions.get('screen').height / 1.7,
            justifyContent: 'flex-end',
            paddingBottom: verticalScale(30)

        }}>

            <ImageGallery
                style={{ flex: 1, paddingStart: moderateScale(20) }}
                listCollection={listFileUri} removeImage={(e) => removeImage(e)} />

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

                }}>Add Photos</Text>
            </TouchableOpacity>
        </View>
    )

    ///////////////////////   DELETE IMAGES ////////////////
    function deleteHandler(e) {
        let values = {};
        values.id = userObject._id
        values.galleryImages = [e]
        dispatch(DeleteImage(values)).then((response) => {
            updateUser();
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
        formdata2.append('id', id);

        console.log("listFileUri--->", listFileUri);

        listFileUri.forEach((file, inn) => {
            if (!file.filename.includes('http')) {
                formdata2.append('file', {
                    uri: file.filename,
                    name: 'user_gallery' + moment().unix() + ".jpg", type: 'image/jpg'
                });
            }
        })

        dispatch(uploadUserGallery(formdata2)).then((response) => {
            if (response)
                updateUser();
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
                    uploadImages(userObject._id)
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
                    setListFileUri(tmp)
                    uploadImages(userObject._id)
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

export default GalleryUser;