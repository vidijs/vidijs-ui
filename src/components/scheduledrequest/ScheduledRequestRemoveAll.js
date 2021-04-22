import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { scheduledrequest as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ScheduledRequestRemoveAll({
  open,
  onClose,
  openSnackBar,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeAllScheduledRequest()
      .then(() => {
        const messageContent = 'All Scheduled Requests Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing All Scheduled Requests';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        Remove All Scheduled Requests
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onRemove}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(ScheduledRequestRemoveAll);
