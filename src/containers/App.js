import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './Main';

import '../css/CodeMirror.css';


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
