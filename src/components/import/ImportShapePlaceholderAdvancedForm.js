import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import { TextField } from '../form';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="frameDuration"
      label="Frame Duration"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

function ImportShapePlaceholderAdvancedForm({
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
export default reduxForm()(ImportShapePlaceholderAdvancedForm);
