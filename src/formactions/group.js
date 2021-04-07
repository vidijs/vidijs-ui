import { SubmissionError } from 'redux-form';

import { group as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { queryParams, groupDocument } = form;
  const groupName = props.groupName || form.groupDocument.groupName;
  return api.updateGroup({
    groupName,
    groupDocument,
    queryParams,
  })
    .then(() => ({ data: groupDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
