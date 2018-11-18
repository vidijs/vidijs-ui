import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, FormSection } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Field from '../ui/Field';

const headers = () => (
  <React.Fragment>
    <Field
      name="username"
      label="Username"
      component={TextField}
      fullWidth
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={TextField}
      fullWidth
      autoFocus
    />
  </React.Fragment>
);

function LoginForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="baseUrl"
        label="Vidspine Server"
        component={TextField}
        disabled
        fullWidth
      />
      <FormSection
        name="headers"
        component={headers}
      />
      <button type="submit" hidden />
    </form>
  );
}


export default reduxForm()(LoginForm);
