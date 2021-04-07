import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../../form';

import Field from '../../ui/Field';
import FormSection from '../../ui/FormSection';
import CodeField from '../../ui/CodeField';

const ConfigurationPropertyType = () => (
  <>
    <Field
      name="key"
      label="Key"
      component={TextField}
      fullWidth
    />
    <Field
      name="value"
      label="Value"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
  </>
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
