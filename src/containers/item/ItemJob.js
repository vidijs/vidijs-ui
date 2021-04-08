import React from 'react';

import { job as api } from '@vidispine/vdt-api';
import JobListCard from '../../components/job/JobListCard';
import withSnackbar from '../../hoc/withSnackbar';

class ItemJob extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.state = {
      jobListDocument: undefined,
      count: undefined,
      page: 1,
      rowsPerPage: 10,
      orderBy: 'jobId',
      orderDirection: 'desc',
      sort: 'jobId desc',
      first: 0,
      number: 10,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onFetch(itemId);
      document.title = `xray | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { itemId } = this.props;
    this.onFetch(itemId);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Jobs';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(itemId) {
    const { sort, first, number } = this.state;
    const matrixParams = {
      first,
      number,
      sort,
    };
    const queryParams = {
      jobmetadata: [
        {
          key: 'itemId',
          value: itemId,
        },
      ],
    };
    try {
      api.listJob({
        queryParams,
        matrixParams: Object.entries(matrixParams),
      })
        .then((response) => this.onSuccess(response))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onSuccess(response) {
    const jobListDocument = response.data;
    const { first = 0, number = 10 } = this.state;
    const { hits = 0 } = jobListDocument;
    const page = Math.ceil(hits / number) - Math.ceil((hits - first) / number);
    this.setState({
      count: hits,
      rowsPerPage: number,
      page,
      jobListDocument,
    });
  }

  async onChangePage({ page }) {
    const { number = 10 } = this.state;
    const first = page * number;
    await this.setState({ first });
    this.onRefresh();
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const first = 0;
    await this.setState({ first, number });
    this.onRefresh();
  }

  onChangeOrder(orderBy) {
    return async () => {
      const { orderDirection: prevOrderDirection, orderBy: prevOrderBy } = this.state;
      let sort = '';
      let newOrderDirection;
      let newOrderBy;
      if (orderBy !== prevOrderBy) {
        newOrderBy = orderBy;
        newOrderDirection = 'desc';
        sort = [`${orderBy} ${newOrderDirection}`];
      } else if (prevOrderDirection === 'desc') {
        newOrderBy = orderBy;
        newOrderDirection = 'asc';
        sort = [`${orderBy} ${newOrderDirection}`];
      }
      await this.setState({ orderBy: newOrderBy, orderDirection: newOrderDirection, sort });
      this.onRefresh();
    };
  }

  render() {
    const {
      jobListDocument,
      count,
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    } = this.state;
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={jobListDocument}
            codeModal="JobListDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <JobListCard
          jobListDocument={jobListDocument}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          onChangeOrder={this.onChangeOrder}
          orderBy={orderBy}
          orderDirection={orderDirection}
        />
      </>
    );
  }
}

export default withSnackbar(ItemJob);
