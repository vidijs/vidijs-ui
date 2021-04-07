import React from 'react';

const withPagination = (WrappedComponent) => class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    const {
      page = 0,
      rowsPerPage = 10,
      orderBy,
      orderDirection,
    } = props;
    this.state = {
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    };
  }

  onChangeRowsPerPage({ target: { value: rowsPerPage } } = {}) {
    const { onChangeRowsPerPage } = this.props;
    const page = 0;
    this.setState({ page, rowsPerPage });
    if (onChangeRowsPerPage) { onChangeRowsPerPage({ page, rowsPerPage }); }
  }

  onChangePage({ page }) {
    const { onChangePage } = this.props;
    const { rowsPerPage } = this.state;
    this.setState({ page });
    if (onChangePage) { onChangePage({ page, rowsPerPage }); }
  }

  onChangeOrder(newOrderBy) {
    return () => {
      const { onChangeOrder } = this.props;
      const {
        orderDirection: prevOrderDirection,
        orderBy: prevOrderBy,
      } = this.state;
      let orderDirection = '';
      let orderBy = '';
      if (newOrderBy !== prevOrderBy) {
        orderBy = newOrderBy;
        orderDirection = 'desc';
      } else if (prevOrderDirection === 'desc') {
        orderBy = newOrderBy;
        orderDirection = 'asc';
      }
      const page = 0;
      this.setState({ orderBy, orderDirection, page });
      if (onChangeOrder) { onChangeOrder({ orderBy, orderDirection, page }); }
    };
  }

  render() {
    const {
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    } = this.state;
    const rowsPerPageOptions = [10, 100, 250];
    if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
    return (
      <WrappedComponent
        {...this.props}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={this.onChangePage}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onChangeOrder={this.onChangeOrder}
      />
    );
  }
};

export default withPagination;
