import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AutoImportRuleForm from './AutoImportRuleForm';
import WizardForm from '../ui/WizardForm';
import * as formActions from '../../formactions/autoimport';
import withUI from '../../hoc/withUI';

function AutoImportRuleDialog({
  open,
  onClose,
  history,
  openSnackBar,
}) {
  const onSubmitSuccess = (response) => {
    const { autoImportRuleDocument } = response;
    const { storage: storageId } = autoImportRuleDocument;
    const messageContent = `Auto Import Rules For ${storageId} Created`;
    openSnackBar({ messageContent });
    history.push(`/auto-import/${storageId}/`);
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Auto Import Rule';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Auto Import Rule</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={AutoImportRuleForm}
          documentName="autoImportRuleDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(AutoImportRuleDialog);
