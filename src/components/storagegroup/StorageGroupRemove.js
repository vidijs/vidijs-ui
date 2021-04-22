import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { storagegroup as api } from '@vidispine/vdt-api';

export default function StorageGroupRemove({
  closeModal,
  isOpen,
  groupName,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeStorageGroup({ groupName })
      .then(() => {
        const messageContent = `Storage Group ${groupName} Removed`;
        openSnackBar({ messageContent });
        history.push('/storage-group/');
        closeModal();
      })
      .catch(() => {
        const messageContent = 'Error Removing Storage Group';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Storage Group "${groupName}"?`}
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
