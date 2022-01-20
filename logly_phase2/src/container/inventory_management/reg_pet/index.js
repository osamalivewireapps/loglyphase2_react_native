/* eslint-disable semi */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import RegisterPetView from './regpet_view';
import { DeleteImage, getAnimalCategories, getFormCategory, editAnimal, addAnimal, getAnimal, UploadAnimalImages } from '../../../actions/AnimalModule';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import utils from '../../../utils';
import { debug } from 'react-native-reanimated';

class RegisterPet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            animalCategories: [],
            animalBreed: [],
            fileUri: '',
            listFileUri: [],
        }

        this.animalData = (props.route.params?.animalData) ? props.route.params.animalData : null;
    }

    componentDidMount() {
        this.setState({ isLoad: true });
        getAnimalCategories().then((response) => {
            console.log("animalCategories-->", response.animalCategory);
            this.setState({ animalCategories: response.animalCategory, isLoad: false })
        }).catch(() => this.setState({ isLoad: false }));

        if (this.animalData) {
            let tmp = this.animalData?.gallery.map((value) => {
                return value.filename;
            });
            this.setState({ listFileUri: tmp, fileUri: this.animalData.image });
        }
    }

    getBreed(catId) {
        console.log("catId-->", catId)
        this.setState({ isLoad: true });
        getFormCategory(catId).then((response) => {
            console.log("animalBreed-->", response.animalBreed)
            this.setState({ animalBreed: response.formCategory.categoryId.breeds, isLoad: false })
        }).catch(() => {
            this.setState({ isLoad: false })
        });
    }



    render() {
        return (<RegisterPetView {...this.props}
            isLoad={this.state.isLoad}
            animalCategories={this.state.animalCategories}
            animalBreed={this.state.animalBreed}
            getAnimalBreed={(e) => this.getBreed(e)}
            capturePic={(e) => { this.getPic(e, false); }}
            capturePicCollections={(e) => { this.getPic(e, true); }}
            imgUri={this.state.fileUri}
            addProduct={(e) => { this.createAnimal(e); }}
            listPhotoCollections={this.state.listFileUri}
            deletePic={(e) => { this.deletePic(e) }}
        />);
    }


    deletePic(e) {

        if (this.animalData)
            this.deleteHandler(e);
        else
            this.clearImageStack(e)
    }

    deleteHandler(e) {
        if (this.state.listFileUri[e].includes('http')) {
            let values = {};
            values.id = this.animalData._id
            values.animals = this.animalData.gallery[e]._id
            this.props.DeleteImage(values).then((response) => {
                if (this.props.route?.params?.animalData)
                    this.props.getAnimal(this.props.route?.params?.animalData._id).then((response) => {
                        this.animalData = response.payload
                    });

                this.props.route?.params?.updateAnimal();
                this.clearImageStack(e)
            })
        } else
            this.clearImageStack(e)
    }

    clearImageStack(e) {
        let tmp = this.state.listFileUri;
        tmp.splice(e, 1);
        this.setState({ listFileUri: tmp })
    }

    createAnimal(e) {
        if (this.validateFields(e)) {
            this.createAnimalProfile(e);
        }

    }

    validateFields(e) {
        //breed array//traits//"Spayed or Neutered"

        const { name, breed, quantity, price, DOB, Sex, Weight, Notes } = e;

        console.log("subcatorgory--->", breed);

        Keyboard.dismiss();

        if (!utils.isLengthGreater(name)) {

            utils.topAlertError('Name is required');
            this.setState({});

            return false;
        }

        else if (!utils.isGraterThanZero(quantity)) {

            utils.topAlertError('quantity is required');
            this.setState({});
            return false;
        }


        else if (!utils.isGraterThanZero(price)) {

            utils.topAlertError('price is required');
            this.setState({});
            return false;
        }
        else if (!breed.length > 0) {

            utils.topAlertError('Please select breed.');
            this.setState({});
            return false;
        }
        else if (!utils.isLengthGreater(Notes)) {

            utils.topAlertError('Note is required');
            this.setState({});
            return false;
        }


        return true;
    }


    createAnimalProfile(e) {
        console.log('values--->', e.family);

        let formdata = new FormData();
        formdata.append('categoryId', e.categoryId);

        debugger

        let productIndex = this.state.animalCategories.find((value) => {
            return e.categoryId === value.categoryId._id;
        });
        let categoryName = productIndex.categoryId.name;

        console.log(categoryName)


        formdata.append('categoryName', categoryName);
        formdata.append('data', JSON.stringify(e));

       
        if (!this.animalData)
            formdata.append('family', JSON.stringify(e.family))

        if (this.state.fileUri) {
            formdata.append('file', {
                uri: this.state.fileUri,//Platform.OS === 'android' ? imageSelect.uri.uri : 'file://' + imageSelect.uri.uri,
                name: 'profile' + '.jpg', type: 'image/jpg',
            });
        }

        if (this.animalData) {


            this.props.editAnimal(this.animalData._id, formdata).then((response) => {

                this.uploadImages(response.data._id)

            });
        } else {
            this.props.addAnimal(formdata).then((response) => {

                this.uploadImages(response.data._id);

            });
        }
    }

    uploadImages(id) {


        if (this.state.listFileUri.length === 0) {
            if (this.props.route?.params?.animalData)
                this.props.getAnimal(id);

            this.props.route?.params?.updateAnimal();
            this.props.navigation.pop();
            return
        }
        let formdata2 = new FormData();
        formdata2.append("id", id);
        this.state.listFileUri.forEach((file, inn) => {
            if (!file.includes('http')) {
                formdata2.append('file', {
                    uri: file,
                    name: 'animalImage' + inn + ".jpg", type: 'image/jpg'
                });
            }
        })

        this.props.UploadAnimalImages(formdata2).then((response) => {
            if (this.props.route?.params?.animalData)
                this.props.getAnimal(id);

            this.props.route?.params?.updateAnimal();
            this.props.navigation.pop();
        })
    }


    //////////////////////////  CAMERA && GALLERY //////////////////
    options = {
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
    getPic(txt, isAddCollection) {

        if (txt === 'camera') {
            launchCamera({ ...this.options, mediaType: 'photo' }, (response) => {
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

                    let tmp = this.state.listFileUri;
                    if (!isAddCollection)
                        this.setState({ fileUri: response.assets[0].uri });
                    else {
                        tmp.push(response.assets[0].uri)
                        this.setState({ listFileUri: tmp })
                    }
                }
            });
        }
        else {
            launchImageLibrary(this.options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.assets[0].uri, type: response.assets[0].type, fileName: response.assets[0].fileName };
                    //this.props.uploadPicRequest(source)
                    let tmp = this.state.listFileUri;
                    if (!isAddCollection)
                        this.setState({ fileUri: response.assets[0].uri });
                    else {
                        tmp.push(response.assets[0].uri)
                        this.setState({ listFileUri: tmp })
                    }
                }
            });
        }
    }

}

const mapStateToProps = ({ animal }) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    editAnimal: (id, data) => dispatch(editAnimal(id, data)),
    addAnimal: (data) => dispatch(addAnimal(data)),
    getAnimal: (data) => dispatch(getAnimal(data)),
    UploadAnimalImages: (data) => dispatch(UploadAnimalImages(data)),
    DeleteImage: (data) => dispatch(DeleteImage(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterPet);