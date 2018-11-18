import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AccessControlForm from './AccessControlForm';
import * as formActions from '../../formactions/access';
import * as actions from '../../actions';

const EDIT_ACCESSCONTROL_FORM = 'EDIT_ACCESSCONTROL_FORM';

function AccessControlDialog({
  submitForm,
  closeModal,
  isOpen,
  onRefresh,
  openSnackBar,
  entityType,
  entityId,
}) {
  const onSubmitSuccess = () => {
    const messageContent = 'Access Control Created';
    openSnackBar({ messageContent });
    if (onRefresh) { onRefresh(); }
    closeModal();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Access Control';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const initialValues = {
    queryParams: {
      allowDuplicate: true,
    },
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>Create Access Control</DialogTitle>
      <DialogContent>
        <AccessControlForm
          form={EDIT_ACCESSCONTROL_FORM}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          entityType={entityType}
          entityId={entityId}
          initialValues={initialValues}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          onClick={closeModal}
        >
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(EDIT_ACCESSCONTROL_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = {
  submitForm: submit,
  openSnackBar: actions.ui.openSnackBar,
};

export default connect(null, mapDispatchToProps)(AccessControlDialog);
