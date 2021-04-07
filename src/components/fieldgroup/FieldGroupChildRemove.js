import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { fieldgroup as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function FieldGroupChildRemove({
  open,
  onClose,
  openSnackBar,
  groupName,
  childGroupName,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeFieldGroupChild({ groupName, childGroupName })
      .then(() => {
        const messageContent = `${childGroupName} Removed From ${groupName}`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Group';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove "${childGroupName}" From "${groupName}"?`}
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

export default withUI(FieldGroupChildRemove);
