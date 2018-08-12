import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getMatchUsers} from '../actions/searchActions'
import SearchPagination from './Search/SearchPagination'
import PeopleUIResults from './Search/PeopleUIResults'
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
        let {matches} = this.props;
        console.log(matches);
        matches = matches.slice(this.state.rangeL, this.state.rangeU);
        return (
            <div className="container-flex top">
                <div className="container-right">
                    <PeopleUIResults users={matches}/>
                    <SearchPagination handleChangePage={this.handleChangePage}/>
                </div>
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