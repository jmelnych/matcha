import React, { Component } from 'react'
import {connect} from 'react-redux'
import SearchPagination from './Search/SearchPagination'
import MatchFilter from './MatchFilter'
import PeopleUIResults from './Search/PeopleUIResults'

class Match extends Component {

    state = {
        page: 1,
        rangeL: 0,
        rangeU: 9
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
        let {users} = this.props;
        users = users.slice(this.state.rangeL, this.state.rangeU);
        return (
            <div className="container-flex top">
                <MatchFilter/>
                <div className="container-right">
                    <PeopleUIResults users={users}/>
                    <SearchPagination handleChangePage={this.handleChangePage}/>
                </div>
            </div>
        );
    };
}

function mapStateToProps({users}) {
    //TODO: map not users, but perfect matches
    return {
        users
    }
}

export default connect(mapStateToProps)(Match);