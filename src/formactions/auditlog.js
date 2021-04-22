import { SubmissionError } from 'redux-form';

import { auditlog as api } from '@vidispine/vdt-api';

export function onAuditList(form) {
  const { queryParams } = form;
  return api.listAuditLog({
    path: '/API/log/', // path broken in vdt-api@0.13.0
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
