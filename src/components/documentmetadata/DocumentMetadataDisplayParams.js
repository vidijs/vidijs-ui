import React from 'react';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import ExpansionPanel from '../ui/ExpansionPanel';
import DocumentMetadataDisplayParamsForm from './DocumentMetadataDisplayParamsForm';
import * as formActions from '../../formactions/documentmetadata';
import withFormActions from '../../hoc/withFormActions';
import withSnackbar from '../../hoc/withSnackbar';

export const DISPLAY_DOCUMENT_FORM = 'DISPLAY_DOCUMENT_FORM';

function DocumentMetadataDisplayParams({
  onSuccess,
  onFail,
  openSnackBar,
  submitForm,
  resetForm,
  documentMetadataName,
}) {
  const onSubmitSuccess = (response, dispatch, props) => {
    const messageContent = 'Display Updated';
    openSnackBar({ messageContent });
    if (onSuccess) { onSuccess(response, dispatch, props); }
  };
  const onSubmitFail = (error, dispatch, props) => {
    const messageContent = 'Error Updating Display';
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (onFail) { onFail(error, dispatch, props); }
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>Display Options</ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <DocumentMetadataDisplayParamsForm
          form={DISPLAY_DOCUMENT_FORM}
          onSubmit={formActions.onGet}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={onSubmitFail}
          documentMetadataName={documentMetadataName}
        />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => resetForm(DISPLAY_DOCUMENT_FORM)}
        >
          Reset
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => submitForm(DISPLAY_DOCUMENT_FORM)}
        >
          Update
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

export default compose(withSnackbar, withFormActions)(DocumentMetadataDisplayParams);
