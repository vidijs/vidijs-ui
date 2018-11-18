import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import LibraryItemMetadataForm from './LibraryItemMetadataForm';
import * as formActions from '../../formactions/library';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

export const LIBRARY_ITEM_METADATA_FORM = 'LIBRARY_ITEM_METADATA_FORM';

function LibraryItemMetadata({
  submitForm,
  open,
  onClose,
  onSuccess,
  openSnackBar,
  onFail,
  libraryId,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Item Metadata Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Item Metadata';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>Update Item Metadata</DialogTitle>
      <DialogContent>
        <LibraryItemMetadataForm
          onSubmit={formActions.onUpdateItemMetadata}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
          form={LIBRARY_ITEM_METADATA_FORM}
          initialValues={{
            metadataDocument: {
              timespan: [{
                start: '-INF',
                end: '+INF',
              }],
            },
          }}
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
          onClick={() => submitForm(LIBRARY_ITEM_METADATA_FORM)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default compose(withUI, withFormActions)(LibraryItemMetadata);
