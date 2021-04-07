import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TaskDefinitionForm from './TaskDefinitionForm';
import * as formActions from '../../formactions/taskdefinition';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const EDIT_TASKDEFINITION_FORM = 'EDIT_TASKDEFINITION_FORM';

function TaskDefinitionDialog({
  jobType,
  submitForm,
  openSnackBar,
  onClose,
  onSuccess,
  open,
}) {
  const initialValues = { taskDefinitionDocument: { jobType, script: '//' } };
  const onSubmitSuccess = (response) => {
    const { uriListDocument } = response;
    const { uri: uriList } = uriListDocument;
    const newTaskDefinitionId = uriList[0];
    const messageContent = `Step ID ${newTaskDefinitionId} Saved`;
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Saving Step';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        New Step
      </DialogTitle>
      <DialogContent>
        <TaskDefinitionForm
          form={EDIT_TASKDEFINITION_FORM}
          initialValues={initialValues}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(EDIT_TASKDEFINITION_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(TaskDefinitionDialog);
