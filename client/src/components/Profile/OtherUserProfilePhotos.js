import React, { Component } from 'react'
import { Upload, Modal } from 'antd'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class OtherUserProfilePhotos extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        photos: []
    };

    componentDidMount(){
        const photos = this.props.photos;
        const generatedPhotos = [];
        photos.map((photo, index) => {
            let src = require(`../../img/photos/${photo.filename}`);
            let photoObj = {
                uid: index,
                status: 'done',
                url: src,
                name: photo.filename
            };
            generatedPhotos.push(photoObj);
        });
        this.setState({
            photos: generatedPhotos
        })
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    render() {
        const { previewVisible, previewImage } = this.state;

        return (
            <div className="profile-main-info-list">
                <div className="clearfix">
                    <h3>Photos</h3>
                    <Upload
                            listType="picture-card"
                            fileList={this.state.photos}
                            onPreview={this.handlePreview}
                            showUploadList={{ showRemoveIcon: false, showPreviewIcon: true }}
                            >
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps({otherUser}){
    return otherUser.user;
}

export default connect(mapStateToProps)(OtherUserProfilePhotos);