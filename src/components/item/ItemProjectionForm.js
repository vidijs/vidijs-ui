import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadProjectionOptions } from '../projection/ProjectionSelect';

const matrixParams = () => (
  <React.Fragment>
    <Field
      name="projection"
      label="Projection"
      component={StatefulAsyncSelect}
      loadOptions={loadProjectionOptions}
      cacheOptions
      isClearable
      fullWidth
    />
  </React.Fragment>
);


function ItemProjectionForm({
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

export default reduxForm()(ItemProjectionForm);
