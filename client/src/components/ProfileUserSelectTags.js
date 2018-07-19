import React, { Component } from 'react'
import { Select } from 'antd'
import {getTags} from '../actions/tagsActions'
import {saveUserTag, getUserTags, deleteUserTag} from '../actions/userActions'
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class ProfileUserSelectTags extends Component {
    componentDidMount(){
        this.props.getUserTags();
        this.props.getTags();
    };

    handleChange = (tags) => {
        let userTags = this.props.user_tags.map(tag => tag.tag);
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {
                return a.indexOf(i) < 0;})[0];
        };
        if (userTags.length < tags.length) {
            this.props.saveUserTag(tags[tags.length - 1]);
        } else if (userTags.length > tags.length) {
            let deletedTag = userTags.diff(tags);
            this.props.deleteUserTag(deletedTag);
        }
    };

render() {
    let userTags = this.props.user_tags || [];
    userTags = userTags.map(tag => tag.tag);
    let tags = this.props.tags || [];
    const children = [];
    tags.map((tag) => {
        children.push(<Select.Option key={tag}>{tag}</Select.Option>);
    });

    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            //showAction={["onChange"]}
            value={userTags}
            placeholder="Select your interests"
            onChange={this.handleChange}
        >
            {children}
        </Select>
    );
  }
};

function mapStateToProps({tags, user}) {
    return {
        user_tags: user.user_tags,
        tags: tags.map((tag) => tag.tag)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTags: () => dispatch(getTags()),
        saveUserTag: (tagname) => dispatch(saveUserTag(tagname)),
        deleteUserTag: (tagname) => dispatch(deleteUserTag(tagname)),
        getUserTags: () => dispatch(getUserTags())
    }

};

ProfileUserSelectTags.propTypes = {
    getTags: PropTypes.func.isRequired,
    saveUserTag: PropTypes.func.isRequired,
    deleteUserTag: PropTypes.func.isRequired,
    getUserTags: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserSelectTags);
