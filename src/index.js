import 'typeface-roboto/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route } from 'react-router-dom';
import { utils as api } from '@vidijs/vidijs-api';

import './index.css';
import { App, Login } from './containers';
import configureStore from './configureStore';
import PrivateRoute from './utils/PrivateRoute';
import LeftSnackbar from './components/ui/LeftSnackbar';

import { browserLogoutOn401 } from './utils/browserLogout';

const history = createHistory();
const store = configureStore({ history });

const token = localStorage.getItem('vsUserToken');
const runAs = localStorage.getItem('vsRunAs');
if (runAs) {
  api.defaultClient.defaults.headers.RunAs = runAs;
}
const baseUrl = localStorage.getItem('vsBaseUrl');
api.clientLogin({ token, baseUrl });
browserLogoutOn401(() => history.push('/login/'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <React.Fragment>
        <PrivateRoute
          path="/"
          component={App}
          tokenName="vsUserToken"
          loginPath="/login/"
        />
        <Route exact path="/login/" component={Login} />
        <LeftSnackbar />
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
