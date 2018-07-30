import React, { Component } from 'react'
import { Radio } from 'antd'
import PropTypes from 'prop-types'


class Sort extends Component {
render() {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
        <div className="sort-container">
            <span className="search-sort-title">Sort by </span>
            <RadioGroup onChange={this.props.handleSort} defaultValue="rating">
                <RadioButton value="rating">Rating</RadioButton>
                <RadioButton value="age">Age</RadioButton>
                <RadioButton value="radius">Distance</RadioButton>
            </RadioGroup>
        </div>
    );
  }
}

Sort.propTypes = {
    handleSort: PropTypes.func.isRequired
};

export default Sort;