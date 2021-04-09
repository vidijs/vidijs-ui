import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/user';
import UserPasswordForm from './UserPasswordForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const USER_PASSWORD_FORM = 'USER_PASSWORD_FORM';

function UserPassword({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  userName,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Password Changed';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Changing Password';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <UserPasswordForm
          form={USER_PASSWORD_FORM}
          onSubmit={formActions.onUpdatePassword}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          userName={userName}
          initialValues={{ queryParams: { type: 'raw' } }}
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
          onClick={() => submitForm(USER_PASSWORD_FORM)}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(UserPassword);
