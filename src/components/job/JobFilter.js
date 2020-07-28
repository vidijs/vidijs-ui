import React from 'react';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '../ui/ExpansionPanel';
import * as formActions from '../../formactions/job';
import JobFilterForm from './JobFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';


function JobFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form = 'JOB_FILTER_FORM',
  changeForm,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Jobs';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const onClick = async () => {
    await changeForm(form, 'matrixParams.first', 0);
    submitForm(form);
  };
  const initialValues = {
    matrixParams: {
      first: 0,
      number: 10,
      sort: ['jobId desc'],
      user: false,
    },
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" color="textSecondary">
          Job List Options
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <JobFilterForm
          form={form}
          onSubmit={formActions.onJobList}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          destroyOnUnmount={false}
          initialValues={initialValues}
        />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={onClick}
        >
          Filter
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withUI, withFormActions)(JobFilter);
