import React from 'react';

import { taskdefinition as api } from '@vidispine/vdt-api';
import TaskDefinitionTitle from '../components/taskdefinition/TaskDefinitionTitle';
import TaskDefinitionListCard from '../components/taskdefinition/TaskDefinitionListCard';
import TaskDefinitionDialog from '../components/taskdefinition/TaskDefinitionDialog';
import JobTypeRemove from '../components/jobtype/JobTypeRemove';

import withSnackbar from '../hoc/withSnackbar';

const JOBTYPE_REMOVE_MODAL = 'JOBTYPE_REMOVE_MODAL';
const TASKDEFINITION_DIALOG = 'TASKDEFINITION_DIALOG';

class TaskDefinition extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      taskDefinitionListDocument: undefined,
    };
  }

  componentDidMount() {
    const { taskDefinitionType } = this.props;
    this.onRefresh();
    document.title = `vidi.js | Task Definition | ${taskDefinitionType}`;
  }

  onRefresh() {
    const { openSnackBar, taskDefinitionType } = this.props;
    try {
      api.getTaskDefinitionType({ taskDefinitionType })
        .then((response) => this.setState({ taskDefinitionListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Job Type';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { taskDefinitionType, history } = this.props;
    const { taskDefinitionListDocument } = this.state;
    return (
      <>
        <TaskDefinitionTitle
          onRefresh={this.onRefresh}
          taskDefinitionType={taskDefinitionType}
          code={taskDefinitionListDocument}
          codeModal="TaskDefinitionListDocument"
          removeModal={JOBTYPE_REMOVE_MODAL}
          createModal={TASKDEFINITION_DIALOG}
        />
        { taskDefinitionListDocument
          && (
          <TaskDefinitionListCard
            onRefresh={this.onRefresh}
            taskDefinitionListDocument={taskDefinitionListDocument}
          />
          )}
        <JobTypeRemove
          dialogName={JOBTYPE_REMOVE_MODAL}
          jobType={taskDefinitionType}
          onSuccess={() => history.push('/jobtype/')}
        />
        <TaskDefinitionDialog
          dialogName={TASKDEFINITION_DIALOG}
          jobType={taskDefinitionType}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default withSnackbar(TaskDefinition);
