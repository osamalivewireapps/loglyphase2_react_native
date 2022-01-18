/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import ProductRegView from './product_regview';
import { getFormCategory } from '../../../actions/AnimalModule';
import { addProducts, editProducts, UploadProductImages, getProductsDetails } from '../../../actions/ProductModule'
import utils from '../../../utils';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';

class RegisterProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            productCategories: [],
            subCategory: [],
            fileUri: '',
            listFileUri: [],
            isAddPhotos: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoad: true });
        getFormCategory('type=product').then((response) => {
            this.setState({ productCategories: response.formCategory, isLoad: false });
        }).catch(() => this.setState({ isLoad: false }));

        if (this.props.route.params?.productData?.gallery.length > 0) {
            let tmp = this.props.route.params?.productData?.gallery.map((value) => {
                return value.filename;
            });
            this.setState({ listFileUri: tmp, fileUri: this.props.route.params?.productData.image });
        }
    }

    getSubProduct(catId) {
        console.log('catId-->', catId);

        let productIndex = this.state.productCategories.findIndex((value) => {
            return catId === value.categoryId._id;
        });

        this.setState({
            subCategory: this.state.productCategories[productIndex].categoryId.subCategories,
        });
    }



    render() {


        return (<ProductRegView {...this.props}
            isLoad={this.state.isLoad}
            productCategories={this.state.productCategories}
            subCategory={this.state.subCategory}
            getSubProduct={(e) => this.getSubProduct(e)}
            capturePic={(e) => { this.getPic(e, false); }}
            capturePicCollections={(e) => { this.getPic(e, true); }}
            imgUri={this.state.fileUri}
            addProduct={(e) => { this.addProduct(e); }}
            listPhotoCollections={this.state.listFileUri}
            deletePic={(e) => { this.deletePic(e) }}
        />);
    }

    deletePic(e) {
        let tmp = this.state.listFileUri;
        tmp.splice(e, 1);
        this.setState({ listFileUri: tmp })
    }
    addProduct(e) {
        if (this.validateFields(e)) {
            this.processProduct(e);
        }

    }

    validateFields(e) {

        const { unit_quantity,bulkquantity, name, notes, price, quantity, servicedate, subCategory } = e;

        console.log("subcatorgory--->", subCategory);

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

        else if (!utils.isGraterThanZero(bulkquantity)) {

            utils.topAlertError('unit quantity is required');
            this.setState({});
            return false;
        }

        else if (!utils.isGraterThanZero(price)) {

            utils.topAlertError('price is required');
            this.setState({});
            return false;
        }
        else if (!utils.isLengthGreater(subCategory)) {

            utils.topAlertError('subCategory is required');
            this.setState({});
            return false;
        }
        else if (!utils.isLengthGreater(notes)) {

            utils.topAlertError('Note is required');
            this.setState({});
            return false;
        }


        return true;
    }


    processProduct(e) {
        console.log('values--->', e);

        let formdata = new FormData();
        formdata.append('categoryId', e.categoryId);

        let productIndex = this.state.productCategories.find((value) => {
            return e.categoryId === value.categoryId._id;
        });
        let categoryName = productIndex.categoryId.name;

        console.log(categoryName)

        formdata.append('categoryName', categoryName);
        formdata.append('data', JSON.stringify(e));
        if (this.state.fileUri) {
            formdata.append('file', {
                uri: this.state.fileUri,//Platform.OS === 'android' ? imageSelect.uri.uri : 'file://' + imageSelect.uri.uri,
                name: 'profile' + '.jpg', type: 'image/jpg',
            });
        }

        if (this.props.route.params?.productData) {

            this.props.editProducts(this.props.route.params?.productData._id, formdata).then((response) => {

                this.uploadImages(response.data._id)

            });
        } else {
            this.props.addProducts(formdata).then((response) => {

                this.uploadImages(response.data._id);

            });
        }
    }

    uploadImages(id) {


        if (this.state.listFileUri.length === 0) {
            if (this.props.route.params?.productData)
                this.props.getProductsDetails(id);

            this.props.route.params?.updateProduct();
            this.props.navigation.pop();
            return
        }
        let formdata2 = new FormData();
        formdata2.append("id", id);
        this.state.listFileUri.forEach((file, inn) => {
            if (!file.includes('http')) {
                formdata2.append('file', {
                    uri: file,
                    name: 'productImage' + inn + ".jpg", type: 'image/jpg'
                });
            }
        })

        this.props.UploadProductImages(formdata2).then((response) => {
            if (this.props.route.params?.productData)
                this.props.getProductsDetails(id);

            this.props.route.params?.updateProduct();
            this.props.navigation.pop();
        })


    }


    //////////////////////////  CAMERA && GALLERY //////////////////
    options = {
        title: 'Select Image',
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
            launchCamera(this.options, (response) => {
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

const mapStateToProps = ({ product }) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    addProducts: (data) => dispatch(addProducts(data)),
    editProducts: (id, data) => dispatch(editProducts(id, data)),
    UploadProductImages: (data) => dispatch(UploadProductImages(data)),
    getProductsDetails: (data) => dispatch(getProductsDetails(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterProduct);
