import React from 'react';
import startCase from 'lodash.startcase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { storagerule as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function StorageRuleRemove({
  open,
  onClose,
  openSnackBar,
  storageRuleDocument,
  onSuccess,
}) {
  if (storageRuleDocument === undefined) { return null; }
  const { appliesTo = {}, id: tagName } = storageRuleDocument;
  const { type, id: entityId } = appliesTo;
  const entityType = type.toLowerCase();
  let onRemove;
  if (type === 'GENERIC') {
    onRemove = () => {
      api.removeStorageRuleShapeTag({ tagName: entityId })
        .then(() => {
          const messageContent = 'Storage Rule Removed';
          openSnackBar({ messageContent });
          onClose();
          if (onSuccess) { onSuccess(); }
        })
        .catch(() => {
          const messageContent = 'Error Removing Storage Rule';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  } else if (tagName === 'default') {
    onRemove = () => {
      api.removeEntityStorageRule({ entityType, entityId })
        .then(() => {
          const messageContent = 'Storage Rule Removed';
          openSnackBar({ messageContent });
          onClose();
          if (onSuccess) { onSuccess(); }
        })
        .catch(() => {
          const messageContent = 'Error Removing Storage Rule';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  } else {
    onRemove = () => {
      api.removeEntityStorageRuleTag({ entityType, entityId, tagName })
        .then(() => {
          const messageContent = 'Storage Rule Removed';
          openSnackBar({ messageContent });
          onClose();
          if (onSuccess) { onSuccess(); }
        })
        .catch(() => {
          const messageContent = 'Error Removing Storage Rule';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Storage Rule ${startCase(entityType)} For ${entityId} On ${tagName}`}</DialogTitle>
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

export default withUI(StorageRuleRemove);
