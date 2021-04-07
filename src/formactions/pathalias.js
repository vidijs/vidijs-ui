import { SubmissionError } from 'redux-form';
import { configuration as api } from '@vidijs/vidijs-api';

import * as actions from '../actions';

export function onSubmit(form) {
  return api.updatePathAliasConfiguration({ pathAliasConfigurationDocument: form })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSubmitFail(errors, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Error Updating Path Alias';
  dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
}

export function onSubmitSuccess(response, dispatch) {
  const { receivePathAlias } = actions.pathalias;
  const { openSnackBar } = actions.ui;
  api.getPathAliasConfiguration()
    .then((r) => r.json())
    .then((pathAliasConfigurationDocument) => {
      dispatch(receivePathAlias({ pathAliasConfigurationDocument }));
    });
  const messageContent = 'Path Alias Updated';
  dispatch(openSnackBar({ messageContent }));
}
