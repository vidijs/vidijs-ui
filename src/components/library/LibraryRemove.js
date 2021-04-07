import React from 'react';
import { compose } from 'redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/library';
import LibraryRemoveForm from './LibraryRemoveForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const LIBRARY_REMOVE_FORM = 'LIBRARY_REMOVE_FORM';

function LibraryRemove({
  open,
  onClose,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  libraryId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Library Deleted';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Deleting Library';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>{`Delete Library ${libraryId}`}</DialogTitle>
      <DialogContent>
        <LibraryRemoveForm
          form={LIBRARY_REMOVE_FORM}
          onSubmit={formActions.onRemove}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => submitForm(LIBRARY_REMOVE_FORM)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(LibraryRemove);
