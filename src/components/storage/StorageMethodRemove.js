import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { storage as api } from '@vidijs/vidijs-api';

export default function StorageMethodRemove({
  closeModal,
  isOpen,
  storageId,
  storageMethodId,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeStorageMethod({ storageId, storageMethodId })
      .then(() => {
        const messageContent = `Storage Method ${storageMethodId} Removed`;
        openSnackBar({ messageContent });
        history.push(`/storage/${storageMethodId}`);
        closeModal();
      })
      .catch(() => {
        const messageContent = 'Error Removing Storage Method';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Storage Method "${storageMethodId}"?`}
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
