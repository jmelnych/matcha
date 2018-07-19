import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {Modal} from 'antd'
import EditProfileUserTabs from './EditProfileUserTabs'
import ProfileUserLocation from './ProfileUserLocation'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

class ProfileUserInfo extends Component {
    state = {
        visible: false,
        confirmLoading: true,
        ModalText: ''
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'Updating your profile... Please, wait',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                ModalText: ''
            });
        }, 1000);
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const {user} = this.props;
        const ionicStyle = {
            fill: '#001529',
            marginBottom: '-5px',
            marginRight: '10px',
        };
        const editablePen = {
            bottom: '15px',
            right: '0'
        };
        return (
            <div className="profile-main-info-list">
                <h3>Info
                    <Ionicon onClick={this.showModal} className="editable-icon" style={editablePen} icon="md-create"/>
                </h3>
                <Modal title="Edit your profile info"
                       visible={visible}
                       onCancel={this.handleCancel}
                       confirmLoading={confirmLoading}
                       footer={null}>
                    {ModalText ? <p>{ModalText}</p> :
                        <EditProfileUserTabs closeOnSubmit={this.handleOk}/>
                    }
                </Modal>
                <ul>
                <li><Ionicon icon="ios-body-outline" style={ionicStyle}/>
                    <span className="text-secondary">Full Name: </span>
                    <span className="editable">{user.firstname} {user.lastname}</span></li>

                {(user.occupancy) &&<li><Ionicon icon="ios-briefcase-outline" style={ionicStyle}/>
                    <span className="text-secondary">Occupancy: </span>
                    <span className="editable">{user.occupancy}</span></li>
                }

                <li><Ionicon icon="ios-heart-outline" style={ionicStyle}/>
                    <span className="text-secondary">Preferences: </span>
                    <span className="editable">{user.preference === 'both' ? 'Men and Women':
                        user.preference.charAt(0).toUpperCase() + user.preference.substr(1)}</span></li>
                <li><Ionicon icon="ios-wine-outline" style={ionicStyle}/>
                    <span className="text-secondary">Birthday: </span>
                    <span className="editable"> {moment(user.bday, 'MM/DD/YYYY').format('ll')}</span>
                </li>
                <li><Ionicon icon="ios-time-outline" style={ionicStyle}/>
                    <span className="text-secondary">Joined: </span>
                    <span className="non-editable"> {moment(user.added).format('ll')}</span>
                </li>
                {(user.bio) &&<li><Ionicon icon="ios-book-outline" style={ionicStyle}/>
                    <span className="text-secondary">Bio: </span>
                    <span className="editable"> {user.bio}</span></li>
                }
                <ProfileUserLocation userLocation={user.location}/>
                </ul>
            </div>
        );
  }
};

ProfileUserInfo.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps({user}){
    return user;
};

export default connect(mapStateToProps)(ProfileUserInfo);