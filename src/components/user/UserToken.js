import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';

import * as formActions from '../../formactions/user';
import UserTokenForm from './UserTokenForm';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';
import Dialog from '../ui/Dialog';
import DialogContent from '../ui/DialogContent';

const USER_TOKEN_FORM = 'USER_TOKEN_FORM';


function UserToken({
  open,
  onClose,
  onSuccess,
  openSnackBar,
  submitForm,
  userName,
  userToken,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'New Token Generated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = () => {
    const messageContent = 'Error Generating Token';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
    >
      {userToken ?
        <React.Fragment>
          <DialogTitle>Current Token</DialogTitle>
          <DialogContent>
            {userToken}
          </DialogContent>
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
              onClick={() => onSuccess({ data: undefined })}
            >
              Generate New
            </Button>
          </DialogActions>
        </React.Fragment>
        :
        <React.Fragment>
          <DialogTitle>Generate Token</DialogTitle>
          <DialogContent>
            <UserTokenForm
              form={USER_TOKEN_FORM}
              onSubmit={formActions.onGetToken}
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
              onClick={() => submitForm(USER_TOKEN_FORM)}
            >
              Generate
            </Button>
          </DialogActions>
        </React.Fragment>
      }
    </Dialog>
  );
}


export default compose(withUI, withFormActions)(UserToken);
