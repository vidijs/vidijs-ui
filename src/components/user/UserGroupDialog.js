import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import * as formActions from '../../formactions/user';
import UserGroupForm from './UserGroupForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import DialogContent from '../ui/DialogContent';

const USER_GROUP_FORM = 'USER_GROUP_FORM';

function UserGroupDialog({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  userName,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Groups Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
    onClose();
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Adding Groups';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      <DialogTitle>Add User To Groups</DialogTitle>
      <DialogContent>
        <UserGroupForm
          form={USER_GROUP_FORM}
          onSubmit={formActions.onUpdateGroups}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          onCancel={onClose}
          userName={userName}
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
          onClick={() => submitForm(USER_GROUP_FORM)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withUI, withFormActions)(UserGroupDialog);
