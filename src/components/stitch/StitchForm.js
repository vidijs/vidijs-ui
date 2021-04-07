import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import ChipInput from '../ui/ChipInput';

const queryParams = () => (
  <>
    <Field
      name="uri"
      label="URI"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="geometry"
      component={TextField}
      fullWidth
    />
    <Field
      name="tile"
      component={TextField}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="format">Format</InputLabel>
      <Field name="format" component={Select}>
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="jpeg">JPG</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="background"
      component={TextField}
      fullWidth
    />
  </>
);

function StitchForm({
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

export default reduxForm()(StitchForm);
