import React from 'react'
import Ionicon from 'react-ionicons'

const ProfileUserGenderIcon = (props) => {
    const gender = props.user;
    const genderStyle = {
        fill: 'white',
        width: '32px',
        height: '22px'
    };
 return (
     <span className="icon-inline">
              {gender === 'male' ? <Ionicon icon="md-male" style={genderStyle}/>
                  : <Ionicon icon="md-female" style={genderStyle}/>}
          </span>
 )
};
export default ProfileUserGenderIcon;