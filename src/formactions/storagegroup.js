import { SubmissionError } from 'redux-form';

import { storagegroup as api } from '@vidijs/vidijs-api';

export function onCreate(form) {
  const { storageGroupDocument } = form;
  const { name: groupName } = storageGroupDocument;
  return api.createStorageGroup({
    groupName,
  })
    .then(() => ({ storageGroupDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onAddStorageGroupStorage(form, dispatch, props) {
  const { groupName } = props;
  const { storageId } = form;
  return api.addStorageGroupStorage({
    storageId,
    groupName,
  })
    .then(() => ({ storageId }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
