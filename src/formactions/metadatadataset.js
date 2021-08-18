import { SubmissionError } from 'redux-form';

import { metadatadataset as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { body, headers } = form;
  const datasetId = props.datasetId || form.datasetId;
  return api.updateMetadataMigration({
    datasetId,
    body,
    headers: { accept: headers.contentType, contentType: headers.contentType },
  })
    .then((response) => ({ body: response.data, datasetId }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
