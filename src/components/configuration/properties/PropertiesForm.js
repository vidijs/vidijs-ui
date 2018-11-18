import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import Field from '../../ui/Field';
import InitialDisabledTextField from '../../ui/InitialDisabledTextField';
import FormSection from '../../ui/FormSection';

const ConfigurationPropertyType = () => (
  <React.Fragment>
    <Field
      name="key"
      label="Key"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="value"
      label="Value"
      component={TextField}
      fullWidth
      multiline
    />
  </React.Fragment>
);

const PropertiesForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="configurationPropertyDocument"
      component={ConfigurationPropertyType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(PropertiesForm);
