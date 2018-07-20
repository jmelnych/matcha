import React, { Component } from 'react'
import { Radio } from 'antd'


class Sort extends Component {

    onChange = (e) => {
        console.log('radio checked', e.target.value);

    };
render() {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
        <div>
            <span className="search-sort-title">Sort by: </span>
            <RadioGroup onChange={this.onChange} defaultValue="rating">
                <RadioButton value="rating">Rating</RadioButton>
                <RadioButton value="age">Age</RadioButton>
                <RadioButton value="distance">Distance</RadioButton>
            </RadioGroup>
        </div>
    );
  }
}
export default Sort;