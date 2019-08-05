import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ImportSettingsRemove({
  closeModal,
  isOpen,
  settingsId,
  onRemove,
}) {
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Remove Import Settings "${settingsId}"?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This may affect access to future imports.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={() => onRemove({ settingsId })}
          color="secondary"
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
