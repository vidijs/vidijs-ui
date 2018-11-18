import { SubmissionError } from 'redux-form';

import { externalid as api } from '@vidijs/vidijs-api';

export function onUpdateNamespace(form, dispatch, props) {
  const { externalIdentifierNamespaceDocument } = form;
  const idName = props.idName || externalIdentifierNamespaceDocument.name;
  return api.updateExternalIdNamespace({
    idName,
    externalIdentifierNamespaceDocument,
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
  const { externalId } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  return api.createExternalId({
    externalId,
    entityId,
    entityType,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
