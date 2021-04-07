import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { file as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function FileAbandon({
  open,
  onClose,
  openSnackBar,
  fileDocument,
  onSuccess,
}) {
  if (fileDocument === undefined) { return null; }
  const { path, id: fileId } = fileDocument;
  const onAbandon = () => {
    api.abandonFile({ fileId })
      .then(() => {
        const messageContent = 'File Abandoned';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Abandoned File';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Abandon File ${path || fileId}`}</DialogTitle>
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
          Abandon
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(FileAbandon);
