import React, { Component } from 'react'
import {connect} from 'react-redux'
import {tryActivate} from '../actions/userActions'
import PropTypes from 'prop-types'
import {addFlashMessage} from '../actions/flashMessages'

class Activation extends Component {

    componentDidMount() {
        const {token} = this.props.match.params;

        this.props.tryActivate({'token': token})
            .then((res) => {
            if (res.data === 'Your email has been confirmed'){
            window.location.href = '/';
                this.props.addFlashMessage({
                    type: 'success',
                    text: "Your email has been activated"
                });
            } else {
                window.location.href = '/';
                this.props.addFlashMessage({
                    type: 'error',
                    text: "Error"
                });
            }
        });
    }

render() {
    return (
        <div className="loading">Activating...</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        tryActivate: (token) => dispatch(tryActivate(token)),
        addFlashMessage: (msg) => dispatch(addFlashMessage(msg))
    }
}

Activation.propTypes = {
    tryActivate: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Activation);
