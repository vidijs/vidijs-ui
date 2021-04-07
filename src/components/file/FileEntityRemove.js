import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { file as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function FileEntityRemove({
  open,
  onClose,
  openSnackBar,
  fileDocument,
  onSuccess,
}) {
  if (fileDocument === undefined) { return null; }
  const { id: fileId } = fileDocument;
  const onRemove = () => {
    api.removeFileEntity({ fileId })
      .then(() => {
        const messageContent = 'File Entity Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing File Entity';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove File ${fileId} Entity`}</DialogTitle>
      <DialogContent>This does not affect the physical file.</DialogContent>
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

export default withUI(FileEntityRemove);
