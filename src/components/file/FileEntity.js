import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileEntityForm from './FileEntityForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const FILE_ENTITY_FORM = 'FILE_ENTITY_FORM';

function FileEntity({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'File Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating File';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>New File Entity</DialogTitle>
      <DialogContent>
        <FileEntityForm
          form={FILE_ENTITY_FORM}
          onSubmit={formActions.onFileCreateEntity}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
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
          onClick={() => submitForm(FILE_ENTITY_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileEntity);
