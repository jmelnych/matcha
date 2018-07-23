import React, { Component } from 'react'
import {connect} from 'react-redux'
import SearchFilter from './SearchFilter'
import SearchPagination from './SearchPagination'
import PeopleUIResults from './PeopleUIResults'


class Search extends Component {
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
          <SearchFilter/>
          <div className="container-right">
                <PeopleUIResults users={users}/>
              <SearchPagination handleChangePage={this.handleChangePage}/>
          </div>
      </div>
    );
  }
};

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Search);