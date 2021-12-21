/* eslint-disable prettier/prettier */
import React from 'react';
import ProfileView from './view';

class ViewProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (<ProfileView {...this.props}/>);
    }

}

export default ViewProfile;