import { SubmissionError } from 'redux-form';

import { notification as api } from '@vidispine/vdt-api';

export function onUpdate(form, dispatch, props) {
  const notificationId = props.notificationId || form.notificationId;
  const entityType = props.entityType || form.entityType;
  const { notificationDocument } = form;
  return api.updateNotification({
    notificationId,
    entityType,
    notificationDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreate(form, dispatch, props) {
  const { notificationDocument } = form;
  const entityType = props.entityType || Object.keys(notificationDocument.trigger)[0];
  return api.createNotification({
    entityType,
    notificationDocument,
  })
    .then((response) => ({ ...response, entityType }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
