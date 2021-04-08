import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { deletionlock as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function DeletionLockRemove({
  open,
  onClose,
  openSnackBar,
  lockId,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeDeletionLock({ lockId })
      .then(() => {
        const messageContent = `Deletion Lock ${lockId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Deletion Lock';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Deletion Lock "${lockId}"?`}
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

export default withUI(DeletionLockRemove);
