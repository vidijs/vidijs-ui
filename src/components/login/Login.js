import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '../ui/ExpansionPanel';

import LoginForm from './LoginForm';
import LoginFormAdvanced from './LoginFormAdvanced';
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ padding: 0 }}>
            <Typography variant="body2" color="textSecondary">
              Advanced
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: 0 }}>
            <LoginFormAdvanced
              form={LOGIN_FORM}
              onSubmit={formActions.onGetToken}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              {...formProps}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
    </React.Fragment>
  );
}

export default compose(withUI, withFormActions)(Login);
