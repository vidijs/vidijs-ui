import { SubmissionError } from 'redux-form';

import { debug as api } from '@vidispine/vdt-api';

export function onParseXML(form) {
  const { xmlDocument } = form;
  return api.echo({
    xmlDocument,
  })
    .then((response) => (response.data))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onParse(form) {
  const { jsonDocument } = form;
  try {
    return jsonDocument ? JSON.parse(jsonDocument) : undefined;
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}

export function onStringify(form) {
  try {
    return JSON.stringify(form, null, 2);
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
}
