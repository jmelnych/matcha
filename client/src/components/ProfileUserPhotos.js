import React, { Component } from 'react'
import { Upload, Icon, Modal, Popover, message } from 'antd'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPhotos} from '../actions/photosAction'

class ProfileUserPhotos extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        photos: []
    };

    componentDidMount() {
        this.props.getPhotos();
    };

    componentDidUpdate(){
        const photos = this.props.photos;
        const generatedPhotos = [];
        if (photos.length > this.state.photos.length) {
            photos.map((photo, index) => {
                let src = require(`../img/photos/${photo}`);
                let photoObj = {
                    uid: index,
                    status: 'done',
                    url: src
                };
                generatedPhotos.push(photoObj);
            });
            this.setState({
                photos: generatedPhotos
            })
        }
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ( photo ) => {
        let photoArray = photo.fileList;
        this.setState({photos: photoArray});

        if (photo.file.status === 'done') {

            // let filename = photo.file.response;

        }
        };

    render() {
        console.log(this.state.photos);
        const { previewVisible, previewImage } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const content = (
            <div>
                <p>You can upload up to 4 photos</p>
            </div>
        );

        const props = {
            name: 'photo',
            action: 'api/image/savephoto',
            headers: {
                authorization: 'authorization-text',
            }
        };

        return (
            <div className="profile-main-info-list">
            <div className="clearfix">
                <Popover placement="rightTop" title="Photo info" content={content}
                         trigger="hover"><h3>Photos</h3></Popover>
                <Upload {...props}
                    listType="picture-card"
                    fileList={this.state.photos}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {this.state.photos.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            </div>
        );
    }
};

function mapStateToProps({photos}) {
    return {
        photos: photos.map((photo) => photo.filename)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getPhotos: () => dispatch(getPhotos())
    }
};




export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserPhotos);
