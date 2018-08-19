import React, { Component } from 'react'
import {likeUser, unlikeUser} from '../../actions/userActions'
import {connect} from 'react-redux'
import {Button, Popover, Popconfirm} from 'antd'
import PropTypes from 'prop-types'
import { socket } from '../Root'

class LikeButtonStatus extends Component {
    state = {
        buttonClass: 'no-likes-button',
        popOverText: 'Like the profile? Like the user!',
        brokenHeart: false,
        popConfirmText: '',
        iDidBan: false,
        banMe: false,
        forbidToLike: false
    };

    paintButton = (status) => {
        let buttonClass, popOverText, brokenHeart, popConfirmText, iDidBan, banMe;
        switch (status) {
            case 'i-like':
                buttonClass = 'i-liked-button';
                popOverText = 'You already liked this user. If the user likes you in return, you become a match. ' +
                    'Wait for the response on remove your like.';
                brokenHeart = false;
                iDidBan = false;
                banMe = false;
                break;
            case 'me-like':
                buttonClass = 'me-liked-button';
                popOverText = 'The user liked you. If you like the user, you can like in return and then you ' +
                    'will become a match!';
                brokenHeart = false;
                iDidBan = false;
                banMe = false;
                break;
            case 'match':
                buttonClass = 'match-button';
                popOverText = 'You are a match! You can write direct messages to each other!';
                popConfirmText = 'Are you sure you want to break up with the user? This is irreversible!';
                brokenHeart = false;
                iDidBan = false;
                banMe = false;
                break;
            case 'broken':
                buttonClass = 'broken-button';
                popOverText = 'Woo, you have broken up with the user. If you change your mind, ' +
                    'you can like the user again.';
                brokenHeart = true;
                iDidBan = false;
                banMe = false;
                break;
            case 'i-ban':
                buttonClass = 'i-ban-button';
                popOverText = 'You have banned this user. The user has limited permission ' +
                    'to your page. You cannot like the user unless you change the status to unban.';
                brokenHeart = false;
                iDidBan = true;
                banMe = false;
                break;
            case 'ban-me':
                buttonClass = 'i-ban-button';
                popOverText = 'You are banned by this user';
                brokenHeart = false;
                iDidBan = false;
                banMe = true;
                break;
            default:
                buttonClass = 'no-likes-button';
                popOverText = 'Like the profile? Like the user!';
                brokenHeart = false;
                iDidBan = false;
                banMe = false;
        }
        this.setState ({
            buttonClass,
            popOverText,
            brokenHeart,
            popConfirmText,
            iDidBan,
            banMe
        })
    };



    // componentDidUpdate(prevProps) {
    //     console.log(this.props);
    //     if (prevProps.ban !== this.props.ban) {
    //         if (this.props.ban) {
    //             this.paintButton('i-ban');
    //             this.setState({
    //                 iDidBan: true
    //             });
    //             return;
    //         }
    //         if (this.props.banMe){
    //             this.paintButton('ban-me');
    //             this.setState({
    //                 banMe: true
    //             });
    //             return;
    //         }
    //         if (this.props.otherUser.info.avatar === 'default.png') {
    //             this.setState({
    //                 forbidToLike: true
    //             })
    //         }
    //         const relatStatus = this.props.otherUser.relationship;
    //         console.log(relatStatus);
    //         if (relatStatus.includes('I like')) {
    //             this.paintButton('i-like');
    //         } else if (relatStatus.includes('like Me')) {
    //             this.paintButton('me-like');
    //         } else if (relatStatus.includes('match')) {
    //             this.paintButton('match');
    //         } else if (relatStatus.includes('broken')) {
    //             this.paintButton('broken');
    //         } else {
    //             this.paintButton('');
    //         }
    //     }
    // }

