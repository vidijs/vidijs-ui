import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { autoimport as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function AutoImportRuleRemove({
  open,
  onClose,
  storageId,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeAutoImport({ storageId })
      .then(() => {
        const messageContent = `Auto Import Rule ${storageId} Removed`;
        openSnackBar({ messageContent });
        history.push('/auto-import/');
        onClose();
      })
      .catch(() => {
        const messageContent = 'Error Removing Storage Group';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Auto Import Rule From "${storageId}"?`}
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

export default withUI(AutoImportRuleRemove);
