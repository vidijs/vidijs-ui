import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { noauth as api } from '@vidispine/vdt-api';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import { withSnackbarNoRouter } from '../../hoc/withSnackbar';
import DialogContent from '../ui/DialogContent';

function InitDialog({
  open = false,
  onClose,
  onSuccess,
  onError,
  openSnackBar,
  loadingInit,
  setLoadingInit,
}) {
  const handleInit = () => {
    setLoadingInit(true);
    api.createInit()
      .then(() => {
        setLoadingInit(false);
        const messageContent = 'Init Success';
        openSnackBar({ messageContent });
        onClose();
        if (onSuccess) { onSuccess(); }
      })
      .catch(() => {
        setLoadingInit(false);
        const messageContent = 'Error Running Init';
        openSnackBar({ messageContent, messageColor: 'secondary' });
        if (onError) { onError(); }
      });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
    >
      <DialogTitle>Run API Init?</DialogTitle>
      <DialogContent>This is required for new Vidispine installations.</DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="inherit"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleInit}
          disabled={loadingInit}
        >
          {loadingInit ? <CircularProgress color="primary" size={16} /> : 'Run'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withSnackbarNoRouter)(InitDialog);
