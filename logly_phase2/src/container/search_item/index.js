/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SearchView from './search_view';
import { globalSearch, getRecentResearch, addRecentResearch, deleteRecentResearch } from '../../actions/GlobalSearch'

class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            globalSearch: [],
            resentSearch: [],
            isLoading:false
        }
    }

    componentDidMount() {
        this.getRecentSearch();
    }

    getRecentSearch() {
        this.props.getRecentResearch().then((response) => {
            if (response) {
                this.setState({ resentSearch: response.payload })
            }
        })
    }

    addSearch(e) {
        this.props.addRecentResearch(e)
    }

    delSearch(e) {
        this.props.deleteRecentResearch(e).then(() => {
            this.getRecentSearch();
        })
    }

    searchData(e) {
        if (e.length === 0) {
            this.setState({ globalSearch: [], resentSearch: [],isLoading:false })
            return
        }
        this.setState({ isLoading:true })
        this.props.globalSearch(e).then((response) => {
            if (response) {
                this.setState({ globalSearch: response.payload, resentSearch: [], isLoading: false })
            }
        })
    }

    render() {
        return (<SearchView
            {...this.props}
            addSearch={(e) => this.addSearch(e)}
            resentSearch={this.state.resentSearch}
            globalSearch={this.state.globalSearch}
            toggleDrawer={this.props.navigation}
            searchData={(e) => this.searchData(e)}
            delSearch={(e) => this.delSearch(e)}
            isLoading={this.state.isLoading}
        />);
    }
}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    globalSearch: (keyword) => dispatch(globalSearch(keyword)),
    getRecentResearch: () => dispatch(getRecentResearch()),
    addRecentResearch: (data) => dispatch(addRecentResearch(data)),
    deleteRecentResearch: (id) => dispatch(deleteRecentResearch(id))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchItem);
