import React, { Component } from 'react'
import {Upload, Button} from 'antd'

class EditProfileUserAvatar extends Component {
    state = {
        file: null
    };

    handleChange = (e) => {
        const file = e.file;
        this.setState({file});
    };

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
}
export default EditProfileUserAvatar;