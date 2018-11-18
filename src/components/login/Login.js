import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import LoginForm from './LoginForm';
import * as formActions from '../../formactions/user';
import withUI from '../../hoc/withUI';
import withFormActions from '../../hoc/withFormActions';

const LOGIN_FORM = 'LOGIN_FORM';

function Login({
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Login Success';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Logging In';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <React.Fragment>
      <DialogContent>
        <LoginForm
          form={LOGIN_FORM}
          onSubmit={formActions.onGetToken}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => submitForm(LOGIN_FORM)}
        >
          Log In
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default compose(withUI, withFormActions)(Login);
