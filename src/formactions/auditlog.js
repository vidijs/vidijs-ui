import { SubmissionError } from 'redux-form';

import { auditlog as api } from '@vidijs/vidijs-api';

export function onAuditList(form) {
  const { queryParams } = form;
  return api.listAuditLog({
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

export default onAuditList;
