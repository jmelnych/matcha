import React, { Component } from 'react'
import {connect} from 'react-redux'
import orderBy from 'lodash/orderBy'
import PropTypes from 'prop-types'

class OtherUserProfileFeedPosts extends Component {
render() {
    let posts = this.props.posts || [];
    posts = orderBy(posts, ['added'], ['desc']);
    return (
        <div>
            {posts.map((post) =>
                <div key={post.id} className="profile-feed-snippet">
                    <div className="feed-snippet-head">
                        <p>{post.added}</p>
                    </div>
                    <h2 className="feed-snippet-title">
                        {post.title}
                    </h2>
                    <p className="feed-snippet-text">
                        {post.post}
                    </p>
                </div>
            )}
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
}

OtherUserProfileFeedPosts.propTypes = {
    otherUser: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(OtherUserProfileFeedPosts);