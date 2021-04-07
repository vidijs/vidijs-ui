import React from 'react';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import TextGrid from '../ui/TextGrid';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

function VxaDialog({
  open,
  onClose,
  vxaConfiguration,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>
        New Agent Configuration
      </DialogTitle>
      <DialogContent>
        <TextGrid
          value={vxaConfiguration}
          variant="code"
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(VxaDialog);
