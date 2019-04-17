import { utils as api } from '@vidijs/vidijs-api';

export function browserLogin({
  token,
  userName,
  baseUrl,
  runAs,
}) {
  localStorage.setItem('vsUserToken', token);
  localStorage.setItem('vsBaseUrl', baseUrl);
  api.clientLogin({ baseUrl, token });
  if (runAs) {
    localStorage.setItem('vsUsername', runAs);
    localStorage.setItem('vsRunAs', runAs);
    api.defaultClient.defaults.headers.RunAs = runAs;
  } else {
    localStorage.setItem('vsUsername', userName);
  }
}

export default browserLogin;
