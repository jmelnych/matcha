import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const ProfileUserGenderIcon = (props) => {
    const gender = props.user;
    const genderStyle = {
        fill: 'white',
        width: '32px',
        height: '22px',
        marginBottom: '-3px'
    };
 return (
     <span className="icon-inline">
              {gender === 'male' ? <Ionicon icon="md-male" style={genderStyle}/>
                  : <Ionicon icon="md-female" style={genderStyle}/>}
          </span>
 )
};

ProfileUserGenderIcon.propTypes = {
    gender: PropTypes.string
};

export default ProfileUserGenderIcon;