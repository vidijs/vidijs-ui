import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const queryParams = () => (
  <>
    <Field
      name="reason"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="cleanup"
          component={BoolCheckbox}
        />
      )}
      label="Cleanup"
    />
  </>
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
