import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="seconds"
      label="Duration (Seconds)"
      component={TextField}
      type="number"
      fullWidth
    />
    <FormControlLabel
      control={
        <Field
          name="autoRefresh"
          component={BoolCheckbox}
        />
      }
      label="Auto Refresh"
    />
  </React.Fragment>
);


function UserTokenForm({
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

export default reduxForm()(UserTokenForm);
