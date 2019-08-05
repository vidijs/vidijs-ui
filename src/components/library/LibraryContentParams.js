import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '../ui/ExpansionPanel';
import LibraryContentParamsForm from './LibraryContentParamsForm';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';
import * as formActions from '../../formactions/library';

export const LIBRARY_CONTENT_PARAMS_FORM = 'LIBRARY_CONTENT_PARAMS_FORM';

function LibraryContentParams({
  onSubmit,
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  libraryId,
  expanded,
  onChangeExpansion,
  ...formProps
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    if (onChangeExpansion) { onChangeExpansion(null, false); }
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Library Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={onChangeExpansion}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" color="textSecondary">
          Library Content Display Options
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <LibraryContentParamsForm
          form={LIBRARY_CONTENT_PARAMS_FORM}
          onSubmit={formActions.onGet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          libraryId={libraryId}
          {...formProps}
        />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(LIBRARY_CONTENT_PARAMS_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(LIBRARY_CONTENT_PARAMS_FORM)}
        >
          Update
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withSnackbar, withFormActions)(LibraryContentParams);
