import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, FormSection } from 'redux-form';
import { TextField } from '../form';

import Field from '../ui/Field';

const headers = () => (
  <>
    <Field
      name="runAs"
      label="Login As User"
      component={TextField}
      fullWidth
    />
  </>
);

const queryParams = () => (
  <>
    <Field
      name="seconds"
      label="Timeout "
      component={TextField}
      helperText="Seconds"
      fullWidth
    />
  </>
);

function LoginFormAdvanced({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
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

export default reduxForm()(LoginFormAdvanced);
