import React, { Component } from 'react'
import { Select } from 'antd'
import {getTags} from "../../actions/tagsActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Option = Select.Option;

class SearchFilterSelectTags extends Component {
    componentDidMount(){
        this.props.getTags();
    };

    handleChange = (tags) => {
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        this.props.handleTags(tags);
    };

    render() {
        let tags = this.props.tags || [];
        const children = [];
        if (tags) {
            tags.map((tag) => {
                children.push(<Option key={tag}>{tag}</Option>);
            });
        }
        return (
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                // showAction={["onChange"]}
                placeholder="Filter by interests"
                onChange={this.handleChange}
            >
                {children}
            </Select>
        );
    }
};

function mapStateToProps({tags}) {
    return {
        tags: tags.map((tag) => tag.tag)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTags: () => dispatch(getTags())
    }

};

SearchFilterSelectTags.propTypes = {
    getTags: PropTypes.func.isRequired,
    tags: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterSelectTags);
