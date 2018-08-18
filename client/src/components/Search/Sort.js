import React, { Component } from 'react'
import {Select} from 'antd'
import PropTypes from 'prop-types'


class Sort extends Component {
render() {
    return (
        <div className="sort-container">
            <span className="search-sort-title">Sort by </span>
            <Select onChange={this.props.handleSortType} defaultValue="rating">
                <Select.Option value="rating">Rating</Select.Option>
                <Select.Option value="age">Age</Select.Option>
                <Select.Option value="radius">Distance</Select.Option>
            </Select>
            <Select onChange={this.props.handleSortDirection} defaultValue="asc">
                <Select.Option value="asc">↑</Select.Option>
                <Select.Option value="desc">↓</Select.Option>
            </Select>
        </div>
    );
  }
}

Sort.propTypes = {
    handleSortType: PropTypes.func.isRequired,
    handleSortDirection: PropTypes.func.isRequired
};

export default Sort;
