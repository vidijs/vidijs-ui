import { SubmissionError } from 'redux-form';

import { item as api } from '@vidispine/vdt-api';

export function onCreateExport(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.createExport({
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

export function onCreateExportImp(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.createExportImp({
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

export function onRemoveItem(form, dispatch, props) {
  const { queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.removeItem({
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

export function onUpdateMetadata(form, dispatch, props) {
  const { metadataDocument = {}, matrixParams = [], queryParams } = form;
  const itemId = props.itemId || form.itemId;
  return api.updateItemMetadata({
    itemId,
    metadataDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({ itemId, ...response }))
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
  const itemId = props.itemId || form.itemId;
  const headers = props.headers || form.headers;
  return api.getItemMetadata({
    itemId,
    queryParams,
    matrixParams: Object.entries(matrixParams),
    headers,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGet(form, dispatch, props) {
  const { matrixParams = [], queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.getItem({
    itemId,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({ itemId, ...response }))
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
  return api.searchItem({
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

export function onGetUri(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.getItemUri({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateTranscode(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.createTranscode({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateThumbnail(form, dispatch, props) {
  const { queryParams = {} } = form;
  const itemId = props.itemId || form.itemId;
  return api.createThumbnail({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onListItemRelation(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return api.listItemRelation({
    itemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateItemRelation(form, dispatch, props) {
  const itemId = props.itemId || form.itemId;
  const relationItemId = props.relationItemId || form.relationItemId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return api.createItemRelation({
    itemId,
    relationItemId,
    queryParams,
  })
    .then((response) => ({ itemId, ...response }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateItemRelation(form, dispatch, props) {
  const relationId = props.relationId || form.relationId;
  const { queryParams: formQueryParams = {} } = form;
  const { relationMetadata = [], ...queryParams } = formQueryParams;
  relationMetadata.forEach((metadata) => { queryParams[metadata.key] = metadata.value; });
  return api.updateRelation({
    relationId,
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
