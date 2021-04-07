import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { externalid as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function ExternalIdNamespaceRemove({
  open,
  onClose,
  openSnackBar,
  externalIdentifierNamespaceDocument,
  onSuccess,
}) {
  if (externalIdentifierNamespaceDocument === undefined) { return null; }
  const { name: idName } = externalIdentifierNamespaceDocument;
  const onRemove = () => {
    api.removeExternalIdNamespace({ idName })
      .then(() => {
        const messageContent = `External ID Namespace ${idName} Removed`;
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing External ID Namespace';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove External ID Namespace "${idName}"?`}
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

export default withUI(ExternalIdNamespaceRemove);
