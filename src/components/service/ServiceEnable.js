import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { service as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ServiceEnable({
  open,
  onClose,
  openSnackBar,
  serviceName,
  onSuccess,
}) {
  const onRemove = () => {
    api.enableService({ serviceName })
      .then(() => {
        const messageContent = `Service ${serviceName} Enabled`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Enabling Service';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Enable Service "${serviceName}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onRemove}
          color="primary"
          autoFocus
        >
          Enable
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(ServiceEnable);
