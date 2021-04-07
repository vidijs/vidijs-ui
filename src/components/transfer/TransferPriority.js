import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/transfer';
import TransferPriorityForm from './TransferPriorityForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const TRANSFER_PRIORITY_FORM = 'TRANSFER_PRIORITY_FORM';

function TransferPriority({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  transferDocument,
}) {
  if (transferDocument === undefined) { return null; }
  const { name: transferId, priority } = transferDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Transfer Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Transfer';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Change Transfer Priority</DialogTitle>
      <DialogContent>
        <TransferPriorityForm
          form={TRANSFER_PRIORITY_FORM}
          onSubmit={formActions.onUpdateTransferPriority}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          transferId={transferId}
          initialValues={{ priority }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(TRANSFER_PRIORITY_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(TransferPriority);
