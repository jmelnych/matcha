import React, { Component } from 'react'
import { Select } from 'antd'
import { getTags } from '../actions/tagsActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ProfileUserAddTag from './ProfileUserAddTag'

const Option = Select.Option;

class ProfileUserInterests extends Component {
    componentDidMount(){
        this.props.getTags();
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);
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
        <div className="profile-main-info-list">
            <h3>Personal Interests</h3>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select your interests"
                onChange={this.handleChange}
                >
                {children}
            </Select>
            <ProfileUserAddTag/>
        </div>
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

ProfileUserInterests.propTypes = {
    getTags: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInterests);