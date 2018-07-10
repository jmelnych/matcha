import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Slider, Tag, Input, Tooltip, Icon, Switch } from 'antd'
import {connect} from 'react-redux'
import {getUsers, getUsersFiltered} from '../actions/searchActions'

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
        //TODO: request if no gender selected?
        let filteredValues = this.state.filters;
        if (this.state.ageSliderDisabled) {
            delete filteredValues['age'];
        }
        if (filteredValues.gender.length === 2) {
            filteredValues.gender = ['both'];
        }
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

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.filters.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                tags
            }
        }), () => this.filterUsers());
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    handleClose = (removedTag) => {
        const tags = this.state.filters.tags.filter(tag => tag !== removedTag);
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                tags
            }
        }), () => this.filterUsers());
    }

    saveInputRef = input => this.input = input;

    handleDisabledChange = (value) => {
        this.setState({ ageSliderDisabled: value });
    }

render() {

    const CheckboxGroup = Checkbox.Group;
    const { inputVisible, inputValue } = this.state;
    const { tags } = this.state.filters;
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
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag color="#2db7f5"
                             key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" /> New Tag
                    </Tag>
                )}
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