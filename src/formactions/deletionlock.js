import { SubmissionError } from 'redux-form';

import { deletionlock as api } from '@vidispine/vdt-api';

export function onListDeletionLock(form) {
  const { queryParams } = form;
  return api.listDeletionLock({ queryParams })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onListEntityDeletionLock(form, dispatch, props) {
  const { queryParams } = form;
  const { entityType: entity, entityId } = props;
  return api.listEntityDeletionLock({ entity, entityId, queryParams })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateDeletionLock(form, dispatch, props) {
  const { deletionLockDocument } = form;
  const lockId = props.lockId || deletionLockDocument.id;
  return api.updateDeletionLock({
    lockId,
    deletionLockDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onCreateEntityDeletionLock(form, dispatch, props) {
  const { deletionLockDocument } = form;
  const entity = props.entityType || deletionLockDocument.entityType;
  const entityId = props.entityId || deletionLockDocument.entityId;
  return api.createEntityDeletionLock({
    entity,
    entityId,
    deletionLockDocument,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
