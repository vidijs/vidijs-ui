import { utils as api } from '@vidispine/vdt-api';

export function browserLogout() {
  localStorage.removeItem('vsUserToken');
  localStorage.removeItem('vsRunAs');
  api.logout();
  delete api.defaultClient.defaults.headers.RunAs;
}

export function browserLogoutOn401(onLogout) {
  api.defaultClient.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      browserLogout();
      if (onLogout) { onLogout(); }
    }
    return Promise.reject(error);
  });
}
