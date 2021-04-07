import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';

const queryParams = () => (
  <Field
    name="name"
    component={TextField}
    fullWidth
  />
);

function CollectionContentParamsForm({
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

export default reduxForm()(CollectionContentParamsForm);
