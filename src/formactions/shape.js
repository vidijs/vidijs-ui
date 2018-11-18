import { SubmissionError } from 'redux-form';

import { shape as api } from '@vidijs/vidijs-api';

export function onCreateShapeEssenceImport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.createShapeEssenceImport({
    itemId,
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

export function onCreateShapeImport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.createShapeImport({
    itemId,
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

export function onCreateShapePlaceholder(form, dispatch, props) {
  const { queryParams, metadataDocument = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.createShapePlaceholder({
    itemId,
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

export function onList(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.listShape({
    itemId,
    queryParams,
  })
    .then(response => ({ itemId, ...response }))
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
  const itemId = props.itemId || form.itemId;
  const shapeId = props.shapeId || form.shapeId;
  return api.getShape({
    itemId,
    shapeId,
    queryParams,
  })
    .then(response => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
