import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { storage as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function StorageEvacuate({
  open,
  onClose,
  openSnackBar,
  storageDocument,
  onSuccess,
}) {
  if (storageDocument === undefined) { return null; }
  const { id: storageId } = storageDocument;
  const onAbandon = () => {
    api.startEvacuateStorage({ storageId })
      .then(() => {
        const messageContent = 'Storage Evacuation Started';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Starting Storage Evacuation';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Evacuate Storage ${storageId}`}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onAbandon}
          color="secondary"
          autoFocus
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(StorageEvacuate);
