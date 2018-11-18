import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileDeleteForm from './FileDeleteForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const FILE_DELETE_FORM = 'FILE_DELETE_FORM';

function FileDelete({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  fileDocument,
}) {
  if (fileDocument === undefined) { return null; }
  const { path, id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'File Delete Job Created';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating File Delete Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>{`Delete File ${path || fileId}`}</DialogTitle>
      <DialogContent>
        <FileDeleteForm
          form={FILE_DELETE_FORM}
          onSubmit={formActions.onFileDelete}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          fileId={fileId}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => submitForm(FILE_DELETE_FORM)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileDelete);
