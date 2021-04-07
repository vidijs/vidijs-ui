import { SubmissionError } from 'redux-form';

import { vxa as api } from '@vidispine/vdt-api';

export function onCreate(form) {
  const { queryParams } = form;
  return api.createVxa({
    queryParams,
  })
    .then((response) => ({ vxaConfiguration: response.data, queryParams }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onCreate;
