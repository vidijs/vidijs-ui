import { SubmissionError } from 'redux-form';

import { user as api, utils as apiUtils } from '@vidijs/vidijs-api';

export function onCreate(form) {
  const { userDocument, queryParams } = form;
  return api.createUser({
    userDocument,
    queryParams,
  })
    .then(() => ({ data: userDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdatePassword(form, dispatch, props) {
  const userName = props.userName || form.userName;
  const { password, queryParams } = form;
  return api.updateUserPassword({
    userName,
    password,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onGetToken(form, dispatch, props) {
  const { headers = {}, queryParams } = form;
  const userName = props.userName || form.userName || headers.username;
  const baseUrl = props.baseUrl || form.baseUrl;
  if (baseUrl) { apiUtils.clientLogin({ baseUrl }); }
  return api.getToken({
    userName,
    queryParams,
    headers,
  })
    .then(response => ({ ...response, userName, baseUrl }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        const { data, statusText } = error.response;
        if (data) {
          errorMessage = JSON.stringify(data, (k, v) => (v === null ? undefined : v));
        } else {
          errorMessage = statusText;
        }
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}


export function onUpdateGroups(form, dispatch, props) {
  const { groupListDocument, queryParams } = form;
  const userName = props.userName || form.userName;
  return api.updateUserGroup({
    userName,
    groupListDocument,
    queryParams,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateRealName(form, dispatch, props) {
  const { realName } = form;
  const userName = props.userName || form.userName;
  return api.updateUserRealName({
    userName,
    realName,
  })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
