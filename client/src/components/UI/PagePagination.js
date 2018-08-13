import React, { Component } from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'

const PagePagination = (props) => {
    let step = 9;
    let usersQ = props.quantity;
    return (
      <div className="pagination">
          <Pagination hideOnSinglePage={true} defaultPageSize={step}
                      defaultCurrent={1} pageSize={step} total={usersQ}
          onChange={props.handleChangePage}/>
      </div>
    );
};

PagePagination.propTypes = {
  users: PropTypes.array,
  handleChangePage: PropTypes.func.isRequired
};

export default PagePagination;