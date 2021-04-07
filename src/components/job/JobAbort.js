import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/job';
import JobAbortForm from './JobAbortForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const JOB_ABORT_FORM = 'JOB_ABORT_FORM';

function JobAbort({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  jobDocument,
}) {
  if (jobDocument === undefined) { return null; }
  const { jobId } = jobDocument;
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Job Abort Requested';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Updating Aborting Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>{`Abort Job ${jobId}`}</DialogTitle>
      <DialogContent>
        <JobAbortForm
          form={JOB_ABORT_FORM}
          onSubmit={formActions.onAbortJob}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          jobId={jobId}
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
          color="secondary"
          onClick={() => submitForm(JOB_ABORT_FORM)}
        >
          Abort
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(JobAbort);
