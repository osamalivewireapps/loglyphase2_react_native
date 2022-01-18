/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectServiceView } from './selectservices';

class SelectServices extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }




    render() {
        return (<SelectServiceView {...this.props}
        />);
    }

}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectServices);
