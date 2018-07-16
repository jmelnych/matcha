import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Slider, Switch } from 'antd'
import {connect} from 'react-redux'
import {getUsers, getUsersFiltered} from '../actions/searchActions'
import FilterSelectTags from './filterSelectTags'

const plainOptions = ['male', 'female'];

class Filter extends Component {
    state = {
        ageSliderDisabled: true,
        filters : {
            gender: ['male', 'female'],
            rating: [0, 42],
            tags: [],
            age: [17, 100]
        },
        inputVisible: false,
        inputValue: '',
    };

    filterUsers = () => {
        console.log(this.state);
        //TODO: request if no gender selected?
        let filteredValues = this.state.filters;
        if (this.state.ageSliderDisabled) {
            delete filteredValues['age'];
        }
        //if (filteredValues.gender.length === 2) {
        //    filteredValues.gender = ['both'];
        //}
        //console.log(filteredValues);
        this.props.getUsersFiltered(filteredValues);
    };

    onChangeGender = (gender) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                gender
            }
        }), () => this.filterUsers())
    };

    onChangeRating = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                    rating: value
            }
        }), () => this.filterUsers())
    };

    onChangeAge = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                age: value
            },
        }), () => this.filterUsers());
    };

    onChangeTags = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                tags: value
            },
        }), () => this.filterUsers());
    }

    handleDisabledChange = (value) => {
        this.setState({ ageSliderDisabled: value });
    }

render() {

    const CheckboxGroup = Checkbox.Group;

    return (
        <div className="container-nav">
            <h3>Filter results</h3>
            <div className="filter-block">
                <span className="filter-title">Gender</span>
                <CheckboxGroup options={plainOptions} value={this.state.filters.gender} onChange={this.onChangeGender} />
            </div>
            <div className="filter-block">
                <span className="filter-title">Rating</span>
                <Slider range step={1} defaultValue={[0, 42]}
                        min={0} max={42}
                        onChange={this.onChangeRating}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Interests</span>
                <FilterSelectTags handleTags={this.onChangeTags}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Age</span>
                <Slider range step={1} defaultValue={[17, 100]}
                        min={17} max={100} disabled={this.state.ageSliderDisabled}
                        onChange={this.onChangeAge}/>
                Disabled: <Switch size="small" checked={this.state.ageSliderDisabled}
                                  onChange={this.handleDisabledChange} />
            </div>
        </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers()),
        getUsersFiltered: (filters) => dispatch(getUsersFiltered(filters))
    }

};

Filter.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUsersFiltered: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Filter);
