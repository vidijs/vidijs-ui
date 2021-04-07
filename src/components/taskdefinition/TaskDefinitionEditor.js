import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

import * as formActions from '../../formactions/taskdefinition';
import TaskDefinitionDisplay from './TaskDefinitionDisplay';
import TaskDefinitionForm from './TaskDefinitionForm';
import TaskDefinitionRemove from './TaskDefinitionRemove';

import Editor from '../ui/Editor';
import withUI from '../../hoc/withUI';

function TaskDefinitionEditor({
  taskDefinitionDocument,
  openSnackBar,
  onRefresh,
  onOpen,
}) {
  const { id: taskId, step, description } = taskDefinitionDocument;
  const EDIT_TASKDEFINTION_FORM = `EDIT_TASKDEFINTION_FORM_${taskId}`;
  const TASKDEFINITION_REMOVE = `TASKDEFINITION_REMOVE_${taskId}`;
  const onSubmitSuccess = () => {
    const messageContent = 'Task Definition Saved';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Task Definition';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const displayProps = { taskDefinitionDocument };
  const initialValues = { taskDefinitionDocument };
  return (
    <>
      <Editor
        title={`Step ${step}${description ? ` - ${description}` : ''}`}
        formName={EDIT_TASKDEFINTION_FORM}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitFail={onSubmitFail}
        onSubmit={formActions.onUpdate}
        displayProps={displayProps}
        initialValues={initialValues}
        displayComponent={TaskDefinitionDisplay}
        formComponent={TaskDefinitionForm}
        iconList={(
          <IconButton onClick={() => onOpen({ modalName: TASKDEFINITION_REMOVE })}>
            <DeleteForever />
          </IconButton>
        )}
      />
      <TaskDefinitionRemove
        dialogName={TASKDEFINITION_REMOVE}
        taskDefinitionDocument={taskDefinitionDocument}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withUI(TaskDefinitionEditor);
