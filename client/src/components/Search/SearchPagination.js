import React, { Component } from 'react'
import { Pagination } from 'antd'
import {connect} from 'react-redux'

class SearchPagination extends Component {
render() {
    let step = 9;
    let usersQ = this.props.users.length;
    return (
      <div className="pagination">
          <Pagination hideOnSinglePage={true} defaultPageSize={step}
                      defaultCurrent={1} pageSize={step} total={usersQ}
          onChange={this.props.handleChangePage}/>
      </div>
    );
  }
};

function mapStateToProps({users}) {
    return {
        users
    }
};

export default connect(mapStateToProps)(SearchPagination);