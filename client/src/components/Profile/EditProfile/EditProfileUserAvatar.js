import React, { Component } from 'react'
import {Upload, Button, message} from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {checkTypeSize} from '../../../helpers/checkTypeSize'
import {getBaseURL} from '../../../config';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class EditProfileUserAvatar extends Component {
    state = {
        loading: false,
        imageUrl: null
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            setTimeout(() => console.log(info.file.status), 2000);
        }
        if (info.file.status === 'done') {
            if (info.file.response === 'Avatar updated') {
                message.success(`${info.file.name} file uploaded successfully`);
                getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl,
                    loading: false,
                }));
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

render() {
    const imageUrl = this.state.imageUrl;
    const {user} = this.props;
    const props = {
        name: 'avatar',
        action: 'api/image/save-avatar',
        headers: {
            authorization: 'authorization-text',
        }
    };

    return (
      <div className="profile-main-avatar-content">
          <img src={imageUrl ? imageUrl :
              `${getBaseURL()}/avatars/${user.avatar}`} alt="avatar" />
          <Upload {...props}
                  showUploadList={false}
                  beforeUpload={checkTypeSize}
                  onChange={this.handleChange}>
              <Button type="primary" shape="circle" className="avatar-upload"
                      icon={this.state.loading ? "loading" : "upload"} size="small" />
          </Upload>
      </div>
    );
  }
}

function mapStateToProps({user}) {
    return user;
}


EditProfileUserAvatar.propTypes = {
    user: PropTypes.object.isRequired,
    checkTypeSize: PropTypes.func

};

export default connect(mapStateToProps, null)(EditProfileUserAvatar);
