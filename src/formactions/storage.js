import { SubmissionError } from 'redux-form';

import { storage as api } from '@vidispine/vdt-api';

export function onCreate(form) {
  const { storageDocument } = form;
  return api.createStorage({
    storageDocument,
  })
    .then((response) => ({ storageDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdate(form, dispatch, props) {
  const { storageDocument } = form;
  const storageId = props.storageId || storageDocument.storageId;
  return api.modifyStorage({
    storageId,
    storageDocument,
  })
    .then((response) => ({ storageDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onMethodUpdate(form, dispatch, props) {
  const { method } = form;
  const { storageId } = props;
  const storageMethodId = props.storageMethodId || method.storageMethodId;
  const queryParams = {
    url: encodeURIComponent(method.uri),
    read: method.read,
    write: method.write,
    browse: method.browse,
    bandwidth: method.bandwidth,
    type: method.type,
  };
  return api.modifyStorageMethod({
    storageId,
    storageMethodId,
    queryParams,
  })
    .then((response) => ({ storageMethodDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onMethodCreate(form, dispatch, props) {
  const { method } = form;
  const { storageId } = props;
  const queryParams = {
    url: encodeURIComponent(method.uri),
    read: method.read,
    write: method.write,
    browse: method.browse,
    bandwidth: method.bandwidth,
    type: method.type,
  };
  return api.createStorageMethod({
    storageId,
    queryParams,
  })
    .then((response) => ({ storageMethodDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateStorageType(form, dispatch, props) {
  const { type: storageType } = form;
  const storageId = props.storageId || form.storageId;
  return api.updateStorageType({
    storageId,
    storageType,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
