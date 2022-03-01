/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { useDispatch } from "react-redux";
import { getAnimal, addParent, deleteParent, deleteChild } from '../../../actions/AnimalModule';
import CustomButton from '../../../components/CustomButton';

function FamilyTreePetView(props) {

    const { animalData, route, isSameUser } = props;
    const [father, setFather] = useState(animalData && animalData.family.parent1 ? animalData.family.parent1 : '');
    const [mother, setMother] = useState(animalData && animalData.family.parent2 ? animalData.family.parent2 : '');
    const [children, setChildren] = useState(animalData && animalData.family.children ? animalData.family.children : []);

    const dispatch = useDispatch();

    console.log("props1234--->", props);

    return (
        <ScrollView style={{
            height: '100%',

        }}>
            <View style={{
                paddingTop: 0,
                paddingStart: moderateScale(20),
                paddingEnd: verticalScale(20),
                height: '100%',
                paddingBottom: verticalScale(10),

            }}>
                <Text style={{
                    marginTop: verticalScale(25),
                    ...styles.generalTxt, color: '#464646',
                    fontFamily: Fonts.type.medium,
                }}>Parents</Text>

                <View flexDirection='row' marginTop={0}>

                    <CustomButton
                        isSameUser={isSameUser} styles={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(5),
                            flex: 1,
                            height: verticalScale(40),
                            flexDirection: 'row',
                            paddingStart: moderateScale(15),
                            paddingEnd: moderateScale(15),
                            alignItems: 'center',
                            marginStart: 0,
                        }} onPress={() => {
                            if (!father || !father.name)
                                props.navigation.navigate('AllAnimal', { FamilyData: getFamily(), mainId: animalData._id, updateAnimal: (e) => { addAnimalasParent(e, true) } })
                            else {
                                deleteAnimalasParent(father, true)
                            }
                        }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#464646',
                                paddingEnd: moderateScale(5),
                                flex: 7,
                            }}>{father && father.name ? father.name : 'Add Father'}
                        </AutoSizeText>
                        <Image source={father ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                    </CustomButton>
                    <CustomButton
                        isSameUser={isSameUser}
                        styles={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(5),
                        flex: 1,
                        height: verticalScale(40),
                        paddingStart: moderateScale(15),
                        paddingEnd: moderateScale(15),
                        alignItems: 'center',
                        marginStart: moderateScale(10),
                        flexDirection: 'row'
                    }} onPress={() => {
                        if (!mother || !mother.name)
                            props.navigation.navigate('AllAnimal', { FamilyData: getFamily(), mainId: animalData._id, updateAnimal: (e) => { addAnimalasParent(e, false) } })
                        else {
                            deleteAnimalasParent(mother, false)
                        }
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                ...styles.generalTxt,
                                color: '#464646',
                                flex: 7,
                            }}>{mother && mother.name ? mother.name : 'Add Mother'}
                        </AutoSizeText>
                        <Image source={mother ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                    </CustomButton>


                </View>
                <Text style={{
                    marginTop: verticalScale(25),
                    ...styles.generalTxt, color: '#464646',
                    fontFamily: Fonts.type.medium,
                }}>Child</Text>

                <FlatList
                    numColumns={2}
                    data={children}
                    renderItem={({ item, index }) => {

                        return (
                            <CustomButton
                                isSameUser={isSameUser}
                                styles={{
                                backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(5),
                                flex: 0.5,
                                height: verticalScale(40),
                                flexDirection: 'row',
                                paddingStart: moderateScale(15),
                                paddingEnd: moderateScale(15),
                                alignItems: 'center',
                                marginStart: index % 2 === 0 ? 0 : moderateScale(10),
                            }} onPress={() => {
                                deleteChildAsParent(item, index)
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        ...styles.generalTxt,
                                        color: '#464646',
                                        paddingEnd: moderateScale(5),
                                        flex: 7,
                                    }}>{item && item.data ? item.data.name : ''}
                                </AutoSizeText>
                                <Image source={item && item.data ? Icons.icon_close : Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                            </CustomButton>
                        )
                    }}
                />

                <CustomButton
                    isSameUser={isSameUser} styles={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: moderateScale(10),
                    marginTop: verticalScale(15),
                    //flex: 1,
                    width: '55%',
                    height: verticalScale(40),
                    flexDirection: 'row',
                    paddingStart: moderateScale(15),
                    paddingEnd: moderateScale(15),
                    alignItems: 'center',
                    marginStart: 0,
                }} onPress={() => {
                    let family = getFamily();
                    family.children = children;
                    props.navigation.navigate('AllAnimal', {
                        FamilyData: family, mainId: '', updateAnimal: (e) => {
                            addChildAsParent(e)
                        }
                    })
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            color: '#464646',
                            paddingEnd: moderateScale(5),
                            flex: 7,
                        }}>Add Children
                    </AutoSizeText>
                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(10), width: verticalScale(10) }} />
                </CustomButton>

            </View>
        </ScrollView>
    );

    function getFamily() {
        let family = {};
        let parent1 = { id: father ? father?.id : null, name: father ? father?.name : '' }
        let parent2 = { id: mother ? mother?.id : null, name: mother ? mother?.name : '' }
        family.parent1 = parent1;
        family.parent2 = parent2;
        return family;
    }

    function addAnimalasParent(e, isFather) {
        let values = {};
        values.id = animalData._id
        values.animalId = e._id;
        values.type = isFather ? 'parent1' : 'parent2';
        values.name = e.data.name
        dispatch(addParent(values)).then((response) => {
            if (isFather) {
                setFather({ id: e._id, name: e.data.name })
            }
            else {
                setMother({ id: e._id, name: e.data.name })
            }
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }

    function addChildAsParent(e) {
        let values = {};
        values.id = animalData._id
        values.animalId = e._id;
        values.type = 'children';
        values.name = e.data.name
        dispatch(addParent(values)).then((response) => {

            let tmp = children;
            tmp.push(e)
            setChildren([...tmp]);

            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }

    function deleteAnimalasParent(e, isFather) {
        dispatch(deleteParent(animalData._id, isFather ? 'parent1' : 'parent2')).then((response) => {
            isFather ? setFather({}) : setMother({})
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }

    function deleteChildAsParent(e, index) {
        dispatch(deleteChild(animalData._id, e._id)).then((response) => {
            let tmp = children;
            tmp.splice(index, 1)
            setChildren([...tmp]);
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
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

export default FamilyTreePetView;