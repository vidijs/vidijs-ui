import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { vxa as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function VxaRemove({
  open,
  onClose,
  openSnackBar,
  vxaDocument,
  onSuccess,
}) {
  if (vxaDocument === undefined) { return null; }
  const { uuid: vxaUuid } = vxaDocument;
  const onRemove = () => {
    api.removeVxa({ vxaUuid })
      .then(() => {
        const messageContent = 'Agent Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Agent';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Agent ${vxaUuid}`}</DialogTitle>
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

export default withUI(VxaRemove);
