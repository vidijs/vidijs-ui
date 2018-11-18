import { SubmissionError } from 'redux-form';

import { storagerule as api } from '@vidijs/vidijs-api';

export function onUpdateEntityTag(form, dispatch, props) {
  const { storageRuleDocument } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  const tagName = props.tagName || form.tagName;
  return api.updateEntityStorageRuleTag({
    entityType,
    entityId,
    tagName,
    storageRuleDocument,
  })
    .then(() => ({ storageRuleDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateEntity(form, dispatch, props) {
  const { storageRuleDocument } = form;
  const entityType = props.entityType || form.entityType;
  const entityId = props.entityId || form.entityId;
  const tagName = props.tagName || form.tagName;
  if (tagName !== undefined) return onUpdateEntityTag(form, dispatch, props);
  return api.updateEntityStorageRule({
    entityType,
    entityId,
    storageRuleDocument,
  })
    .then(() => ({ storageRuleDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateShapeTag(form, dispatch, props) {
  const { storageRuleDocument } = form;
  const tagName = props.tagName || storageRuleDocument.tag;
  return api.updateStorageRuleShapeTag({
    tagName,
    storageRuleDocument,
  })
    .then(() => ({ storageRuleDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export const onCreateEntity = onUpdateEntity;
export const onCreateEntityTag = onUpdateEntityTag;
export const onCreateShapeTag = onUpdateShapeTag;
