import { SubmissionError } from 'redux-form';

import { access as api } from '@vidispine/vdt-api';

export function onUpdateImportAccessGroup(form, dispatch, props) {
  const { groupName, queryParams } = form;
  const { userName } = props;
  const headers = { RunAs: userName };
  return api.updateImportAccessGroup({
    groupName,
    queryParams,
    headers,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreate(form, dispatch, props) {
  const { accessControlDocument, queryParams } = form;
  const { entityId, entityType } = props;
  return api.createEntityAccess({
    entityType,
    entityId,
    queryParams,
    accessControlDocument,
  })
    .then((response) => ({ accessControlDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGet(form, dispatch, props) {
  const { queryParams = {} } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return api.getEntityAccessMerged({
    entityType,
    entityId,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
