import React from 'react'
import Ionicon from 'react-ionicons'

const ProfileUserGenderIcon = (props) => {
    const gender = props.gender;
    const genderStyle = {
        fill: 'white',
        marginLeft: '7px',
        marginBottom: '-3px',
        fontSize: '25px'
    };
 return (
     <span className="icon-inline">
              {gender === 'male' ? <Ionicon icon="md-male" style={genderStyle}/>
                  : <Ionicon icon="md-female" style={genderStyle}/>}
          </span>
 )
};
export default ProfileUserGenderIcon;