import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import startCase from 'lodash.startcase';

import { resource as api } from '@vidispine/vdt-api';

export default function ResourceRemove({
  closeModal,
  isOpen,
  resourceId,
  resourceType,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeResource({ resourceId, resourceType })
      .then(() => {
        const messageContent = `${resourceType} ${resourceId} Removed`;
        openSnackBar({ messageContent });
        history.push(`/resource/${resourceType}`);
        closeModal();
      })
      .catch(() => {
        const messageContent = 'Error Removing Resource';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove ${startCase(resourceType)} "${resourceId}"?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
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
