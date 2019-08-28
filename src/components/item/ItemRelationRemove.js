import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ItemRelationRemove({
  onClose,
  isOpen,
  relationId,
  onRemove,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Relation ${relationId} ?`}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={onRemove(relationId)}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
