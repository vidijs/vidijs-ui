import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../../form';
import Field from '../../ui/Field';
import InitialDisabledTextField from '../../ui/InitialDisabledTextField';
import FieldTypeArray from '../../ui/FieldTypeArray';
import FormSection from '../../ui/FormSection';

const ConfigurationPropertyType = () => (
  <>
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
  </>
);

const ConfigurationPropertyListType = () => (
  <FieldTypeArray
    name="property"
    component={ConfigurationPropertyType}
  />
);

const PropertiesListForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="configurationPropertyListDocument"
      component={ConfigurationPropertyListType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(PropertiesListForm);
