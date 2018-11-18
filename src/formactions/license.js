import { SubmissionError } from 'redux-form';

import { license as api } from '@vidijs/vidijs-api';

export function onUpdate(form) {
  const { license } = form;
  const file = license[0];
  return api.createLicense({
    file,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
