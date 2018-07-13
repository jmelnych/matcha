import React, { Component } from 'react'
import { Select, Modal } from 'antd'
import { getTags, saveUserTag, deleteUserTag } from '../actions/tagsActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ProfileUserAddTag from './ProfileUserAddTag'

const Option = Select.Option;

class ProfileUserInterests extends Component {
    state = {
        tags: [],
        visible: false,
        confirmLoading: true,
        ModalText: ''
    };

    componentDidMount(){
        this.props.getTags();
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

    handleChange = (tags) => {
        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        if (this.state.tags.length < tags.length) {
            this.props.saveUserTag(tags[tags.length - 1]);
        } else if (this.state.tags.length > tags.length) {
            let deletedTag = this.state.tags.diff(tags);
            this.props.deleteUserTag(deletedTag);
        }
        this.setState({
            tags
        })
    };

render() {
    const { visible, confirmLoading, ModalText } = this.state;
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
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select your interests"
                onChange={this.handleChange}
                >
                {children}
            </Select>
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

function mapStateToProps({tags}) {
    return {
        tags: tags.map((tag) => tag.tag)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTags: () => dispatch(getTags()),
        saveUserTag: (tagname) => dispatch(saveUserTag(tagname)),
        deleteUserTag: (tagname) => dispatch(deleteUserTag(tagname))
    }

};

ProfileUserInterests.propTypes = {
    getTags: PropTypes.func.isRequired,
    saveUserTag: PropTypes.func.isRequired,
    deleteUserTag: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInterests);