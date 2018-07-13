import React, { Component } from 'react'
import { Select, Button } from 'antd'
import { getTags, saveUserTags } from '../actions/tagsActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ProfileUserAddTag from './ProfileUserAddTag'

const Option = Select.Option;

class ProfileUserInterests extends Component {
    state = {
        tags: []
    }
    componentDidMount(){
        this.props.getTags();
    };

    handleChange = (tags) => {
        this.setState({tags})
    };

    handleSave = () => {
        console.log(this.state.tags);
        this.props.saveUserTags(this.state.tags);

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
            <Button onClick={this.handleSave}>Save</Button>
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
        getTags: () => dispatch(getTags()),
        saveUserTags: (tagname) => dispatch(saveUserTags(tagname))
    }

};

ProfileUserInterests.propTypes = {
    getTags: PropTypes.func.isRequired,
    saveUserTags: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInterests);