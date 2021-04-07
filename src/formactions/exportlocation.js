import { SubmissionError } from 'redux-form';

import { exportlocation as api } from '@vidijs/vidijs-api';

export function onUpdate(form, dispatch, props) {
  const { exportLocationDocument } = form;
  const locationName = props.locationName || exportLocationDocument.name;
  return api.updateExportLocation({
    locationName,
    exportLocationDocument,
  })
    .then((response) => ({ exportLocationDocument: response.data, locationName }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export default onUpdate;
