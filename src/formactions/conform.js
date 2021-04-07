import { SubmissionError } from 'redux-form';

import { conform as api } from '@vidijs/vidijs-api';
import * as actions from '../actions';

export function onCreateSubmit(form) {
  const { conformRequestDocument, queryParams } = form;
  return api.createConform({
    conformRequestDocument,
    queryParams,
  })
    .then((response) => response.json())
    .then((jobDocument) => ({ jobDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateSubmitFail(errors, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Error Creating Conform Job';
  dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
}

export function onCreateSubmitSuccess(response, dispatch) {
  const { jobDocument } = response;
  const { jobId } = jobDocument;
  const { openSnackBar } = actions.ui;
  const messageContent = `Job ${jobId} Created`;
  dispatch(openSnackBar({ messageContent }));
}
