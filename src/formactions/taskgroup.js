import { SubmissionError } from 'redux-form';

import { taskgroup as api } from '@vidijs/vidijs-api';

export function onUpdate(form) {
  const { taskGroupDocument } = form;
  const { name: groupName } = taskGroupDocument;
  return api.updateTaskGroup({
    groupName,
    taskGroupDocument,
  })
    .then((response) => ({ taskGroupDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
