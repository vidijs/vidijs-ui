import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { group as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function UserGroupRemove({
  open,
  onClose,
  openSnackBar,
  groupName,
  userName,
  onSuccess,
}) {
  const onRemove = () => {
    api.removeGroupUser({ groupName, userName })
      .then(() => {
        const messageContent = `${userName} Removed From ${groupName}`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing User From Group';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove "${userName}" From "${groupName}"?`}
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

export default withUI(UserGroupRemove);
