import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import JobCreateForm from '../../components/job/JobCreateForm';
import SquareCard from '../../components/ui/SquareCard';
import TitleHeader from '../../components/ui/TitleHeader';
import * as formActions from '../../formactions/job';

import withSnackbar from '../../hoc/withSnackbar';
import withFormActions from '../../hoc/withFormActions';

const JOB_CREATE_FORM = 'JOB_CREATE_FORM';

function JobCreate({
  openSnackBar,
  submitForm,
  initialValues,
  history,
}) {
  const onSubmitSuccess = (response) => {
    const messageContent = 'Job Started';
    openSnackBar({ messageContent });
    history.push(`/job/${response.data.jobId}`);
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Starting Job';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <>
      <TitleHeader
        title="Start Job"
        helpTo="/ref/job.html"
      />
      <SquareCard>
        <CardContent>
          <JobCreateForm
            form={JOB_CREATE_FORM}
            onSubmit={formActions.onCreateJob}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            initialValues={initialValues}
          />
        </CardContent>
        <Divider />
        <DialogActions>
          <Button
            size="small"
            color="primary"
            onClick={() => submitForm(JOB_CREATE_FORM)}
          >
            Start
          </Button>
        </DialogActions>
      </SquareCard>
    </>
  );
}

export default compose(withSnackbar, withFormActions)(JobCreate);
