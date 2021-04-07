import React from 'react';

import { taskdefinition as api } from '@vidispine/vdt-api';
import JobTypeDialog from '../components/jobtype/JobTypeDialog';
import JobTypeListCard from '../components/jobtype/JobTypeListCard';
import JobTypeListTitle from '../components/jobtype/JobTypeListTitle';

import withSnackbar from '../hoc/withSnackbar';

const JOBTYPE_CREATE_MODAL = 'JOBTYPE_CREATE_MODAL';

class JobTypeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: null,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Job Type';
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listJobType()
        .then((response) => this.setState({ uriListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Job Type List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { history } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        <JobTypeListTitle
          createModal={JOBTYPE_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
        />
        { uriListDocument
        && (
        <JobTypeListCard
          uriListDocument={uriListDocument}
        />
        )}
        <JobTypeDialog
          dialogName={JOBTYPE_CREATE_MODAL}
          onSuccess={({ jobType }) => history.push(`/task-definition/jobtype/${jobType}/`)}
        />
      </>
    );
  }
}

export default withSnackbar(JobTypeList);
