import React from 'react';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '../ui/ExpansionPanel';
import AccessControlMergedParamsForm from './AccessControlMergedParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/access';

export const ACCESS_PARAMS_FORM = 'ACCESS_PARAMS_FORM';

function AccessControlMergedParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  entityType,
  entityId,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Access Control Merged Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" color="textSecondary">
          Access Control Merged Options
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs>
            <AccessControlMergedParamsForm
              form={ACCESS_PARAMS_FORM}
              onSubmit={formActions.onGet}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitFail={onSubmitFail}
              entityType={entityType}
              entityId={entityId}
              {...formProps}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(ACCESS_PARAMS_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(ACCESS_PARAMS_FORM)}
        >
          Update
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withSnackbar, withFormActions)(AccessControlMergedParams);
