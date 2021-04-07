import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import Field from '../ui/Field';

const ExternalIdentifierNamespaceType = () => (
  <>
    <Field
      name="name"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="pattern"
      component={TextField}
      fullWidth
    />
    <Field
      name="priority"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

function ExternalIdNamespaceForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="externalIdentifierNamespaceDocument"
        component={ExternalIdentifierNamespaceType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExternalIdNamespaceForm);
