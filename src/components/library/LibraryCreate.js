import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import LibraryForm from './LibraryForm';
import * as formActions from '../../formactions/library';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const LIBRARY_CREATE_FORM = 'LIBRARY_CREATE_FORM';

function LibraryCreate({
  submitForm,
  open,
  onClose,
  onSuccess,
  openSnackBar,
  onFail,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Library Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Library';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Library</DialogTitle>
      <DialogContent>
        <LibraryForm
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          form={LIBRARY_CREATE_FORM}
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
          onClick={() => submitForm(LIBRARY_CREATE_FORM)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(LibraryCreate);
