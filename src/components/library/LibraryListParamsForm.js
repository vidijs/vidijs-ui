import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const matrixParams = () => (
  <React.Fragment>
    <Field
      name="first"
      component={TextField}
      fullWidth
    />
    <Field
      name="number"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="autoRefresh"
          component={BoolCheckbox}
        />
      )}
      label="Auto Refresh"
    />
    <Field
      name="frequencyFrom"
      component={TextField}
      fullWidth
    />
    <Field
      name="frequencyTo"
      component={TextField}
      fullWidth
    />
    <Field
      name="updateMode"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);


function LibraryListParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="matrixParams"
        label="matrixParams"
        component={matrixParams}
      />
    </form>
  );
}

export default reduxForm()(LibraryListParamsForm);
