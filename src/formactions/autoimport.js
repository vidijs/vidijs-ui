import { SubmissionError } from 'redux-form';

import { autoimport as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { autoImportRuleDocument } = form;
  const storageId = props.storageId || autoImportRuleDocument.storage;
  return api.updateAutoImport({
    storageId,
    autoImportRuleDocument,
  })
    .then(() => ({ autoImportRuleDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
