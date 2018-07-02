import React, { Component } from 'react'
import {Upload, Button} from 'antd'
import {uploadAvatar} from '../actions/userActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class EditProfileUserAvatar extends Component {
    state = {
        file: null
    };

    handleChange = (e) => {
        const file = e.file;
        this.setState({file});
        this.fileUploadHandler();
    };

    fileUploadHandler = () => {
        let id = this.props.user.id;
        console.log('in fuh');
        console.log(this.props);
        this.props.uploadAvatar(id, {test: 123});
    }

render() {
    console.log(this.state.file);
    return (
      <div>
          <Upload showUploadList={false} onChange={this.handleChange}>
              <Button type="primary" shape="circle" icon="upload" size="small" />
          </Upload>
      </div>
    );
  }
};

EditProfileUserAvatar.propTypes = {
    user: PropTypes.object.isRequired,
    uploadAvatar: PropTypes.func.isRequired
}

export default connect(null, {uploadAvatar})(EditProfileUserAvatar);