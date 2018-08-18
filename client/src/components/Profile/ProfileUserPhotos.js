import React, { Component } from 'react'
import { Upload, Icon, Modal, Popover } from 'antd'
import {connect} from 'react-redux'
import {getPhotos, removePhoto, addPhoto} from '../../actions/photosAction'
import PropTypes from 'prop-types'
import {checkTypeSize} from '../../helpers/checkTypeSize'

class ProfileUserPhotos extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        photos: []
    };

    componentDidMount() {
        this.props.getPhotos();
    };

    componentDidUpdate(prevProps, prevState){
        const photos = this.props.photos;
        const generatedPhotos = [];
        if (photos.length > this.state.photos.length) {
            photos.map((photo, index) => {
                console.log('requesting photos', photo);
                let src = require(`../../img/photos/${photo}`);
                console.log(src);
                if (src) {
                    let photoObj = {
                        uid: index,
                        status: 'done',
                        url: src,
                        name: photo
                    };
                    generatedPhotos.push(photoObj);
                }
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
    };

    handleChange = (photo) => {
        if(photo.file.status === 'removed') {
            this.props.removePhoto(photo.file.name);
            this.setState(prevState => ({
                photos:
                prevState.photos})
            );
        } else {
            this.setState({ photos: photo.fileList})
            if (photo.file.response){
                this.updateName(photo.file.response);
            }
        }
    };

    updateName = (name) => {
        const donePhotos = this.state.photos.filter(photo => photo.status === 'done' && !photo.response);
        const newPhoto = this.state.photos.filter(photo => photo.response);
        newPhoto[0].name = name;
        newPhoto[0].response = null;
        //this.props.addPhoto({'filename': name});
        this.setState({
            photos: [...donePhotos, newPhoto[0]]
        })
    }


    render() {
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
            action: 'api/image/save-photo',
            headers: {
                authorization: 'authorization-text',
            }
        };

        let photos = this.state.photos || [];
        let photosRender = photos.filter(photo => photo.status === 'done'
            || photo.status === 'uploading');
        return (
            <div className="profile-main-info-list">
            <div className="clearfix">
                <Popover placement="rightTop" title="Photo info" content={content}
                         trigger="hover"><h3>Photos</h3></Popover>
                <Upload {...props}
                    beforeUpload={checkTypeSize}
                    listType="picture-card"
                    fileList={photosRender}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {photosRender.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            </div>
        );
    }
}

function mapStateToProps({photos}) {
    return {
        photos: photos.map((photo) => photo.filename)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPhotos: () => dispatch(getPhotos()),
        removePhoto: (name) => dispatch(removePhoto(name)),
        addPhoto: (obj) => dispatch(addPhoto(obj))
    }
}

ProfileUserPhotos.propTypes = {
    getPhotos: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
    photos: PropTypes.array,
    checkTypeSize: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserPhotos);
