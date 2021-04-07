import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Accordion from '../ui/Accordion';

import LoginForm from './LoginForm';
import LoginFormAdvanced from './LoginFormAdvanced';
import * as formActions from '../../formactions/user';
import { withSnackbarNoRouter } from '../../hoc/withSnackbar';
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
    <>
      <DialogContent>
        <LoginForm
          form={LOGIN_FORM}
          onSubmit={formActions.onGetUserToken}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          {...formProps}
        />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: 0 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Advanced
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <LoginFormAdvanced
              form={LOGIN_FORM}
              onSubmit={formActions.onGetUserToken}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              {...formProps}
            />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => submitForm(LOGIN_FORM)}
          fullWidth
        >
          Log In
        </Button>
      </DialogActions>
    </>
  );
}

export default compose(withSnackbarNoRouter, withFormActions)(Login);
