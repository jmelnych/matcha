import React, { Component } from 'react'
import { Select } from 'antd'
import {deleteUserTag, getTags, saveUserTag} from "../actions/tagsActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Option = Select.Option;

class ProfileUserSelectTags extends Component {
    state = {
        tags: []
    }
    componentDidMount(){
        this.props.getTags();
    };

    handleChange = (tags) => {
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        if (this.state.tags.length < tags.length) {
            this.props.saveUserTag(tags[tags.length - 1]);
        } else if (this.state.tags.length > tags.length) {
            let deletedTag = this.state.tags.diff(tags);
            this.props.deleteUserTag(deletedTag);
        }
        this.setState({
            tags
        })
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
            showAction={["onChange"]}
            placeholder="Select your interests"
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
        getTags: () => dispatch(getTags()),
        saveUserTag: (tagname) => dispatch(saveUserTag(tagname)),
        deleteUserTag: (tagname) => dispatch(deleteUserTag(tagname))
    }

};

ProfileUserSelectTags.propTypes = {
    getTags: PropTypes.func.isRequired,
    saveUserTag: PropTypes.func.isRequired,
    deleteUserTag: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserSelectTags);
