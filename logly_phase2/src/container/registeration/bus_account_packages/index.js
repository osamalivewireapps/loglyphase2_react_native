/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Platform, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import BusAccountPackagesView from './bus_account_packages_view';
import { getPackagesByType, registerPackage } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';
import DataHandler from '../../../utils/DataHandler';
import Util from '../../../utils';
import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class BusAccountPackagesController extends Component {

    productIds = Platform.select({
        ios: [
            'com.livewireapps.Logly.BPL',
            'com.livewireapps.Logly.BQLY'
        ],
        android: [
            "business_professional_monthly", "bus_quarterly"
        ],
    });

    constructor(props) {
        super(props);

        console.log('props bundle packges----->',props)
        this.state = {
            subPackages: [],
            packageType: [],
            accountPackage: {
                outerIndex: -1,
                innerId: -1
            }
        }
    }

    async componentDidMount() {

       this.subsInitialization();

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
        this.props.navigation.goBack();
        //this.props.navigation.pop();
    }

    confirmBtnPress(e) {
        if (this.props.route.params.showBack) {
            this.props.navigation.pop();
        } else if (this.state.accountPackage.outerIndex >= 0 && this.state.accountPackage.innerId >= 0) {

            if (this.state.subPackages[this.state.accountPackage.outerIndex].toLowerCase().includes('monthly')){
                this.requestSubscription(this.productIds[0])
            }else{
                this.requestSubscription(this.productIds[1])
            }
            // this.userObject = {
            //     ...this.userObject,
            //     "packageId": this.state.packageType[this.state.accountPackage.outerIndex][this.state.accountPackage.innerId]._id,
            //     "type": this.state.subPackages[this.state.accountPackage.outerIndex],

            // }
            // this.props.registerPackage(this.userObject).then(() => {
            //     this.props.navigation.navigate('ThanksRegistration');
            // });

        } else {
            Util.topAlert("Please select packages")
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
                isShowBack={this.props.route.params.showBack ? true : false}
                accountPackage={this.state.accountPackage}
                selectAccountPackage={(e) => this.setPackageAccount(e)}
                packagesType={this.state.subPackages}
                packagesAmount={this.state.packageType}
                showBack={this.props.route.params.showBack}
                btnConfirmPress={() => this.confirmBtnPress()}
                props backScreen={(e) => { this.goingBack(e) }}
                packageId={this.props.route.params.packageId} />
        );
    }

    componentWillUnmount(){
        if (purchaseUpdateSubscription) {
            purchaseUpdateSubscription.remove();
            purchaseUpdateSubscription = null;
        }

        if (purchaseErrorSubscription) {
            purchaseErrorSubscription.remove();
            purchaseErrorSubscription = null;
        }

        //RNIap.endConnection();
    }


    ////////////////////////  IN-APP SUBS //////////////////////
   async subsInitialization() {
        try {
            await RNIap.initConnection();
            this.listProducts();
            if (Platform.OS === 'android') {
                await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
            } else {
                await RNIap.clearTransactionIOS();
            }
        } catch (err) {
            console.warn(err.code, err.message);
        }

        purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                console.info('purchase--->', purchase);

                this.userObject = {
                    ...this.userObject,
                    "packageId": this.state.packageType[this.state.accountPackage.outerIndex][this.state.accountPackage.innerId]._id,
                    "type": this.state.subPackages[this.state.accountPackage.outerIndex],
                    productId: purchase.productId,
                    transactionId: purchase.transactionId,
                    transactionDate: purchase.transactionDate,
                    transactionReceipt: purchase.transactionReceipt

                }
                this.props.registerPackage(this.userObject).then(() => {
                    this.props.navigation.navigate('ThanksRegistration');
                });
                // const receipt = purchase.transactionReceipt
                //     ? purchase.transactionReceipt
                //     : purchase.originalJson;
                // console.info(receipt);
                // if (receipt) {
                //     try {
                //         const ackResult = await finishTransaction(purchase);
                //         console.info('ackResult', ackResult);
                //     } catch (ackErr) {
                //         console.warn('ackErr', ackErr);
                //     }

                //     console.log('receipt--->',receipt)
                //     //this.setState({ receipt }, () => this.goNext());
                // }
            },
        );

        purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
                console.log('purchaseErrorListener', error);
                Alert.alert('purchase error', JSON.stringify(error));
            },
        );
    }
    async listProducts() {

        try {
            let products = []
            if (Platform.OS === "ios") {
                products = await RNIap.getSubscriptions(this.productIds);
                console.log('product mera----->', this.products)

            }
            else {
                console.log('android ids----->', this.productIds[0])
                products = await RNIap.getSubscriptions(this.productIds);
                console.log('android subs123----->', products)
            }
        } catch (err) {
            console.log(err.code, err.message)
        }
    }
    requestSubscription = async (sku) => {
        console.log('sku---->',sku);
        try {
            RNIap.requestSubscription(sku);
        } catch (err) {
            Alert.alert(err.message);
        }
    };
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
