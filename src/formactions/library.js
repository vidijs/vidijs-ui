import { SubmissionError } from 'redux-form';

import { library as api } from '@vidijs/vidijs-api';


export function onCreate(form) {
  const { queryParams, itemListDocument } = form;
  return api.createLibrary({
    itemListDocument,
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

export function onList(form) {
  const { matrixParams = [] } = form;
  return api.listLibrary({
    matrixParams: Object.entries(matrixParams),
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGet(form, dispatch, props) {
  const { queryParams, matrixParams = [] } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api.getLibrary({
    libraryId,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdate(form, dispatch, props) {
  const { itemListDocument } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api.updateLibrary({
    libraryId,
    itemListDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateSettings(form, dispatch, props) {
  const { librarySettingsDocument } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api.updateLibrarySettings({
    libraryId,
    librarySettingsDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}


export function onUpdateItemMetadata(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api.updateLibraryItemMetadata({
    libraryId,
    metadataDocument,
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

export function onRemove(form, dispatch, props) {
  const { queryParams } = form;
  const libraryId = props.libraryId || form.libraryId;
  return api.removeLibrary({
    libraryId,
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
