/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SearchView from './search_view';
import { globalSearch } from '../../actions/GlobalSearch'

class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            globalSearch: []
        }
    }

    searchData(e) {

        this.props.globalSearch(e).then((response) => {
            if (response) {
                this.setState({ globalSearch: response })
            }
        })
    }

    render() {
        return (<SearchView
            {...this.props}
            globalSearch={this.state.globalSearch}
            toggleDrawer={this.props.navigation}
            searchData={(e) => this.searchData(e)}
        />);
    }
}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    globalSearch: (keyword) => dispatch(globalSearch(keyword)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchItem);
