import React, { Component } from 'react'
import {likeUser, unlikeUser, breakUpWithUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import {Button, Popover, Popconfirm} from 'antd'
import PropTypes from 'prop-types'

class LikeButtonStatus extends Component {
    state = {
        buttonClass: 'no-likes-button',
        popOverText: 'Like the profile? Like the user!',
        brokenHeart: false,
        iDidBan: false,
        imBanned: false,
        popConfirmText: 'Are you sure you like the user? (We will notify the user about it).'
    };

    componentWillReceiveProps(props) {
        const relatStatus = props.history;
        let buttonClass, popOverText;
        if (relatStatus.includes('I like')) {
            buttonClass = 'i-liked-button';
            popOverText = 'You already liked this user. If the user likes you in return, you become a match. ' +
                'Wait for the response on remove your like.';
            this.setState ({
                buttonClass,
                popOverText,
                brokenHeart: false,
                popConfirmText: 'Are you sure you want to dislike the user?'
            })
        }
        else if (relatStatus.includes('like Me')) {
            buttonClass = 'me-liked-button';
            popOverText = 'The user liked you. If you like the user, you can like in return and then you ' +
                'will become a match!';
            this.setState ({
                buttonClass,
                popOverText,
                brokenHeart: false,
                popConfirmText: 'Are you sure you want to become a match with the user?'
            })
        }
        else if (relatStatus.includes('match')) {
            buttonClass = 'match-button';
            popOverText = 'You are a match! You can write direct messages to each other!';
            this.setState ({
                buttonClass,
                popOverText,
                brokenHeart: false,
                popConfirmText: 'Are you sure you want to break up with the user? This is irreversible!'
            })
        }
        else if (relatStatus.includes('broken')) {
            buttonClass = 'broken-button';
            popOverText = 'Woo, you have broken up with the user. If you change your mind, ' +
                'you can like the user again.';
            this.setState ({
                buttonClass,
                popOverText,
                brokenHeart: true,
                popConfirmText: 'Are you sure you like the user AGAIN? (We will notify the user about it).'
            })
        }
        // if (relatStatus.includes('I ban')) {
        //     this.setState({
        //         iDidBan: true,
        //         buttonClass: 'i-ban-button',
        //         popOverText: 'You have banned this user. The user has limited permission ' +
        //         'to your page. You cannot like the user unless you unban.'
        //     })
        // }
    };

    like = () => {
        const {id} = this.props.info;
        this.props.likeUser(id);
        //change heart color/text based on history

    };

    cancel = () => {
        console.log('cancel');
    };

    checkIcon = () => {
        if (this.state.iDidBan) {
            return 'exclamation-circle-o';
        }
        if (this.state.brokenHeart) {
            return '';
        }
        return 'heart';
    };
render() {
    return (
        <Popover className="pop-relationship" placement="top" title="Your relationship status"
                 content={this.state.popOverText}
                 trigger="hover">
            <Popconfirm title={this.state.popConfirmText} placement="bottom"
                        onConfirm={this.like} onCancel={this.cancel} okText="Yes" cancelText="No">
        <Button className={`like-button ${this.state.buttonClass}`}
                onClick={this.like} icon={this.checkIcon()}/></Popconfirm>
        </Popover>
    );
  }
}
function mapStateToProps({otherUser}){
    return otherUser.user;
};

function mapDispatchToProps(dispatch) {
    return {
        likeUser: (id) => dispatch(likeUser(id)),
        unlikeUser: (id) => dispatch(unlikeUser(id)),
        breakUpWithUser: (id) => dispatch(breakUpWithUser(id))
    }
};

LikeButtonStatus.propTypes = {
    otherUser: PropTypes.object,
    likeUser: PropTypes.func.isRequired,
    unlikeUser: PropTypes.func.isRequired,
    breakUpWithUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButtonStatus);