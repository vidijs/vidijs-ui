import React from 'react';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ProjectionNameForm from './ProjectionNameForm';
import ProjectionForm from './ProjectionForm';
import * as formActions from '../../formactions/projection';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

export const EDIT_PROJECTION_INCOMING_FORM = 'EDIT_PROJECTION_INCOMING_FORM';

function ProjectionCreateIncoming({
  submitForm,
  openSnackBar,
  onClose,
  onSuccess,
  open,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Projection Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Projection';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Incoming Projection</DialogTitle>
      <DialogContent>
        <ProjectionNameForm
          form={EDIT_PROJECTION_INCOMING_FORM}
          onSubmit={formActions.onCreateIncoming}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
        />
        <ProjectionForm
          form={EDIT_PROJECTION_INCOMING_FORM}
          onSubmit={formActions.onCreateIncoming}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
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
          onClick={() => submitForm(EDIT_PROJECTION_INCOMING_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(ProjectionCreateIncoming);
