/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import BusAccountPackagesView from './bus_account_packages_view';
import { getPackagesByType, registerPackage } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';
import DataHandler from '../../../utils/DataHandler';

class BusAccountPackagesController extends Component {


    constructor(props) {
        super(props);
        this.state = {
            subPackages: [],
            packageType: [],
            accountPackage: {
                outerIndex: -1,
                innerId: -1
            }
        }
    }

    componentDidMount() {

        this.packageId = this.props.route.params.packageId;

        let tmpPackageType = [];
        let tmpPackTYpeBundles = [];

        this.props.getPackagesByType(this.packageId).then((data) => {
            console.log("value-->", data.payload.data)

            data.payload.data.map((value) => {
                if ("Monthly & Yearly" === value.packageType) {
                    tmpPackageType.push("Monthly")
                    tmpPackageType.push("Yearly")
                    tmpPackTYpeBundles.push(value.packages)
                    tmpPackTYpeBundles.push(value.packages)
                } else {
                    tmpPackageType.push("Lifetime")
                    tmpPackTYpeBundles.push(value.packages)
                }

            })

            console.log("value-->", tmpPackageType)

            this.setState({ subPackages: tmpPackageType, packageType: tmpPackTYpeBundles })

        })

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });
    }

    //subPackages = [
    // 'Monthly',
    // 'Yearly',
    // 'Lifetime',
    //];

    //packageType = [
    // {
    //     package: [
    //         {
    //             color: '#FFEBEB',
    //             title: 'Pet Owner / Pet Lover',
    //             price: '$ 0/ month',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#FEFADC',
    //             title: 'Business Professional Sm/Mid',
    //             price: '$ 75/ month',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#9EFF87',
    //             title: 'Business Professional Large',
    //             price: '$ 150/ month',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //     ],
    // },
    // {
    //     package: [
    //         {
    //             color: '#FFEBEB',
    //             title: 'Pet Owner / Pet Lover',
    //             price: '$ 0/ year',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#FEFADC',
    //             title: 'Business Professional Sm/Mid',
    //             price: '$ 600/ year',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#9EFF87',
    //             title: 'Business Professional Large',
    //             price: '$ 1200/ year',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //     ],
    // },
    // {
    //     package: [
    //         {
    //             color: '#FFEBEB',
    //             title: 'Pet Owner / Pet Lover',
    //             price: '$ 0/ lifetime',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#FEFADC',
    //             title: 'Business Professional Sm/Mid',
    //             price: '$ 1200/ lifetime',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //         {
    //             color: '#9EFF87',
    //             title: 'Business Professional Large',
    //             price: '$ 500/ lifetime',
    //             desc: 'Allowed Animals 5\nAllowed Products 0\nAllowed Employees 3\nAnimals Pet Lovers and Pet Owners are the Heart of LOGLY'
    //         },
    //     ],
    // }
    //]

    goingBack(e) {
        this.props.navigation.pop();
    }

    confirmBtnPress(e) {
        if (this.props.route.params.showBack) {
            this.props.navigation.pop();
        } else{
            this.userObject = {
                ...this.userObject,
                "packageId": this.state.packageType[this.state.accountPackage.outerIndex][this.state.accountPackage.innerId]._id,
                "type": this.state.subPackages[this.state.accountPackage.outerIndex],

            }
            this.props.registerPackage(this.userObject).then(() => {
                this.props.navigation.navigate('ThanksRegistration');
            });
            
        }

    }

    setPackageAccount(obj) {

        console.log("packages--->", this.state.packageType[obj.outerIndex][obj.innerId.name]);
       
        this.setState({
            accountPackage: {
                outerIndex: obj.outerIndex,
                innerId: obj.innerId
            }
        });
    }

    render() {

        console.log("amount--->", this.state.packageType)
        return (
            <BusAccountPackagesView
                isShowBack={this.props.route.params.showBack?true:false}
                accountPackage={this.state.accountPackage}
                selectAccountPackage={(e) => this.setPackageAccount(e)}
                packagesType={this.state.subPackages}
                packagesAmount={this.state.packageType}
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
    getPackagesByType: (data) => dispatch(getPackagesByType(data)),
    registerPackage: (data) => dispatch(registerPackage(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusAccountPackagesController);
