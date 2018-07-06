import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Slider } from 'antd'
import {connect} from 'react-redux'
import {getUsers, getUsersFiltered} from '../actions/searchActions'

const plainOptions = ['Men', 'Women'];

class Filter extends Component {
    state = {
        gender: ['Men', 'Women'],
        rating: [0, 42],
        age: [17, 100]
    };

    filterUsers = () => {
        //TODO: request in no gender selected?
        console.log(this.state);
        this.props.getUsersFiltered(this.state);
    }
    onChangeGender = (gender) => {
        console.log(gender);
        this.setState({
            gender
        }, () => this.filterUsers());

    };

    onChangeRating = (value) => {
        this.setState({
            rating: value
        }, () => this.filterUsers());
    };

    onChangeAge = (value) => {
        this.setState({
            age: value
        }, () => this.filterUsers());
    };



render() {
    // console.log(this.state);
    const CheckboxGroup = Checkbox.Group;
    return (
        <div className="container-nav">
            <h3>Filter results</h3>
            <div className="filter-block">
                <span className="filter-title">Gender</span>
                <CheckboxGroup options={plainOptions} value={this.state.gender} onChange={this.onChangeGender} />
            </div>
            <div className="filter-block">
                <span className="filter-title">Rating</span>
                <Slider range step={1} defaultValue={[0, 42]}
                        min={0} max={42}
                        onChange={this.onChangeRating}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Age</span>
                <Slider range step={1} defaultValue={[17, 100]}
                        min={17} max={100}
                        onChange={this.onChangeAge}/>
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