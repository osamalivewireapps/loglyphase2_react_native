/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import ProductDetailView from './productdetailview';
import { getProductsDetails, deleteProducts } from '../../../actions/ProductModule'
import { connect } from 'react-redux';
import DataHandler from '../../../utils/DataHandler';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        DataHandler.getUserObject().then(value => {
            this.userObject = JSON.parse(value)
        })
        this.props.getProductsDetails(this.props.route.params.id)
    }

    render() {
        return (<ProductDetailView {...this.props}
            userObject={this.userObject}
            removeAnimal={() => this.confirmModal()}

        />);
    }

    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeItem() } },

            ],
            { cancelable: false }
        );

    }

    removeItem(){

        this.props.deleteProducts(this.props.route.params.id).then(response => {
            this.props.navigation.goBack()
            this.props.route.params.updateProduct();
        })
    }
}
const mapStateToProps = ({ product }) => {
    return {
        productData: product.productDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getProductsDetails: (data) => dispatch(getProductsDetails(data)),
    deleteProducts: (data) => dispatch(deleteProducts(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetail);