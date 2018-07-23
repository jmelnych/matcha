import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Slider, Switch, InputNumber, Col, Row } from 'antd'
import {connect} from 'react-redux'
import { getUsersFiltered} from '../../actions/searchActions'
import FilterSelectTags from './FilterSelectTags'
import Sort from './Sort'

class Filter extends Component {
    state = {
        locationSliderDisabled: true,
        filters : {
            gender: 'both',
            rating: [0, 42],
            tags: [],
            age: [17, 80],
            radius: 100,
            order: {'rating': 'asc'}
        },
        inputVisible: false
    };

    componentDidMount() {
        let filteredValues = this.state.filters;
        this.props.getUsersFiltered(filteredValues);
    };

    filterUsers = () => {
        console.log(this.state);
        let filteredValues = this.state.filters;
        //console.log(filteredValues);
        this.props.getUsersFiltered(filteredValues);
    };

    onChangeGender = (gender) => {
        let chosenGender = gender.target.value;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                gender: chosenGender
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

    onChangeLocation = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                radius: value
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
    };

    onChangeSort = (e) => {
        let sortBy = e.target.value;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                order: {[sortBy]: 'asc'}
            },
        }), () => this.filterUsers());
    };

    handleDisabledChange = (value) => {
        this.setState({ locationSliderDisabled: value });
    };

    formatterLocation = (value) => `${value}km`;


    formatterAge = (value) => `${value} years old`;

render() {
    const RadioGroup = Radio.Group;
    return (
        <div className="container-nav">
            <h3>Sort results</h3>
            <Sort handleSort={this.onChangeSort}/>
            <h3>Filter results</h3>
            <div className="filter-block">
                <span className="filter-title">Gender</span>
                <RadioGroup onChange={this.onChangeGender}
                            value={this.state.filters.gender}>
                    <Radio value={'both'}>Men and Women</Radio>
                    <Radio value={'male'}>Men</Radio>
                    <Radio value={'female'}>Women</Radio>
                </RadioGroup>
            </div>
            <div className="filter-block">
                <span className="filter-title">Rating</span>
                <Slider range step={1} defaultValue={[0, 42]}
                        min={0} max={42}
                        onAfterChange={this.onChangeRating}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Interests</span>
                <FilterSelectTags handleTags={this.onChangeTags}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Age</span>
                <Slider range step={1} defaultValue={[17, 80]}
                        min={17} max={80}
                        tipFormatter={this.formatterAge}
                        onAfterChange={this.onChangeAge}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Location, km</span>
                <Row>
                    <Col span={17}>
                        <Slider value={this.state.filters.radius}
                                tipFormatter={this.formatterLocation}
                                min={0} max={800} disabled={this.state.locationSliderDisabled}
                                onChange={this.onChangeLocation}/>
                        Disabled: <Switch size="small" checked={this.state.locationSliderDisabled}
                                          onChange={this.handleDisabledChange} />
                    </Col>
                    <Col span={2}>
                        <InputNumber
                            min={0}
                            max={800}
                            style={{ marginLeft: 16 }}
                            value={this.state.filters.radius}
                            disabled={this.state.locationSliderDisabled}
                            onChange={this.onChangeLocation}
                        />
                    </Col>
                </Row>

            </div>
        </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
    return {
        getUsersFiltered: (filters) => dispatch(getUsersFiltered(filters))
    }

};

Filter.propTypes = {
    getUsersFiltered: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Filter);
