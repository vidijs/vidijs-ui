import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <>
    <Field
      name="container"
      component={TextField}
      type="number"
      helperText="Total Container Components"
      fullWidth
    />
    <Field
      name="video"
      component={TextField}
      type="number"
      helperText="Total Video Components"
      fullWidth
    />
    <Field
      name="audio"
      component={TextField}
      type="number"
      helperText="Total Audio Components"
      fullWidth
    />
    <Field
      name="binary"
      component={TextField}
      type="number"
      helperText="Total Binary Components"
      fullWidth
    />
  </>
);

function ImportPlaceholderForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportPlaceholderForm);
