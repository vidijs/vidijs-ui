import { SubmissionError } from 'redux-form';

import { collection as api } from '@vidispine/vdt-api';

export function onUpdateMetadata(form, dispatch, props) {
  const { metadataDocument = {}, matrixParams = [], queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api.updateCollectionMetadata({
    collectionId,
    metadataDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({ collectionId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetMetadata(form, dispatch, props) {
  const { matrixParams = [], queryParams = {} } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api.getCollectionMetadata({
    collectionId,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({ collectionId, ...response }))
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
  const collectionId = props.collectionId || form.collectionId;
  return api.getCollection({
    collectionId,
    queryParams,
  })
    .then((response) => ({ collectionId, ...response }))
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
    queryParams = {},
    matrixParams = [],
    itemSearchDocument = {},
  } = form;
  return api.searchCollection({
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

export function onCreate(form) {
  const { queryParams = {}, collectionDocument = {} } = form;
  return api.createCollection({
    collectionDocument,
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

export function onRename(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  return api.renameCollection({
    collectionId,
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

export function onAddEntity(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  const entityId = props.entityId || form.entityId;
  return api.addCollectionEntity({
    collectionId,
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

export function onRemoveEntity(form, dispatch, props) {
  const { queryParams } = form;
  const collectionId = props.collectionId || form.collectionId;
  const entityId = props.entityId || form.entityId;
  return api.removeCollectionEntity({
    collectionId,
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
