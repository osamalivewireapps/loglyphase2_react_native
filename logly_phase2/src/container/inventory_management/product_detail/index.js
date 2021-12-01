/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import ProductDetailView from './productdetailview';
import { getProductsDetails } from '../../../actions/ProductModule'
import { connect } from 'react-redux';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("id----->", this.props.route.params.id);
        this.props.getProductsDetails(this.props.route.params.id)
    }

    render() {
        return (<ProductDetailView {...this.props}

        />);
    }
}
const mapStateToProps = ({ product }) => {
    return {
        productData: product.productDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getProductsDetails: (data) => dispatch(getProductsDetails(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetail);