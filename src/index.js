import 'typeface-roboto/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory as createHistory } from 'history';
// import { utils as api } from '@vidijs/vidijs-api';

import './index.css';
import { App, Login } from './containers';
import Auth from './containers/Auth';
import configureStore from './configureStore';

import { browserLogoutOn401 } from './utils/browserLogout';

const history = createHistory();
const store = configureStore({ history });

// const token = localStorage.getItem('vsUserToken');
// const runAs = localStorage.getItem('vsRunAs');
// if (runAs) {
//   api.defaultClient.defaults.headers.RunAs = runAs;
// }
// const baseUrl = localStorage.getItem('vsBaseUrl');
// api.clientLogin({ token, baseUrl });
browserLogoutOn401(() => history.push('/login/'));


ReactDOM.render(
  <Provider store={store}>
    <Auth
      loginComponent={Login}
      appComponent={App}
    />
  </Provider>,
  document.getElementById('root'),
);
