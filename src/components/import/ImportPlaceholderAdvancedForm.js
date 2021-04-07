import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import ChipInput from '../ui/ChipInput';

const queryParams = () => (
  <>
    <Field
      name="frameDuration"
      label="Frame Duration"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="settings"
      label="Access Control Settings"
      component={TextField}
      fullWidth
    />
    <Field
      name="importTag"
      label="Default Shape Tag"
      component={ChipInput}
      simple
      fullWidth
    />
  </>
);

function ImportPlaceholderAdvancedForm({
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

export default reduxForm()(ImportPlaceholderAdvancedForm);
