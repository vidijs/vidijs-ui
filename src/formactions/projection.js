import { SubmissionError } from 'redux-form';

import { projection as api } from '@vidijs/vidijs-api';

export function onUpdateOutgoing(form, dispatch, props) {
  const { projectionId } = props;
  const { projectionDocument } = form;
  return api.updateProjectionOutgoing({
    projectionId,
    projectionDocument,
  })
    .then(() => ({ projectionDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateIncoming(form, dispatch, props) {
  const { projectionId } = props;
  const { projectionDocument } = form;
  return api.updateProjectionIncoming({
    projectionId,
    projectionDocument,
  })
    .then(() => ({ projectionDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateOutgoing(form) {
  const { projectionDocument, projectionId } = form;
  return api.updateProjectionOutgoing({
    projectionId,
    projectionDocument,
  })
    .then(() => ({ projectionId, projectionDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateIncoming(form) {
  const { projectionDocument, projectionId } = form;
  return api.updateProjectionIncoming({
    projectionId,
    projectionDocument,
  })
    .then(() => ({ projectionDocument, projectionId }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
