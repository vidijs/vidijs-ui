import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { collection as api } from '@vidispine/vdt-api';
import withUI from '../../hoc/withUI';

function CollectionRemove({
  open,
  onClose,
  openSnackBar,
  onSuccess,
  onFail,
  collectionId,
}) {
  if (collectionId === undefined) { return null; }
  const onRemove = () => {
    api.removeCollection({ collectionId })
      .then(() => {
        const messageContent = 'Collection Removed';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        const messageContent = 'Error Removing Collection';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onFail) { onFail(); }
      });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>{`Remove Collection ${collectionId}`}</DialogTitle>
      <DialogContent>This does not affect any entities within the collection.</DialogContent>
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

export default withUI(CollectionRemove);
