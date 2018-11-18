import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';

const ConnectionPoolType = () => (
  <React.Fragment>
    <Field
      name="minSize"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="maxSize"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="evictionInterval"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="minIdleTime"
      component={TextField}
      type="number"
      fullWidth
    />
  </React.Fragment>
);

const FtpPoolConfigurationType = () => (
  <React.Fragment>
    <FormSection
      name="pool"
      component={ConnectionPoolType}
    />
  </React.Fragment>
);


function FtpPoolForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="ftpPoolConfigurationDocument"
        component={FtpPoolConfigurationType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FtpPoolForm);
