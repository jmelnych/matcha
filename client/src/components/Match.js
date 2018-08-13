import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getMatchUsers} from '../actions/searchActions'
import PagePagination from './UI/PagePagination'
import PeopleUIResults from './UI/PeopleListResults'
import PropTypes from 'prop-types'

class Match extends Component {

    state = {
        page: 1,
        rangeL: 0,
        rangeU: 9
    };

    componentDidMount() {
        this.props.getMatchUsers();
    };

    handleChangePage = (page) => {
        let step = 9;
        let rangeL = (page - 1) * step;
        let rangeU = rangeL + step;
        this.setState({
            page,
            rangeL,
            rangeU
        });

    };

    render() {
        let {matches} = this.props || [];
        let totalLength = matches.length;
        matches = matches.slice(this.state.rangeL, this.state.rangeU);
        return (
            <div className="container-center top">
                    <PeopleUIResults users={matches}/>
                    <PagePagination quantity={totalLength}
                                      handleChangePage={this.handleChangePage}/>
            </div>
        );
    };
}

function mapStateToProps({matches}) {
    return {
        matches
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMatchUsers: () => dispatch(getMatchUsers())
    }

};

Match.propTypes = {
    matches: PropTypes.array,
    getMatchUsers: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Match);