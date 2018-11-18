import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CollectionEntityAddForm from './CollectionEntityAddForm';
import * as formActions from '../../formactions/collection';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const COLLECTION_ENTITY_ADD_FORM = 'COLLECTION_ENTITY_ADD_FORM';

function CollectionEntityAdd({
  submitForm,
  open,
  onClose,
  onSuccess,
  openSnackBar,
  onFail,
  collectionId,
  entityId,
  entityType,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Collection Entity Added';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Adding Collection Entity';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Add Entity To Collection</DialogTitle>
      <DialogContent>
        <CollectionEntityAddForm
          onSubmit={formActions.onAddEntity}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          form={COLLECTION_ENTITY_ADD_FORM}
          collectionId={collectionId}
          entityId={entityId}
          initialValues={{ queryParams: { type: entityType } }}
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
          onClick={() => submitForm(COLLECTION_ENTITY_ADD_FORM)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(CollectionEntityAdd);
