import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import {Modal} from 'antd'
import EditProfileUserTabs from './EditProfile/EditProfileUserTabs'
import ProfileUserLocation from './ProfileUserLocation'
import {connect} from 'react-redux'
import ProfileUserInfoUI from '../UI/ProfileUserInfo'
import PropTypes from 'prop-types'

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
                    <ProfileUserInfoUI user={user}/>
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