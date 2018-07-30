import React, { Component } from 'react'
import { Select } from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class OtherUserProfileInterests extends Component {
render() {
    let userTags = this.props.tags || [];
    userTags = userTags.map(tag => tag.tag);

    return (
        <div className="profile-main-info-list">
            <h3>Personal Interests</h3>
            {!!userTags.length &&
            (<Select
                className="tags-no-border"
                mode="multiple"
                style={{ width: '100%' }}
                value={userTags}
                disabled={true}
            >
            </Select>)}
            {userTags.length === 0 && (
                <div className="text-secondary info">No interests selected</div>
            )}
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
};

OtherUserProfileInterests.propTypes = {
    otherUser: PropTypes.object,
    userTags: PropTypes.array
}

export default connect(mapStateToProps)(OtherUserProfileInterests);