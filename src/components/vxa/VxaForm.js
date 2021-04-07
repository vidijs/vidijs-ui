import React from 'react';

import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import Field from '../ui/Field';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="uuid"
      component={TextField}
      fullWidth
    />
    <Field
      name="vxaname"
      label="Name"
      component={TextField}
      fullWidth
    />
    <Field
      name="vsip"
      label="API IP"
      component={TextField}
      fullWidth
    />
    <Field
      name="vsport"
      label="API Port"
      component={TextField}
      fullWidth
    />
    <Field
      name="ws"
      label="Websocket URI"
      component={TextField}
      fullWidth
    />
  </>
);

function VxaForm({
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

export default reduxForm()(VxaForm);
