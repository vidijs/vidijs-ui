import React from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import JobPoolCard from '../../components/configuration/jobpool/JobPoolCard';
import JobPoolRemove from '../../components/configuration/jobpool/JobPoolRemove';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const JOBPOOL_REMOVE_DIALOG = 'JOBPOOL_REMOVE_DIALOG';

class JobPool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      jobPoolListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | Job Pools';
  }

  onRefresh() {
    try {
      api.getJobPoolConfiguration()
        .then((response) => this.setState({ jobPoolListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Job Pool Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { jobPoolListDocument } = this.state;
    return (
      <>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="Job Pool"
          helpTo="/ref/property.html#job-pool-configuration"
          onRefresh={this.onRefresh}
          code={jobPoolListDocument}
          codeModal="JobPoolListDocument"
          removeModal={JOBPOOL_REMOVE_DIALOG}
        />
        { jobPoolListDocument
        && (
        <JobPoolCard
          jobPoolListDocument={jobPoolListDocument}
          onSuccess={this.onRefresh}
        />
        )}
        <JobPoolRemove
          dialogName={JOBPOOL_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(JobPool);