    componentWillReceiveProps(props) {
        if (props.ban) {
            this.paintButton('i-ban');
            this.setState({
                iDidBan: true
            });
            return;
        }
        if (props.banMe){
            this.paintButton('ban-me');
            this.setState({
                banMe: true
            });
            return;
        }
        if (props.otherUser.info.avatar === 'default.png' || props.currentUser.avatar === 'default.png') {
            this.setState({
                forbidToLike: true
            })
        }
        const relatStatus = props.otherUser.relationship;
        if (relatStatus.includes('I like')) {
            this.paintButton('i-like');
        } else if (relatStatus.includes('like Me')) {
            this.paintButton('me-like');
        } else if (relatStatus.includes('match')) {
            this.paintButton('match');
        } else if (relatStatus.includes('broken')) {
            this.paintButton('broken');
        } else {
            this.paintButton('');
        }
    };

    like = () => {
        const {id} = this.props.otherUser.info;
        const relationship = this.state.buttonClass;
        if (relationship === 'no-likes-button' || relationship === 'broken-button') {
            this.props.likeUser(id);
            const data = {
                recipient_id: id,
                action: 'like Me',
                added: new Date(),
                author_id: this.props.currentUser.id,
                firstname: this.props.currentUser.firstname,
                lastname: this.props.currentUser.lastname,
                avatar: this.props.currentUser.avatar
            };
            socket.emit('notification', data);
            this.paintButton('i-like');
        } else if (relationship === 'i-liked-button'){
            this.props.unlikeUser(id);
            this.paintButton();
        } else if ( relationship === 'me-liked-button') {
            this.props.likeUser(id);
            const data = {
                recipient_id: id,
                action: 'match Me',
                added: new Date(),
                author_id: this.props.currentUser.id,
                firstname: this.props.currentUser.firstname,
                lastname: this.props.currentUser.lastname,
                avatar: this.props.currentUser.avatar
            };
            socket.emit('notification', data);
            this.paintButton('match');
        } else if (relationship === 'match-button') {
            this.props.unlikeUser(id);
            const data = {
                recipient_id: id,
                action: 'break up Me',
                added: new Date(),
                author_id: this.props.currentUser.id,
                firstname: this.props.currentUser.firstname,
                lastname: this.props.currentUser.lastname,
                avatar: this.props.currentUser.avatar
            };
            socket.emit('notification', data);
            this.paintButton('broken');
        }
    };

    cancel = () => {
        console.log('cancel');
    };

    checkIcon = () => {
        if (this.state.iDidBan || this.state.banMe) {
            return 'exclamation-circle-o';
        }
        if (this.state.brokenHeart) {
            return '';
        }
        return 'heart';
    };

    isBanned = () => {
        return (this.state.iDidBan || this.state.banMe);
    };


render() {
    console.log('this.state.forbidToLike', this.state.forbidToLike);
    if (this.state.forbidToLike) {
        return (
            <Popover className="pop-relationship" placement="top" title="Your relationship status"
                     content="You cannot like the user with default avatar or if you have default avatar" trigger="hover">
            <Button className={`like-button no-likes-button`}
                           disabled={true}
                           icon="heart"/>
            </Popover>
            )
    } else {
        return (
            <Popover className="pop-relationship" placement="top" title="Your relationship status"
                     content={this.state.popOverText} trigger="hover">
                {this.state.buttonClass === 'match-button' ? (
                    <Popconfirm title={this.state.popConfirmText} placement="bottom"
                                onConfirm={this.like} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <Button className={`like-button ${this.state.buttonClass}`} disabled={this.isBanned()}
                                icon={this.checkIcon()}/></Popconfirm>
                ) : (<Button className={`like-button ${this.state.buttonClass}`} onClick={this.like}
                            disabled={this.isBanned()}
                            icon={this.checkIcon()}/>)}
            </Popover>
        );

    }
  }
}
function mapStateToProps({otherUser, user}){
    return {
        otherUser: otherUser.user,
        currentUser: user.user
    };
};

function mapDispatchToProps(dispatch) {
    return {
        likeUser: (id) => dispatch(likeUser(id)),
        unlikeUser: (id) => dispatch(unlikeUser(id))
    }
};

LikeButtonStatus.propTypes = {
    otherUser: PropTypes.object,
    likeUser: PropTypes.func.isRequired,
    unlikeUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButtonStatus);