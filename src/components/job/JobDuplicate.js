import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/job';
import JobPriorityForm from './JobPriorityForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const JOB_DUPLICATE_FORM = 'JOB_DUPLICATE_FORM';

function JobDuplicate({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  jobDocument,
}) {
  if (jobDocument === undefined) { return null; }
  const { jobId, priority } = jobDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Duplicated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Duplicating Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>{`Duplicate Job ${jobId}`}</DialogTitle>
      <DialogContent>
        <JobPriorityForm
          form={JOB_DUPLICATE_FORM}
          onSubmit={formActions.onDuplicateJob}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          jobId={jobId}
          initialValues={{ queryParams: { priority } }}
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
          onClick={() => submitForm(JOB_DUPLICATE_FORM)}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(JobDuplicate);
