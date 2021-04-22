import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { job as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function JobRemove({
  open,
  onClose,
  openSnackBar,
  jobDocument,
  onSuccess,
}) {
  if (jobDocument === undefined) { return null; }
  const { jobId } = jobDocument;
  const onRemove = () => {
    const queryParams = { id: jobId };
    api.deleteJob({ queryParams })
      .then(() => {
        const messageContent = `Job ${jobId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Job';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Job ${jobId}?`}
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

export default withUI(JobRemove);
