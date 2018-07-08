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
                this.props.addFlashMessage({
                    type: 'success',
                    text: "Your email has been activated"
                });
                setTimeout(() => {window.location.href = '/'}, 2000);

            } else {
                this.props.addFlashMessage({
                    type: 'error',
                    text: "Looks like your activation link is not vaild"
                });
                setTimeout(() => {window.location.href = '/'}, 2000);
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
