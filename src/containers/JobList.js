import React from 'react';
import { compose } from 'redux';

import JobFilter from '../components/job/JobFilter';
import JobListCard from '../components/job/JobListCard';
import JobCreate from '../components/job/JobCreate';

import TitleHeader from '../components/ui/TitleHeader';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const JOB_FILTER_FORM = 'JOB_FILTER_FORM';
const JOB_CREATE_DIALOG = 'JOB_CREATE_DIALOG';

class JobList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.onChangeAutoRefresh = this.onChangeAutoRefresh.bind(this);
    this.state = {
      jobListDocument: undefined,
      count: undefined,
      page: undefined,
      rowsPerPage: undefined,
      orderBy: undefined,
      orderDirection: undefined,
      autoRefresh: false,
    };
  }

  componentDidMount() {
    document.title = 'xray | Job';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(JOB_FILTER_FORM);
  }

  onChangeAutoRefresh() {
    const { autoRefresh: prevAutoRefresh } = this.state;
    const autoRefresh = !prevAutoRefresh;
    this.setState({ autoRefresh });
    if (autoRefresh === true && this.timer === undefined) {
      this.timer = setInterval(() => this.onRefresh(), 2500);
    } else if (autoRefresh === false && this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  onSuccess(response) {
    const jobListDocument = response.data;
    const { formValues = {} } = this.props;
    const { matrixParams = {} } = formValues;
    const { first = 0, number = 10 } = matrixParams;
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
    const { formValues = {}, changeForm } = this.props;
    const { matrixParams = {} } = formValues;
    const { number = 10 } = matrixParams;
    const first = page * number;
    changeForm(JOB_FILTER_FORM, 'matrixParams.first', first);
    await changeForm(JOB_FILTER_FORM, 'matrixParams.number', number);
    this.onRefresh();
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 0;
    changeForm(JOB_FILTER_FORM, 'matrixParams.first', first);
    await changeForm(JOB_FILTER_FORM, 'matrixParams.number', number);
    this.onRefresh();
  }

  onChangeOrder(orderBy) {
    return async () => {
      const { changeForm } = this.props;
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
      this.setState({ orderBy: newOrderBy, orderDirection: newOrderDirection });
      await changeForm(JOB_FILTER_FORM, 'matrixParams.sort', sort);
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
      autoRefresh,
    } = this.state;
    const { history } = this.props;
    return (
      <>
        <TitleHeader
          title="Job"
          helpTo="/ref/job.html"
          onRefresh={this.onRefresh}
          code={jobListDocument}
          codeModal="JobListDocument"
          createModal={JOB_CREATE_DIALOG}
          autoRefresh={autoRefresh}
          onChangeAutoRefresh={this.onChangeAutoRefresh}
        />
        <JobFilter
          form={JOB_FILTER_FORM}
          onSuccess={this.onSuccess}
        />
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
        <JobCreate
          dialogName={JOB_CREATE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(JobList, JOB_FILTER_FORM);
