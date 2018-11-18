import { SubmissionError } from 'redux-form';

import { job as api } from '@vidijs/vidijs-api';

export function onJobList(form) {
  const { queryParams, matrixParams = {} } = form;
  return api.listJob({
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

export function onModifyJob(form, dispatch, props) {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return api.modifyJob({
    jobId,
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

export function onDuplicateJob(form, dispatch, props) {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return api.duplicateJob({
    jobId,
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

export function onAbortJob(form, dispatch, props) {
  const jobId = props.jobId || form.jobId;
  const { queryParams } = form;
  return api.abortJob({
    jobId,
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

export function onCreateJob(form) {
  const { queryParams } = form;
  return api.createJob({
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
