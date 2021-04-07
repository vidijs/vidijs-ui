import React from 'react';

import { job as api } from '@vidijs/vidijs-api';
import JobTitle from '../components/job/JobTitle';
import JobCard from '../components/job/JobCard';
import JobPriority from '../components/job/JobPriority';
import JobDuplicate from '../components/job/JobDuplicate';
import JobAbort from '../components/job/JobAbort';
import JobRemove from '../components/job/JobRemove';
import { RUNNING_STATES } from '../const/JobStates';

import withUI from '../hoc/withUI';

const JOB_PRIORITY_DIALOG = 'JOB_PRIORITY_DIALOG';
const JOB_DUPLICATE_DIALOG = 'JOB_DUPLICATE_DIALOG';
const JOB_ABORT_DIALOG = 'JOB_ABORT_DIALOG';
const JOB_REMOVE_DIALOG = 'JOB_REMOVE_DIALOG';

class Job extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onAutoRefresh = this.onAutoRefresh.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      jobDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    this.timer = setInterval(() => this.onAutoRefresh(), 2500);
    const { jobId } = this.props;
    document.title = `vidi.js | Job | ${jobId}`;
  }

  UNSAFE_componentWillReceiveProps({ jobId }) {
    const { jobId: prevJobId } = this.props;
    if (prevJobId !== jobId) {
      this.onFetch(jobId);
      clearInterval(this.timer);
      this.timer = setInterval(() => this.onAutoRefresh(), 2500);
      document.title = `vidi.js | Job | ${jobId}`;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  onRefresh() {
    const { jobId } = this.props;
    this.onFetch(jobId);
  }

  onAutoRefresh() {
    const { jobDocument = {} } = this.state;
    const { status } = jobDocument;
    if (status === undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
      return;
    }
    if (this.timer && (!RUNNING_STATES.includes(status))) {
      clearInterval(this.timer);
      this.timer = undefined;
      return;
    }
    this.onRefresh();
  }

  onFetch(jobId) {
    const queryParams = { metadata: true };
    try {
      api.getJob({ jobId, queryParams })
        .then((response) => this.setState({ jobDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { jobDocument } = this.state;
    const { jobId, history } = this.props;
    return (
      <>
        <JobTitle
          title={jobId}
          onRefresh={this.onRefresh}
          code={jobDocument}
          priorityDialog={JOB_PRIORITY_DIALOG}
          duplicateDialog={JOB_DUPLICATE_DIALOG}
          abortDialog={JOB_ABORT_DIALOG}
          removeDialog={JOB_REMOVE_DIALOG}
        />
        <JobCard
          jobDocument={jobDocument}
        />
        <JobPriority
          dialogName={JOB_PRIORITY_DIALOG}
          onSuccess={this.onRefresh}
          jobDocument={jobDocument}
        />
        <JobDuplicate
          dialogName={JOB_DUPLICATE_DIALOG}
          onSuccess={(response) => history.push(`/job/${response.data.jobId}`)}
          jobDocument={jobDocument}
        />
        <JobAbort
          dialogName={JOB_ABORT_DIALOG}
          onSuccess={this.onRefresh}
          jobDocument={jobDocument}
        />
        <JobRemove
          dialogName={JOB_REMOVE_DIALOG}
          onSuccess={() => history.push('/job/')}
          jobDocument={jobDocument}
        />
      </>
    );
  }
}

export default withUI(Job);
