import React, { Component } from 'react'
import { Upload, Icon, Modal, Popover, message } from 'antd'
import {uploadPhoto} from '../actions/userActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ProfileUserPhotos extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        photos: []
    };

    componentDidMount() {
        /*TODO: write getUserPhotos method in userAction to fetch existing photos by current user,
        import it,
        call it this.props.getUserPhotos();
        mapStateToProps ?
        I'll get an array of objects like this:
        {
            uid,
            status,
            url (url is a path to photo, i need name only)
        }
        Map through each object, require photos

        in cycle, require each photo
        then somehow set state to images i got*/
        const photo = require(`../img/photos/photo-1530712711950.png`);
        this.setState({
            photos: [{
                uid: 1530712711950,
                status: 'done',
                url: photo
            }]
        });
    }


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
            const {user, uploadPhoto} = this.props;
            let filename = photo.file.response;
            uploadPhoto(user.id, filename).then((res) => {
                if (res.data === 'Photo saved') {
                    message.success(`${photo.file.name} file uploaded successfully`);
                }
            })
        }
        };

    render() {
        const { previewVisible, previewImage, photos } = this.state;
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
            action: 'api/image/save',
            headers: {
                authorization: 'authorization-text',
            }
        };



        return (
            <ul className="profile-main-info-list">
            <div className="clearfix">
                <Popover placement="rightTop" title="Photo info" content={content}
                         trigger="hover"><h3>Photos</h3></Popover>
                <Upload {...props}
                    listType="picture-card"
                    fileList={photos}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {photos.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            </ul>
        );
    }
};

function mapStateToProps({user}) {
    return user;
};

function mapDispatchToProps(dispatch) {
    return {
        uploadPhoto: (id, filename) => dispatch(uploadPhoto(id, filename)),
        //getPhotos: (id) => ...
    }
};



ProfileUserPhotos.propTypes = {
    user: PropTypes.object.isRequired,
    uploadPhoto: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserPhotos);