import React, { Component } from 'react'
import { Upload, Modal } from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getBaseURL} from '../../config'

class OtherUserProfilePhotos extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        photos: []
    };

    componentDidUpdate(prevProps, prevState){
        const photos = this.props.photos || [];
        if (prevState.photos.length < photos.length){
            const generatedPhotos = [];
            const baseURL = getBaseURL();
            photos.map((photo, index) => {
                    let src = `${baseURL()}/photos/${photo}`;
                    let photoObj = {
                        uid: index,
                        status: 'done',
                        url: src,
                        name: photo
                    };
                    generatedPhotos.push(photoObj);
            });
            this.setState({
                photos: generatedPhotos
            })
        }
    }

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
                    {!!this.state.photos.length && (
                        <div>
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
                    )}
                    {(this.state.photos.length === 0) && (
                        <div className="text-secondary info">No photos yet</div>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps({otherUser}){
    return {
        photos: otherUser.user.photos.map((photo) => photo.filename)
    }
};

OtherUserProfilePhotos.propTypes = {
    otherUser: PropTypes.object,
    photos: PropTypes.array
}

export default connect(mapStateToProps)(OtherUserProfilePhotos);