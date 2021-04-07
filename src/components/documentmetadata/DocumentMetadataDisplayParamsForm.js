import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const matrixParams = () => (
  <>
    <Field
      name="interval"
      component={TextField}
      fullWidth
    />
    <Field
      name="field"
      component={TextField}
      fullWidth
    />
    <Field
      name="group"
      component={TextField}
      fullWidth
    />
    <Field
      name="track"
      component={TextField}
      fullWidth
    />
    <Field
      name="language"
      component={TextField}
      fullWidth
    />
    <Field
      name="samplerate"
      component={TextField}
      fullWidth
    />
    <Field
      name="include"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="conflict"
          component={BoolCheckbox}
        />
      )}
      label="Conflict"
    />
    <FormControlLabel
      control={(
        <Field
          name="defaultValue"
          component={BoolCheckbox}
        />
      )}
      label="Default Value"
    />
  </>
);

function DocumentMetadataDisplayParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="matrixParams"
        component={matrixParams}
      />
    </form>
  );
}

export default reduxForm()(DocumentMetadataDisplayParamsForm);
