import { SubmissionError } from 'redux-form';

import { vsimport as api } from '@vidijs/vidijs-api';

export function onImportUri(form) {
  const { queryParams, metadataDocument } = form;
  return api.createImportUri({
    queryParams,
    metadataDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onImportRawNoAuth(form) {
  const { queryParams, metadataDocument, upload } = form;
  const { transferId } = queryParams;
  const file = upload[0];
  const { name: filename } = file;
  return api.createImportRawPasskey({
    filename,
    queryParams,
    metadataDocument,
  })
    .then((response) => {
      const { data: { data: jobData = [] } } = response;
      const passkey = jobData.find((j) => j.key === 'passkey').value;
      return api.createImportRawNoAuth({
        file,
        queryParams: {
          passkey,
          transferId,
        },
      });
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onImportPlaceholder(form) {
  const { queryParams, metadataDocument } = form;
  return api.createImportPlaceholder({
    queryParams,
    metadataDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onImportComponent(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  const component = props.component || form.component;
  return api.createImportComponent({
    itemId,
    component,
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
