/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import BusAccountPackagesView from './bus_account_packages_view';
import { getSubscriptionRequest } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';

class BusAccountPackagesController extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.packageId = this.props.route.params.packageId;

        this.props.getSubscriptionRequest().then(() => {

        })
    }

    subPackages = [
        'Monthly',
        'Yearly',
        'Lifetime',
    ];

    packageType = [
        {
            package: [
                {
                    color: '#FFEBEB',
                    title: 'Pet Owner / Pet Lover',
                    price: '$ 0/ month',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#FEFADC',
                    title: 'Business Professional Sm/Mid',
                    price: '$ 75/ month',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#9EFF87',
                    title: 'Business Professional Large',
                    price: '$ 150/ month',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
            ],
        },
        {
            package: [
                {
                    color: '#FFEBEB',
                    title: 'Pet Owner / Pet Lover',
                    price: '$ 0/ year',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#FEFADC',
                    title: 'Business Professional Sm/Mid',
                    price: '$ 600/ year',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#9EFF87',
                    title: 'Business Professional Large',
                    price: '$ 1200/ year',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
            ],
        },
        {
            package: [
                {
                    color: '#FFEBEB',
                    title: 'Pet Owner / Pet Lover',
                    price: '$ 0/ lifetime',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#FEFADC',
                    title: 'Business Professional Sm/Mid',
                    price: '$ 1200/ lifetime',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
                {
                    color: '#9EFF87',
                    title: 'Business Professional Large',
                    price: '$ 500/ lifetime',
                    desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
                },
            ],
        }
    ]

    goingBack(e) {
        this.props.navigation.pop();
    }

    confirmBtnPress(e) {
        if (this.props.route.params.showBack) {
            this.props.navigation.pop();
        } else
            this.props.navigation.navigate('ThanksRegistration');

    }

    render() {
        return (
            <BusAccountPackagesView
                packagesType={this.subPackages}
                packagesAmount={this.packageType}
                showBack={this.props.route.params.showBack}
                btnConfirmPress={() => this.confirmBtnPress()}
                props backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        subsData: user.subsData
    }
};

const mapDispatchToProps = dispatch => ({
    getSubscriptionRequest: () => dispatch(getSubscriptionRequest()),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusAccountPackagesController);
