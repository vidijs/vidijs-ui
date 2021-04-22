import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { storage as api } from '@vidispine/vdt-api';

export default function StorageRemove({
  closeModal,
  isOpen,
  storageId,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeStorage({ storageId })
      .then(() => {
        const messageContent = `Storage ${storageId} Removed`;
        openSnackBar({ messageContent });
        history.push('/storage/');
        closeModal();
      })
      .catch(() => {
        const messageContent = 'Error Removing Storage';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Storage "${storageId}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
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
