import { SubmissionError } from 'redux-form';

import { metadata as api } from '@vidispine/vdt-api';
import * as actions from '../actions';

export function onUpdateSimpleMetadataSubmit(form, dispatch, props) {
  const { entityType, entityId } = props;
  const { simpleMetadataDocument, removedKeys = [] } = form;
  const updateMetadata = new Promise((resolve, reject) => api.updateSimpleMetadata({
    entityType,
    entityId,
    simpleMetadataDocument,
  })
    .then(() => resolve())
    .catch(() => reject()));
  const promises = [updateMetadata];
  removedKeys.forEach((thisRemove) => {
    const { key } = thisRemove;
    const removeThisKey = new Promise((resolve, reject) => api.removeSimpleMetadataKey({
      entityType,
      entityId,
      key,
    })
      .then(() => resolve())
      .catch(() => reject()));
    promises.push(removeThisKey);
  });
  return Promise.all(promises)
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateSimpleMetadataSubmitFail(errors, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Error Updating Metadata';
  dispatch(openSnackBar({ messageContent, messageColor: 'secondary' }));
}

export function onUpdateSimpleMetadataSubmitSuccess(response, dispatch) {
  const { openSnackBar } = actions.ui;
  const messageContent = 'Metadata Updated';
  dispatch(openSnackBar({ messageContent }));
}
