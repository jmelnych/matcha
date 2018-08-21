import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Slider, Switch, InputNumber, Col, Row } from 'antd'
import {connect} from 'react-redux'
import {getUsersFiltered} from '../../actions/searchActions'
import SearchFilterSelectTags from './SearchFilterSelectTags'
import Sort from './Sort'

class SearchFilter extends Component {
    state = {
        locationSliderDisabled: true,
        filters : {
            gender: 'both',
            rating: [0, 42],
            tags: [],
            age: [17, 80],
            radius: null,
            order: {'rating': 'asc'}
        },
        inputVisible: false
    };

    componentDidMount() {
        let filteredValues = this.state.filters;
        this.props.getUsersFiltered(filteredValues);
    };

    filterUsers = () => {
        let filteredValues = this.state.filters;
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
        if (value > 1 && value < 801) {
            this.setState(prevState => ({
                filters: {
                    ...prevState.filters,
                    radius: value
                },
            }), () => this.filterUsers());
        }
    };

    onChangeTags = (value) => {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                tags: value
            },
        }), () => this.filterUsers());
    };

    onChangeSortType = (value) => {
        console.log('type', value);
        let sortBy = value;
        let direction = Object.keys(this.state.filters.order)[0],
            order = this.state.filters.order;
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                order: {[sortBy]: order[direction]}
            },
        }), () => this.filterUsers());
    };

    onChangeSortDirection = (value) => {
        console.log('dir', value);
        let sortBy = Object.keys(this.state.filters.order)[0];
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                order: {[sortBy]: value}
            },
        }), () => this.filterUsers());
    };

    handleDisabledChange = (value) => {
        this.setState({ locationSliderDisabled: value });
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                radius: value === false ? 100 : null
            },
        }), () => this.filterUsers());
    };

    formatterLocation = (value) => `${value}km`;
    formatterAge = (value) => `${value} years old`;

render() {
    const RadioGroup = Radio.Group;
    return (
        <div className="container-nav">
            <h3>Sort results</h3>
            <Sort handleSortType={this.onChangeSortType}
                  handleSortDirection={this.onChangeSortDirection}
            />
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
                <SearchFilterSelectTags handleTags={this.onChangeTags}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Age</span>
                <Slider range step={1} defaultValue={[17, 80]}
                        min={17} max={80}
                        tipFormatter={this.formatterAge}
                        onAfterChange={this.onChangeAge}/>
            </div>
            <div className="filter-block">
                <span className="filter-title">Location, km (max 800km)</span>
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
                            min={1}
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

SearchFilter.propTypes = {
    getUsersFiltered: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SearchFilter);
