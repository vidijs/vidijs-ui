import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { documentmetadata as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function DocumentMetadataRemove({
  open,
  onClose,
  openSnackBar,
  documentMetadataName,
  onSuccess,
  onFail,
}) {
  const onRemove = () => {
    api.removeDocumentMetadata({ documentMetadataName })
      .then(() => {
        const messageContent = 'Document Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Document';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onFail) { onFail(); }
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Document ${documentMetadataName}`}</DialogTitle>
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

export default withUI(DocumentMetadataRemove);
