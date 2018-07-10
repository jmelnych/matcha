import React, { Component } from 'react'
import { Select } from 'antd'
import { getTags } from '../actions/tagsActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Option = Select.Option;

class ProfileUserInterests extends Component {
    componentDidMount(){
        this.props.getTags();
    }
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
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                //onChange={handleChange}
                >
                {children}
            </Select>
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