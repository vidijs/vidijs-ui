import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { taskdefinition as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function TaskDefinitionRemove({
  open,
  onClose,
  openSnackBar,
  taskDefinitionDocument,
  onSuccess,
}) {
  const { step, jobType } = taskDefinitionDocument;
  const onRemove = () => {
    api.removeTaskDefinitionStep({ taskDefinitionType: jobType, taskDefinitionStep: step })
      .then(() => {
        const messageContent = `Step ${step} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Step';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Step ${step}`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={onRemove}
          color="secondary"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(TaskDefinitionRemove);
