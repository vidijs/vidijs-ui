import { SubmissionError } from 'redux-form';

import { search as api } from '@vidispine/vdt-api';

export function onSearchShape(form) {
  const {
    matrixParams = [],
    queryParams = {},
    shapeSearchDocument = {},
  } = form;
  return api.searchShape({
    shapeSearchDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({
      queryParams,
      matrixParams,
      shapeSearchDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSearchFile(form) {
  const {
    matrixParams = [],
    queryParams = {},
    fileSearchDocument = {},
  } = form;
  return api.searchFile({
    fileSearchDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({
      queryParams,
      matrixParams,
      fileSearchDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSearch(form) {
  const {
    matrixParams = [],
    queryParams = {},
    itemSearchDocument = {},
  } = form;
  return api.searchItemCollection({
    itemSearchDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({
      queryParams,
      matrixParams,
      itemSearchDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onAutocomplete(form) {
  const {
    autocompleteRequestDocument = {},
  } = form;
  return api.searchAutoComplete({
    autocompleteRequestDocument,
  })
    .then((response) => ({
      autocompleteRequestDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
