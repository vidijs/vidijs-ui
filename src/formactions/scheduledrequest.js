import { SubmissionError } from 'redux-form';

import { scheduledrequest as api } from '@vidijs/vidijs-api';


export function onListScheduledRequest(form) { // eslint-disable-line import/prefer-default-export
  const { queryParams } = form;
  return api.listScheduledRequest({
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
