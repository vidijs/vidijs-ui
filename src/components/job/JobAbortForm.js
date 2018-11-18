import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="reason"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={
        <Field
          name="cleanup"
          component={BoolCheckbox}
        />
      }
      label="Cleanup"
    />
  </React.Fragment>
);


function JobAbortForm({
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

export default reduxForm()(JobAbortForm);
