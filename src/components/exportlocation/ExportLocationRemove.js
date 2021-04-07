import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { exportlocation as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ExportLocationRemove({
  open,
  onClose,
  history,
  openSnackBar,
  locationName,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeExportLocation({ locationName })
      .then(() => {
        const messageContent = `Export Location ${locationName} Removed`;
        openSnackBar({ messageContent });
        history.push('/export-location/');
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Export Location';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Export Location "${locationName}"?`}
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

export default withUI(ExportLocationRemove);
