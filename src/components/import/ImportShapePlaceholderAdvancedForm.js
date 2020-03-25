import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from '../form';
import Typography from '@material-ui/core/Typography';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="frameDuration"
      label="Frame Duration"
      component={TextField}
      type="number"
      fullWidth
    />
  </React.Fragment>
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
