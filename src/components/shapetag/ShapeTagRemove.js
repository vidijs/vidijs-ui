import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { shapetag as api } from '@vidispine/vdt-api';

export default function ShapeTagRemove({
  closeModal,
  isOpen,
  tagName,
  history,
  openSnackBar,
}) {
  const onRemove = () => {
    api.removeShapeTag({ tagName })
      .then(() => {
        const messageContent = `Shape Tag ${tagName} Removed`;
        openSnackBar({ messageContent });
        history.push('/shape-tag/');
        closeModal();
      })
      .catch(() => {
        const messageContent = 'Error Removing Shape Tag';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Shape Tag "${tagName}"?`}
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
