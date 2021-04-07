import { SubmissionError } from 'redux-form';

import { file as api } from '@vidijs/vidijs-api';

export function onUpdateFileState(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { state } = form;
  return api.updateFileState({
    fileId,
    state,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onFileMove(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { targetStorageId, queryParams } = form;
  return api.createFileMove({
    fileId,
    targetStorageId,
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

export function onFileDelete(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams } = form;
  return api.removeFile({
    fileId,
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

export function onFilePath(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams } = form;
  return api.createFilePath({
    fileId,
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

export function onFileOverwrite(form, dispatch, props) {
  const fileId = props.fileId || form.fileId;
  const { queryParams, file } = form;
  return api.updateFileRaw({
    fileId,
    file: file[0],
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

export function onFileList(form, dispatch, props) {
  const { storageId } = props;
  const { queryParams, matrixParams = {} } = form;
  return api.listFile({
    storageId,
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

export function onFileCreateEntity(form) {
  const { fileDocument, queryParams, storageId } = form;
  return api.createFileEntity({
    storageId,
    fileDocument,
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

export function onFileImport(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api.createFileImport({
    fileId,
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

export function onFileImportAssetMap(form, dispatch, props) {
  const { metadataDocument, queryParams } = form;
  const fileId = props.fileId || form.fileId;
  return api.createFileImportAssetMap({
    fileId,
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
