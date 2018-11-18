import { utils as api } from '@vidijs/vidijs-api';

export function browserLogin({ token, userName, baseUrl }) {
  localStorage.setItem('vsUserToken', token);
  localStorage.setItem('vsUsername', userName);
  localStorage.setItem('vsBaseUrl', baseUrl);
  api.clientLogin({ baseUrl, token });
}

export default browserLogin;
