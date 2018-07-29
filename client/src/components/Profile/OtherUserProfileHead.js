import React, { Component } from 'react'
import {Button, Popconfirm, message} from 'antd'
import {connect} from 'react-redux'
import ProfileUserGenderIcon from './ProfileUI/ProfileUserGenderIcon'
import LikeButtonStatus from './LikeButtonStatus'
import {fakeNotification, banUser} from '../../actions/userActions'

class OtherUserProfileHead extends Component {
    confirm = () => {
        const {id} = this.props.info;
        this.props.fakeNotification(id);
        message.success('Your notification has been send');
    };
    cancel = () => {
        console.log('cancel');
    };

    ban = () => {
        const {id} = this.props.info;
        this.props.banUser(id);
    };
render() {
    const user = this.props.info || {avatar: 'default.png', gender: 'male', rating: 0, age: 18, location: {city:'Kiev', country: 'Ukraine'}};
    const av_name = user.avatar;
    const avatar = require(`../../img/avatars/${av_name}`);
    return (
        <div className="profile-main-header">
            <div className="profile-main-avatar">
                <div className="wrapper">
                    <Popconfirm title="Are you sure you want to report fake account?"
                                onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <a className="text-secondary suspect">Suspect fake account?</a>
                    </Popconfirm>
                    <div className="profile-main-avatar-content">
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <figcaption>
                        <p className="figcaption-text">Rating: {user.rating}</p>
                        <p className="figcaption-text">Age: {user.age}</p>
                        <p className="figcaption-text">City: {user.location.city}</p>
                        <p className="figcaption-text">Gender:
                            <ProfileUserGenderIcon user={user.gender}/></p>
                    </figcaption>
                    <LikeButtonStatus/>
                    <Button className="ban-button" onClick={this.ban} type="danger">Ban</Button>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
};

function mapDispatchToProps(dispatch) {
    return {
        fakeNotification: (id) => dispatch(fakeNotification(id)),
        banUser: (id) => dispatch(banUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfileHead);