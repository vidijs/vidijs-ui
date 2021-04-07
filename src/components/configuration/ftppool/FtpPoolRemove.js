import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { configuration as api } from '@vidispine/vdt-api';
import withUI from '../../../hoc/withUI';

function FtpPoolRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeFtpPoolConfiguration()
      .then(() => {
        const messageContent = 'FTP Pool Configuration Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing FTP Pool Configuratio';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        Remove All FTP Pool Configuration
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

export default withUI(FtpPoolRemove);
