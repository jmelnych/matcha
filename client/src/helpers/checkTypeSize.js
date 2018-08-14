import {message} from 'antd'

export const checkTypeSize = (file) => {
    const isJPG_PNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG_PNG) {
        message.error('You can only upload JPG or PNG file');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB');
    }
    return isJPG_PNG && isLt2M;
}