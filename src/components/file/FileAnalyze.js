import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { compose } from 'redux';

import * as formActions from '../../formactions/file';
import FileAnalyzeForm from './FileAnalyzeForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const FILE_ANALYZE_FORM = 'FILE_ANALYZE_FORM';

function FileAnalyze({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  fileDocument,
}) {
  if (fileDocument === undefined) { return null; }
  const { id: fileId } = fileDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Starting Shape Deduction Job';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Starting Shape Deduction Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Run Shape Deduction Job</DialogTitle>
      <DialogContent>
        <FileAnalyzeForm
          form={FILE_ANALYZE_FORM}
          onSubmit={formActions.onFileAnalyze}
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
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(FILE_ANALYZE_FORM)}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(FileAnalyze);
