/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectDateServiceView  from './selectdate_view';

class SelectDateServices extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }




    render() {
        return (
        <SelectDateServiceView {...this.props}
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
)(SelectDateServices);
