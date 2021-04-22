import { SubmissionError } from 'redux-form';

import { transfer as api } from '@vidispine/vdt-api';

export function onUpdateTransferPriority(form, dispatch, props) {
  const transferId = props.transferId || form.transferId;
  const { queryParams } = form;
  return api.updateTransferPriority({
    transferId,
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

export function onTransferList(form) {
  const { queryParams, matrixParams = {} } = form;
  return api.listTransfer({
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
