import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CollectionRenameForm from './CollectionRenameForm';
import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const COLLECTION_RENAME_FORM = 'COLLECTION_RENAME_FORM';

function CollectionRename({
  submitForm,
  open,
  onClose,
  onSuccess,
  openSnackBar,
  onFail,
  collectionId,
  collectionDocument = {},
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Collection Name Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Collection Name';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  const { name } = collectionDocument;
  const initialValues = { queryParams: { name } };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Rename Collection</DialogTitle>
      <DialogContent>
        <CollectionRenameForm
          onSubmit={formActions.onRename}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          form={COLLECTION_RENAME_FORM}
          collectionId={collectionId}
          initialValues={initialValues}
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
          onClick={() => submitForm(COLLECTION_RENAME_FORM)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(CollectionRename);
