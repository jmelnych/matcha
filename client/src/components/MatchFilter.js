import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getUsersFiltered} from '../actions/searchActions'
import Sort from './Search/Sort'

class MatchFilter extends Component {
    state = {
        filters : {
            order: {'rating': 'desc'}
        }
    };

    componentDidMount() {
        let filteredValues = this.state.filters;
        //TODO: perfect match
        this.props.getUsersFiltered(filteredValues);
    };

    filterUsers = () => {
        let filteredValues = this.state.filters;
        //TODO: perfect match
        this.props.getUsersFiltered(filteredValues);
    };

    onChangeSort = (e) => {
        let sortBy = e.target.value;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                order: {[sortBy]: 'desc'}
            },
        }), () => this.filterUsers());
    };

    render() {
        return (
            <div className="container-nav-match">
                <h3>Sort results</h3>
                <Sort handleSort={this.onChangeSort}/>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getUsersFiltered: (filters) => dispatch(getUsersFiltered(filters))
    }

};

MatchFilter.propTypes = {
    getUsersFiltered: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(MatchFilter);
