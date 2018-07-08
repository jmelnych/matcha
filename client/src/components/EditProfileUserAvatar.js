import React, { Component } from 'react'
import {Upload, Button, message} from 'antd'
import {uploadAvatar} from '../actions/userActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function checkTypeSize(file) {
    const isJPG_PNG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPG_PNG) {
        message.error('You can only upload JPG or PNG file');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB');
    }
    return isJPG_PNG && isLt2M;
}

class EditProfileUserAvatar extends Component {
    state = {
        loading: false,
        imageUrl: null
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const {user, uploadAvatar} = this.props;
            let filename = info.file.response;
            uploadAvatar(user.id, filename).then((res) => {
                if (res.data === 'Avatar updated') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    getBase64(info.file.originFileObj, imageUrl => this.setState({
                        imageUrl,
                        loading: false,
                    }));

                }
            });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

render() {
    const imageUrl = this.state.imageUrl;
    const {user} = this.props;
    const av_name = user.avatar || 'default.png';
    const avatar = require(`../img/avatars/${av_name}`);
    const props = {
        name: 'avatar',
        action: 'api/image/save',
        headers: {
            authorization: 'authorization-text',
        }
    };

    return (
      <div>
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : <img src={avatar} alt="avatar"/>}
          <Upload {...props}
                  showUploadList={false} beforeUpload={checkTypeSize}
                  onChange={this.handleChange}>
              <Button type="primary" shape="circle" icon={this.state.loading ? "loading" : "upload"} size="small" />
          </Upload>
      </div>
    );
  }
};

function mapStateToProps({user}) {
    return user;
};

function mapDispatchToProps(dispatch) {
    return {
        uploadAvatar: (id, filename) => dispatch(uploadAvatar(id, filename))
    }
};

EditProfileUserAvatar.propTypes = {
    user: PropTypes.object.isRequired,
    uploadAvatar: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileUserAvatar);