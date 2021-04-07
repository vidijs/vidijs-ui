import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import GroupForm from './GroupForm';
import WizardForm from '../ui/WizardForm';
import * as formActions from '../../formactions/group';
import withUI from '../../hoc/withUI';

function GroupWizard({
  open,
  onClose,
  onSuccess,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Group Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating Group';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New Group</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={GroupForm}
          documentName="groupDocument"
          onSubmit={formActions.onUpdate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(GroupWizard);
