import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { reduxForm, FormSection } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

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

const queryParams = () => (
  <React.Fragment>
    <Field
      name="seconds"
      label="Timeout "
      component={TextField}
      helperText="Seconds"
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="autoRefresh"
          component={BoolCheckbox}
        />
      )}
      label="Remember Me"
    />
  </React.Fragment>
);

function LoginForm({
  error,
  handleSubmit,
  initialValues,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="baseUrl"
        label="Vidspine Server"
        component={TextField}
        fullWidth
      />
      <FormSection
        name="headers"
        component={headers}
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}


export default reduxForm()(LoginForm);
