import { SubmissionError } from 'redux-form';
import { metadatafield as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { metadataFieldDocument } = form;
  const fieldName = props.fieldName || metadataFieldDocument.name;
  return api.updateMetadataField({
    fieldName,
    metadataFieldDocument,
  })
    .then((response) => ({ metadataFieldDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
export function onGetAllowedValues(form, dispatch, props) {
  const { metadataFieldValueConstraintListDocument } = form;
  const fieldName = props.fieldName || form.fieldName;
  return api.getMetadataFieldAllowedValues({
    fieldName,
    metadataFieldValueConstraintListDocument,
  })
    .then((response) => ({ constraintValueListDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
