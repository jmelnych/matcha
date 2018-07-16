import React, { Component } from 'react'
import { Modal } from 'antd'
import ProfileUserSelectTags from './ProfileUserSelectTags'
import ProfileUserAddTag from './ProfileUserAddTag'

class ProfileUserInterests extends Component {
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
            ModalText: 'Updating... Please, wait',
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

    return (
        <div className="profile-main-info-list">
            <h3>Personal Interests</h3>
            <ProfileUserSelectTags/>
            <a onClick={this.showModal}>Not in list? Add your own</a>
            <Modal title="Add your own tags"
                   visible={visible}
                   onCancel={this.handleCancel}
                   confirmLoading={confirmLoading}
                   footer={null}>
                {ModalText ? <p>{ModalText}</p> :
                    <ProfileUserAddTag closeOnSubmit={this.handleOk}/>
                }
            </Modal>

        </div>
    );
  }
};


export default ProfileUserInterests;