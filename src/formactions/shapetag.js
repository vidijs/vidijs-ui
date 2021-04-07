import { SubmissionError } from 'redux-form';

import { shapetag as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { transcodePresetDocument } = form;
  const tagName = props.tagName || transcodePresetDocument.name;
  return api.updateShapeTag({
    tagName,
    transcodePresetDocument,
  })
    .then(() => ({ transcodePresetDocument, tagName }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreatePreset() {
  return api.createShapeTagPreset()
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
