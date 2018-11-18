import { SubmissionError } from 'redux-form';

import { javascript as api } from '@vidijs/vidijs-api';

export function onTest(form) {
  const { javascriptDocument } = form;
  return api.test({ javascriptDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onTest;
