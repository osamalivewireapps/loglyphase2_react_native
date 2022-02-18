/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { uploadHealth, getAnimal, delHealthRecord } from '../../../actions/AnimalModule';
import { useDispatch } from "react-redux";
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import Util from '../../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../../../components/CustomButton';

function HealthPetView(props) {

    const { healthRecord,isSameUser } = props.animalData;

    const [arrHealthRecord, setArrHealthRecord] = useState([]);
    const [initialPg, setInitialPg] = useState(0);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(true);
    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [fileDoc, setFileDoc] = useState({});

    const sheetRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setArrHealthRecord(healthRecord)

    }, [healthRecord])

    return (

        <View style={{
            paddingStart: moderateScale(20),
            height: '80%',
            paddingBottom: verticalScale(0)

        }}>

            <View style={{
                ...styles.boxcontainer,
                marginBottom: 0, width: '90%', flexDirection: 'row',
            }}>

                <TouchableOpacity
                    style={{
                        width: '50%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(10),
                        backgroundColor: initialPg === 0 ? '#FFC081' : 'transparent',
                    }}
                    onPress={() => {
                        setInitialPg(0)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                    }}>
                        Health Record
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: moderateScale(10),
                        backgroundColor: initialPg === 1 ? '#FFC081' : 'transparent',
                    }}
                    onPress={() => {
                        setInitialPg(1)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.medium,
                        color: Colors.appBgColor,
                    }}>
                        Vaccination History
                    </Text>
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={sheetRef}
                height={Dimensions.get('screen').height - moderateScale(200)}
                openDuration={250}
                customStyles={{
                    container: {
                        borderRadius: moderateScale(30),
                    },
                }}
                onClose={() => setCloseBottonSheet(false)}
            >
                {showAddDocUI()}

            </RBSheet>
            {isBottonSheetVisible ? sheetRef.current.open() : null}

            {initialPg === 0 && arrHealthRecord.length > 0 ?
                    <FlatList
                        contentContainerStyle={{
                            flex:1
                        }}
                        data={arrHealthRecord}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    marginEnd: moderateScale(35),
                                    height: verticalScale(60),
                                    flexDirection: 'row',
                                    padding: moderateScale(10)

                                }} onPress={() => {

                                }}>

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
                                            borderWidth: moderateScale(1),
                                            borderColor: Colors.appBgColor,
                                            borderRadius: moderateScale(8)

                                        }}
                                        imgStyle={{
                                            height: '100%',
                                            width: '100%',
                                            borderWidth: moderateScale(1),
                                            borderColor: Colors.appBgColor,
                                            borderRadius: moderateScale(8)
                                        }}

                                        style={{
                                            flex: 0.2,
                                        }}

                                        src={item.filename?item.filename:''}
                                        placeholder={item.filename.includes('.pdf') ? Icons.icon_file_pdf : Icons.icon_paw}
                                    />


                                    <View style={{
                                        flex: 0.6,
                                        justifyContent: 'center'
                                    }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(16)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                paddingStart: moderateScale(10),
                                                paddingEnd: moderateScale(10),
                                                color: Colors.appBgColor
                                            }}>{item.fileNamed}
                                        </AutoSizeText>
                                        <AutoSizeText
                                            numberOfLines={2}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                fontFamily: Fonts.type.base,
                                                paddingStart: moderateScale(10),
                                                paddingEnd: moderateScale(10),
                                                color: '#585858'
                                            }}>{item.note}
                                        </AutoSizeText>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => {
                                            if (item.filename.includes('pdf'))
                                                props.navigation.navigate('PdfReader', { uri: item.filename })
                                            else {

                                                let tmp = [];
                                                tmp.push(item)
                                                props.navigation.navigate('ImageGallery', { style: { flex: 1 }, listCollection: tmp })

                                            }
                                        }
                                        }
                                        style={{
                                            flex: 0.2,
                                            justifyContent: 'center'
                                        }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.max_lines}
                                            style={{
                                                ...styles.generalTxt,
                                                textAlign: 'center',
                                                borderColor: Colors.appBgColor,
                                                padding: moderateScale(2),
                                                paddingStart: moderateScale(10),
                                                paddingEnd: moderateScale(10),
                                                color: Colors.appBgColor,
                                                borderWidth: moderateScale(1),
                                                borderRadius: moderateScale(10)
                                            }}>View
                                        </AutoSizeText>
                                    </TouchableOpacity>

                                    <CustomButton
                                        isSameUser={isSameUser}
                                        onPress={() => {
                                            delHealthRecords(props.animalData._id, item._id)
                                        }
                                        }
                                        styles={{
                                            justifyContent: 'center',
                                            marginStart: moderateScale(10)
                                        }}>
                                        <Image source={Icons.icon_close} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                                    </CustomButton>
                                </View>
                            )
                        }}
                        />
            
             : <View style={{flex:1}}/>}

            {initialPg === 0 ?
                <CustomButton
                    isSameUser={isSameUser} styles={{
                    ...styles.styleButtons, flex: 0,
                    margin: verticalScale(25),
                    marginStart: 0,
                    marginTop: verticalScale(10)
                }} onPress={() => { docPicker() }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                        paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                    }}>Add Document</Text>
                </CustomButton> : null}
        </View>
        //</ScrollView>
    );

    function showAddDocUI() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{
                    padding: moderateScale(25),
                    justifyContent: 'center',
                }}>
                    <View style={{
                        ...styles.boxcontainer,
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateName ? 'transparent' : 'darkred',
                        shadowOpacity: validateName ? 0.25 : 1,
                        padding: moderateScale(15),
                    }}>


                        <TextInput placeholder="File Name" style={{
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
                        ...styles.boxcontainer,
                        height: verticalScale(100),
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateDesc ? 'transparent' : 'darkred',
                        shadowOpacity: validateDesc ? 0.25 : 1,
                        marginTop: verticalScale(25),
                    }}>


                        <TextInput placeholder="Enter Notes" style={{
                            ...styles.styleTextInput,
                            flex: 1,
                            paddingTop: verticalScale(15),
                            padding: moderateScale(15),
                            textAlign: 'left',
                            height: verticalScale(100),
                        }}
                            underlineColorAndroid="transparent"
                            require={true}
                            multiline={true}
                            numberOfLines={50}
                            maxLength={75}
                            autoCapitalize="none"
                            keyboardType="default"
                            onChangeText={(e) => {
                                setValidateDesc(Util.isLengthGreater(e));
                                setDesc(e);
                            }
                            }
                            value={valueDesc} />
                    </View>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        marginTop: verticalScale(25),
                    }} onPress={() => {

                        if (!Util.isLengthGreater(valueName)) {
                            setValidateName(false);
                            return;
                        }
                        else if (!Util.isLengthGreater(valueDesc)) {
                            setValidateDesc(false);
                            return;
                        }
                        sheetRef.current.close();
                        setCloseBottonSheet(false);
                        setTimeout(() => {
                            uploadHealthDocs();
                        }, 1000)


                    }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                        }}>Done</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );

    }

    async function docPicker() {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
            });
            console.log("uri--->", res[0]);
            setFileDoc({ image: res[0].uri, fileName: res[0].name })
            setCloseBottonSheet(true);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }
    function uploadHealthDocs() {
        let formdata = new FormData();
        formdata.append("id", props.route.params.id);
        if (!fileDoc.image.includes("pdf")) {
            formdata.append('file', {
                uri: fileDoc.image,
                name: fileDoc.fileName, type: 'image/*'
            })
        }
        else {
            formdata.append('file', {
                uri: fileDoc.image,
                name: fileDoc.fileName, type: 'application/pdf'
            })
        }

        formdata.append('note', valueDesc)
        formdata.append('fileNamed', valueName)

        console.log("pdf doc--->", formdata);

        dispatch(uploadHealth(formdata)).then((responseData) => {
            setValueName('');
            setValidateDesc('');
            dispatch(getAnimal(props.route.params.id));
        })
    }

    function delHealthRecords(id,healthRecord){
        dispatch(delHealthRecord(id,healthRecord)).then((responseData) => {
            dispatch(getAnimal(props.route.params.id));
        })
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

export default HealthPetView;