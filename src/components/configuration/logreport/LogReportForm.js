import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';

const LogReportConfigurationType = () => (
  <React.Fragment>
    <Field
      name="path"
      component={TextField}
      fullWidth
    />
    <Field
      name="expiryTime"
      component={TextField}
      fullWidth
    />
    <Field
      name="uploadUri"
      component={TextField}
      fullWidth
    />
    <Field
      name="certificate"
      component={TextField}
      fullWidth
    />
    <Field
      name="clientKey"
      component={TextField}
      fullWidth
    />
    <Field
      name="clientCertificate"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);


function LogReportForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="logReportConfigurationDocument"
        component={LogReportConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LogReportForm);
