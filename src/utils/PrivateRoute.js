import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  tokenName,
  loginPath,
  ...props
}) {
  const { location: { pathname } } = window;
  const { REACT_APP_BASENAME } = process.env;
  const currentPath = REACT_APP_BASENAME ? `/${pathname.replace(REACT_APP_BASENAME, '')}` : pathname;
  if (currentPath === loginPath) {
    return null;
  }
  const redirect = currentPath ? `${loginPath}?onLogin=${currentPath}` : '/login/';
  const loginToken = localStorage.getItem(tokenName);
  if (!loginToken) {
    return <Redirect to={redirect} />;
  }
  return (
    <Route
      {...props}
      render={componentProps => <Component {...componentProps} />}
    />
  );
}
