import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CollectionForm from './CollectionForm';
import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const EDIT_COLLECTION_FORM = 'EDIT_COLLECTION_FORM';

function CollectionCreate({
  submitForm,
  open,
  onClose,
  onSuccess,
  openSnackBar,
  onFail,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Collection Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Creating Collection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Collection</DialogTitle>
      <DialogContent>
        <CollectionForm
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          form={EDIT_COLLECTION_FORM}
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
          onClick={() => submitForm(EDIT_COLLECTION_FORM)}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(CollectionCreate);
