import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import withUI from '../../hoc/withUI';
import ScheduledRequestDetail from './ScheduledRequestDetail';

function ScheduledRequestDialog({
  open,
  onClose,
  scheduledRequestType,
  openSnackBar,
}) {
  if (!scheduledRequestType) return null;
  const { id: requestId } = scheduledRequestType;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        {`Scheduled Request ${requestId}`}
      </DialogTitle>
      <DialogContent>
        <ScheduledRequestDetail
          scheduledRequestType={scheduledRequestType}
          openSnackBar={openSnackBar}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withUI(ScheduledRequestDialog);
