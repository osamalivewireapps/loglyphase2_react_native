/* eslint-disable prettier/prettier */
import React from 'react';
import { TERMS } from '../../constants';
import PolicyView from './policyview';

class PolicyController extends React.Component{

    constructor(props){
        super(props);
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render(){
        return(<PolicyView 
            backScreen={(e) => { this.goingBack(e) }}
            header = {this.props.route.params.header===TERMS ? "Terms of Use" : "Privacy Policy"} 
        props/>);
    }

}

export default PolicyController;