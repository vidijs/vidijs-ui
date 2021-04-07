import { SubmissionError } from 'redux-form';

import { resource as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { resourceId, resourceType } = props;
  const { resourceDocument } = form;
  return api.modifyResource({
    resourceType,
    resourceId,
    resourceDocument,
  })
    .then((response) => ({ resourceDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreate(form, dispatch, props) {
  const { resourceType } = props;
  const { resourceDocument } = form;
  return api.createResource({
    resourceType,
    resourceDocument,
  })
    .then((response) => ({ resourceDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
