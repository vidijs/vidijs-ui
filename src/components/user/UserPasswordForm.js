import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="type">Password Type</InputLabel>
    <Field name="type" component={Select}>
      <MenuItem value="md5">MD5</MenuItem>
      <MenuItem value="raw">Raw</MenuItem>
    </Field>
  </FormControl>
);

function UserPasswordForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="password"
        component={TextField}
        type="password"
        fullWidth
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserPasswordForm);
