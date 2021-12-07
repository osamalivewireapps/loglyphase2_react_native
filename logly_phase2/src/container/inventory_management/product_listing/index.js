/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import ProductListingView from './productview';
import { getProducts } from '../../../actions/ProductModule';
import { connect } from 'react-redux';

class ProductListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            filterData: {
                animalType: 'Active',
                productId: '',
                subProdId: ""
            }
        };
    }

    componentDidMount() {
        this.getProductList();

    }

    applyFilter(e) {
        this.filterProducts(e)
    }

    getProductList() {
        this.props.getProducts().then((response) => {
            //this.setState({ productList: response.payload });
            this.filterProducts(this.state.filterData);

        });
    }

    filterProducts(e) {

        console.log("props--->", e);

        let tmp = this.props.productListing
            .filter((value, index) => {
                if (e.animalType === 'Active' ? !value.isArchived:value.isArchived) {
                    return ((e.productId ? value.categoryId === e.productId : true) && (e.subProdId ? value.data.subCategory.includes(e.subProdId): true))
                }
            });

        this.setState({ productList: tmp, filterData: e })
    }



    render() {
        return (<ProductListingView {...this.props}
            listProduct={this.state.productList}
            applyFilter={(e) => this.applyFilter(e)}
            filterObj={this.state.filterData}
            updateProduct={() => this.updateProduct()}
        />);
    }

    updateProduct(){
        this.getProductList();
    }

}

const mapStateToProps = ({ product }) => {
    return {
        productListing: product.productListing,
    };
};

const mapDispatchToProps = dispatch => ({
    getProducts: () => dispatch(getProducts()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductListing);
