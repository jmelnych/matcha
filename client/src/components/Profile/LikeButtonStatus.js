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

    paintButton = (status) => {
        let buttonClass, popOverText, brokenHeart, popConfirmText;
        console.log(status);
        switch (status) {
            case 'i-like':
                buttonClass = 'i-liked-button';
                popOverText = 'You already liked this user. If the user likes you in return, you become a match. ' +
                    'Wait for the response on remove your like.';
                brokenHeart = false;
                popConfirmText = 'Are you sure you want to dislike the user?';
                break;
            case 'me-like':
                buttonClass = 'me-liked-button';
                popOverText = 'The user liked you. If you like the user, you can like in return and then you ' +
                    'will become a match!';
                brokenHeart = false;
                popConfirmText = 'Are you sure you want to become a match with the user?';
                break;
            case 'match':
                buttonClass = 'match-button';
                popOverText = 'You are a match! You can write direct messages to each other!';
                brokenHeart = false;
                popConfirmText = 'Are you sure you want to break up with the user? This is irreversible!';
                break;
            case 'broken':
                buttonClass = 'broken-button';
                popOverText = 'Woo, you have broken up with the user. If you change your mind, ' +
                    'you can like the user again.';
                brokenHeart = true;
                popConfirmText = 'Are you sure you like the user AGAIN? (We will notify the user about it).';
                break;
            default:
                buttonClass = 'no-likes-button';
                popOverText = 'Like the profile? Like the user!';
                brokenHeart = false;
                popConfirmText = 'Are you sure you like the user? (We will notify the user about it).';
        }
        this.setState ({
            buttonClass,
            popOverText,
            brokenHeart,
            popConfirmText
        })
    }

    componentWillReceiveProps(props) {
        const relatStatus = props.history;
        if (relatStatus.includes('I like')) {
            this.paintButton('i-like');
        } else if (relatStatus.includes('like Me')) {
            this.paintButton('me-like');
        } else if (relatStatus.includes('match')) {
            this.paintButton('match');
        } else if (relatStatus.includes('broken')) {
            this.paintButton('broken');
        }
        if (relatStatus.includes('I ban')) {
            this.setState({
                iDidBan: true,
                buttonClass: 'i-ban-button',
                popOverText: 'You have banned this user. The user has limited permission ' +
                'to your page. You cannot like the user unless you unban.'
            })
        }
    };

    like = () => {
        const {id} = this.props.info;
        const relationship = this.state.buttonClass;
        console.log(relationship);
        if (relationship === 'no-likes-button' || relationship === 'broken-button') {
            this.props.likeUser(id);
            this.paintButton('i-like');
        } else if (relationship === 'i-liked-button'){
            this.props.unlikeUser(id);
            this.paintButton();
        } else if ( relationship === 'me-liked-button') {
            this.props.likeUser(id);
            this.paintButton('match');
        } else if (relationship === 'match-button') {
            this.props.breakUpWithUser(id);
            this.paintButton('broken');
        }
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

    isBanned = () => {
        return (this.state.iDidBan || this.state.imBanned);
    };

render() {
    return (
        <Popover className="pop-relationship" placement="top" title="Your relationship status"
                 content={this.state.popOverText}
                 trigger="hover">
            <Popconfirm title={this.state.popConfirmText} placement="bottom"
                        onConfirm={this.like} onCancel={this.cancel} okText="Yes" cancelText="No">
        <Button className={`like-button ${this.state.buttonClass}`} disabled={this.isBanned()}
                icon={this.checkIcon()}/></Popconfirm>
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