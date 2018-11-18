import { SubmissionError } from 'redux-form';

import { documentmetadata as api } from '@vidijs/vidijs-api';


export function onUpdate(form, dispatch, props) {
  const { metadataDocument = {}, queryParams } = form;
  const documentMetadataName = props.documentMetadataName || form.documentMetadataName;
  return api.updateDocumentMetadata({
    documentMetadataName,
    metadataDocument,
    queryParams,
  })
    .then(response => ({ documentMetadataName, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGet(form, dispatch, props) {
  const { matrixParams } = form;
  const documentMetadataName = props.documentMetadataName || form.documentMetadataName;
  return api.getDocumentMetadata({
    documentMetadataName,
    matrixParams: Object.entries(matrixParams),
  })
    .then(response => ({ documentMetadataName, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
