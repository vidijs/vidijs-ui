import { SubmissionError } from 'redux-form';

import {
  vsimport as importApi,
  file as fileApi,
} from '@vidispine/vdt-api';

export function onImportImpUrl(form) {
  const { queryParams, metadataDocument } = form;
  return importApi.createImportImp({
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

export function onImportImpFile(form, dispatch, props) {
  const { queryParams, metadataDocument } = form;
  const fileId = props.fileId || form.fileId;
  return fileApi.createFileImportAssetMap({
    fileId,
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

export function onImportImpPath(form, dispatch, props) {
  const { queryParams, metadataDocument } = form;
  const storageId = props.storageId || form.storageId;
  return fileApi.createFilePathImportAssetMap({
    storageId,
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
