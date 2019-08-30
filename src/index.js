import 'typeface-roboto/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory as createHistory } from 'history';

import 'codemirror/theme/material.css';
import 'codemirror/lib/codemirror.css';
import './css/CodeMirror.css';
import './index.css';

import { App, Login } from './containers';
import Auth from './containers/Auth';
import configureStore from './configureStore';

import { browserLogoutOn401 } from './utils/browserLogout';

const history = createHistory();
const store = configureStore({ history });

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
