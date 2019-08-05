import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from '../form';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <React.Fragment>
    <FormControlLabel
      control={(
        <Field
          name="allowReimport"
          component={BoolCheckbox}
        />
      )}
      label="Allow Reimport"
    />
    <Field
      name="storageId"
      label="Storage ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
      label="Notification ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="notificationData"
      label="Notification Data"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);


function ImportShapeAdvancedForm({
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
export default reduxForm()(ImportShapeAdvancedForm);
