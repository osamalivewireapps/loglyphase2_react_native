/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ProductRegView from './product_regview';
import { getFormCategory } from '../../../actions/AnimalModule';

class RegisterProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            productCategories: [],
            subCategory: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoad: true });
        getFormCategory('type=product').then((response) => {
            console.log('product_categories-->', response.formCategory);
            this.setState({ productCategories: response.formCategory, isLoad: false });
        }).catch(() => this.setState({ isLoad: false }));
    }

    getSubProduct(catId) {
        console.log('catId-->', catId);

        let productIndex = this.state.productCategories.findIndex((value) => {
            return catId === value.categoryId._id
        });

        this.setState({
            subCategory: this.state.productCategories[productIndex].categoryId.subCategories
        })
    }



    render() {
        return (<ProductRegView {...this.props}
            isLoad={this.state.isLoad}
            productCategories={this.state.productCategories}
            subCategory={this.state.subCategory}
            getSubProduct={(e) => this.getSubProduct(e)}

        />);
    }
}

const mapStateToProps = ({ product }) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterProduct);
