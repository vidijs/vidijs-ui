import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { reduxForm } from 'redux-form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';

const queryParams = () => (
  <React.Fragment>
    <FormControlLabel
      control={(
        <Field
          name="keepFiles"
          component={BoolCheckbox}
        />
      )}
      label="keepFiles"
    />
    <FormControlLabel
      control={(
        <Field
          name="updateMetadata"
          component={BoolCheckbox}
        />
      )}
      label="updateMetadata"
    />
  </React.Fragment>
);


function ShapeDeleteForm({
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

export default reduxForm()(ShapeDeleteForm);
