import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UserForm from './UserForm';
import WizardForm from '../ui/WizardForm';
import * as formActions from '../../formactions/user';
import withUI from '../../hoc/withUI';

function UserWizard({
  open,
  onClose,
  onSuccess,
  openSnackBar,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'User Created';
    openSnackBar({ messageContent });
    onClose();
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Creating User';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={false}>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <WizardForm
          FormComponent={UserForm}
          documentName="userDocument"
          onSubmit={formActions.onCreate}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          initialValues={{ queryParams: { passwordType: 'raw' } }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withUI(UserWizard);
