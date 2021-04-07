import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import JobTypeForm from './JobTypeForm';
import * as formActions from '../../formactions/taskdefinition';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const EDIT_JOBTYPE_FORM = 'EDIT_JOBTYPE_FORM';

function JobTypeDialog({
  submitForm,
  openSnackBar,
  onClose,
  onSuccess,
  open,
}) {
  const onSubmitSuccess = (response) => {
    const { jobType } = response;
    const messageContent = `Job Type ${jobType} Created`;
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Job Type';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>
        Create Job Type
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The recommended format of the type is VENDORPREFIX_JOBTYPE.
        </DialogContentText>
        <JobTypeForm
          form={EDIT_JOBTYPE_FORM}
          onSubmit={formActions.onCreateJobType}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
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
          color="primary"
          onClick={() => submitForm(EDIT_JOBTYPE_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(JobTypeDialog);
