import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { storagegroup as api } from '@vidispine/vdt-api';

export default function StorageGroupRemove({
  closeModal,
  isOpen,
  groupName,
  storageId,
  onRefresh,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeStorageGroupStorage({ groupName, storageId })
      .then(() => {
        const messageContent = `Storage ${storageId} Removed`;
        openSnackBar({ messageContent });
        closeModal();
        onRefresh();
      })
      .catch(() => {
        const messageContent = 'Error Removing Storage';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Storage "${storageId}" From Storage Group "${groupName}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This operation does not delete the actual storages.
        </DialogContentText>
      </DialogContent>
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
