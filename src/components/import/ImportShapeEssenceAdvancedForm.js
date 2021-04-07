import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FieldTypeArray
      name="jobmetadata"
      label="Job Metadata"
      dense
      component={KeyValuePairType}
    />
    <Field
      name="storageId"
      component={TextField}
      fullWidth
    />
    <Field
      name="notification"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      label="Notification Metadata"
      component={KeyValuePairType}
    />
  </>
);

function ImportShapeEssenceAdvancedForm({
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

export default reduxForm()(ImportShapeEssenceAdvancedForm);
