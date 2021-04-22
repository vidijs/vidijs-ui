import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { configuration as api } from '@vidispine/vdt-api';
import withUI from '../../../hoc/withUI';

function AuthRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeAuthConfiguration()
      .then(() => {
        const messageContent = 'OAuth2 Configuration Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing OAuth2 Configuration';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        Remove All OAuth2 Configuration
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

export default withUI(AuthRemove);
