import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { service as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ServiceDisable({
  open,
  onClose,
  openSnackBar,
  serviceName,
  onSuccess,
}) {
  const onRemove = () => {
    api.disableService({ serviceName })
      .then(() => {
        const messageContent = `Service ${serviceName} Disabled`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Disabling Service';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Disable Service "${serviceName}"?`}
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
          Disable
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(ServiceDisable);
