import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory as createHistory } from 'history';

import { App, Login } from './containers';
import Auth from './containers/Auth';
import configureStore from './configureStore';
import ThemeProvider from './components/ui/Theme';

import { browserLogoutOn401 } from './utils/browserLogout';

const history = createHistory();
const store = configureStore({ history });

browserLogoutOn401(() => history.push('/login/'));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <Auth
        loginComponent={Login}
        appComponent={App}
      />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
