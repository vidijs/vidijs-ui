import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'redux';

import * as formActions from '../../formactions/scheduledrequest';
import ScheduledRequestFilterForm from './ScheduledRequestFilterForm';
import withFormActions from '../../hoc/withFormActions';
import withUI from '../../hoc/withUI';

function ScheduledRequestFilter({
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  resetForm,
  form,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Listing Scheduled Requests';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <>
      <CardContent>
        <ScheduledRequestFilterForm
          form={form}
          onSubmit={formActions.onListScheduledRequest}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </CardContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          onClick={() => resetForm(form)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(form)}
        >
          Filter
        </Button>
      </DialogActions>
    </>
  );
}

export default compose(withUI, withFormActions)(ScheduledRequestFilter);
