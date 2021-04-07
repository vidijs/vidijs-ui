import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { externalid as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ExternalIdRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  externalIdentifierDocument,
  entityType,
  entityId,
}) {
  if (externalIdentifierDocument === undefined) { return null; }
  const { externalId } = externalIdentifierDocument;
  const onRemove = () => {
    api.removeExternalId({
      externalId,
      entityType,
      entityId,
    })
      .then(() => {
        const messageContent = `External ID ${externalId} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing External ID';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove External ID "${externalId}"?`}
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

export default withUI(ExternalIdRemove);
