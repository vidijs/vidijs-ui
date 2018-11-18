import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import QuotaForm from './QuotaForm';
import * as formActions from '../../formactions/quota';
import * as actions from '../../actions';

const EDIT_QUOTA_FORM = 'EDIT_QUOTA_FORM';

function QuotaDialog({
  submitForm,
  closeModal,
  isOpen,
  onRefresh,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { quotaRuleDocument } = response;
    const { id: ruleId } = quotaRuleDocument;
    const messageContent = `Import Settings ${ruleId} Created`;
    openSnackBar({ messageContent });
    closeModal();
    onRefresh();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Quota';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  const initialValues = {
    quotaRuleDocument: {
      resource: [{}],
    },
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={false}>
      <DialogTitle>New Quota</DialogTitle>
      <DialogContent>
        <QuotaForm
          form={EDIT_QUOTA_FORM}
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
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
          onClick={() => submitForm(EDIT_QUOTA_FORM)}
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

export default connect(null, mapDispatchToProps)(QuotaDialog);
