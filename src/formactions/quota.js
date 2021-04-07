import { SubmissionError } from 'redux-form';
import update from 'immutability-helper';

import { quota as api } from '@vidispine/vdt-api';

function filterQueryParams(queryParams) {
  if (!('filter' in queryParams) && (typeof queryParams.filter !== 'object')) {
    return queryParams;
  }
  const { filter } = queryParams;
  const filterReducer = (acc, cur, idx) => {
    if (cur.key && cur.value) {
      return `${acc}${idx > 0 ? ',' : ''}${cur.key}%3D${cur.value}`;
    }
    return acc;
  };
  const filterValue = filter.reduce(filterReducer, '');
  if (filterValue !== '') {
    return update(queryParams, {
      filter: {
        $set: filterValue,
      },
    });
  }
  return update(queryParams, {
    $unset: ['filter'],
  });
}

export function onCreate(form) {
  const { quotaRuleDocument } = form;
  return api.createQuota({
    quotaRuleDocument,
  })
    .then((response) => ({ quotaRuleDocument: response.data }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onList(form) {
  const { queryParams: formQueryParams } = form;
  const queryParams = filterQueryParams(formQueryParams);
  return api.listQuota({
    queryParams,
  })
    .then((response) => ({ quotaRuleListDocument: response.data, queryParams }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
