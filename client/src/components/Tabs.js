import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Tabs extends Component {
    currentRoute() {
        let url = window.location.href;
        url     = url.split('/');
        let ln  = url.length;
        url     = url[ln - 1];
        return url;
    }

    render() {
        //const curRoute = this.currentRoute();
        return (
            <div>
                <ul className="tabs">
                    <Link to='/signup'>
                        <li>Signup</li>
                    </Link>
                    <Link to='/login'>
                        <li>Login</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default Tabs;