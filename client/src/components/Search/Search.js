import React, { Component } from 'react'
import {connect} from 'react-redux'
import SearchFilter from './SearchFilter'
import PagePagination from '../UI/PagePagination'
import PeopleListResults from '../UI/PeopleListResults'
import PropTypes from 'prop-types'


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
    let {users} = this.props || [];
    const totalLength = users.length;
    users = users.slice(this.state.rangeL, this.state.rangeU);
    return (
      <div className="container-flex top">
          <SearchFilter/>
          <div className="container-right">
                <PeopleListResults users={users}/>
              <PagePagination quantity={totalLength}
                                handleChangePage={this.handleChangePage}/>
          </div>
      </div>
    );
  }
};

function mapStateToProps({users}) {
    return {
        users
    }
};

Search.propTypes = {
    users: PropTypes.array
}

export default connect(mapStateToProps)(Search);