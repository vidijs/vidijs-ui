import { SubmissionError } from 'redux-form';

import { metadatafield as api } from '@vidijs/vidijs-api';

export function onUpdate(form, dispatch, props) {
  const { metadataFieldDocument } = form;
  const fieldName = props.fieldName || metadataFieldDocument.name;
  return api.updateMetadataField({
    fieldName,
    metadataFieldDocument,
  })
    .then(response => ({ metadataFieldDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
