import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'redux';

import * as formActions from '../../formactions/transfer';
import TransferFilterForm from './TransferFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

function TransferFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'TRANSFER_FILTER_FORM',
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Transfers';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <>
      <CardContent>
        <TransferFilterForm
          form={form}
          onSubmit={formActions.onTransferList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ queryParams: { state: 'FINISHED' } }}
        />
      </CardContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Filter
        </Button>
      </DialogActions>
    </>
  );
}

export default compose(withUI, withFormActions)(TransferFilter);
