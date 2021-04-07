import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Main from './Main';

export default function App(props) {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Route
        path="/"
        render={() => (
          <Main
            {...props}
          />
        )}
      />
    </BrowserRouter>
  );
}
