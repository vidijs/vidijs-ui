import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { reduxForm, FormSection } from 'redux-form';

import { TextField } from '../form';
import { required } from '../../utils/FieldValidation';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const headers = () => (
  <React.Fragment>
    <Field
      name="username"
      label="Username"
      component={TextField}
      required
      fullWidth
      validate={[required]}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={TextField}
      required
      fullWidth
      autoFocus
      validate={[required]}
    />
  </React.Fragment>
);

const queryParams = () => (
  <React.Fragment>
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
  onTestUrl,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="baseUrl"
        label="Vidspine Server"
        component={TextField}
        required
        onBlur={(event, baseUrl) => onTestUrl(baseUrl)}
        fullWidth
        validate={[required]}
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
