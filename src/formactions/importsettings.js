import { SubmissionError } from 'redux-form';

import { importsettings as api } from '@vidijs/vidijs-api';


export function onUpdate(form, dispatch, props) {
  const { settingsId } = props;
  const { importSettingsDocument } = form;
  return api.updateImportSettings({
    settingsId,
    importSettingsDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreate(form) {
  const { importSettingsDocument } = form;
  return api.createImportSettings({
    importSettingsDocument,
  })
    .then(response => ({ importSettingsDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
