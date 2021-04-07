import { SubmissionError } from 'redux-form';

import { fieldgroup as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const { metadataFieldGroupDocument } = form;
  const groupName = props.groupName || metadataFieldGroupDocument.name;
  return api.updateFieldGroup({
    groupName,
    metadataFieldGroupDocument,
  })
    .then((response) => ({ metadataFieldGroupDocument: response.data, groupName }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateFieldGroupChild(form, dispatch, props) {
  const { childGroupName } = form;
  const { groupName } = props;
  return api.updateFieldGroupChild({ groupName, childGroupName })
    .then(() => ({ childGroupName, groupName }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateFieldGroupField(form, dispatch, props) {
  const groupName = props.groupName || form.groupName;
  const fieldName = props.fieldName || form.fieldName;
  return api.updateFieldGroupField({
    groupName,
    fieldName,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onSearch(form) {
  const {
    matrixParams = [],
    queryParams = {},
    metadataFieldGroupSearchDocument = {},
  } = form;
  return api.searchFieldGroup({
    metadataFieldGroupSearchDocument,
    queryParams,
    matrixParams: Object.entries(matrixParams),
  })
    .then((response) => ({
      queryParams,
      matrixParams,
      metadataFieldGroupSearchDocument,
      ...response,
    }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
