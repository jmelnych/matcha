import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    };

    return (
      <div className="App-not-found">
          <div className="not-found-section">
              <h1>404</h1>
              <h2>Oops, the page you're looking for does not exist.</h2>
              <div className="btn"><Link to='/' style={linkStyle}> RETURN HOME</Link></div>
          </div>
      </div>
    );
  };

export default NotFound;