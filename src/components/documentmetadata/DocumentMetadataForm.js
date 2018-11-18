import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import BoolCheckbox from '../ui/BoolCheckbox';
import { MetadataType } from '../metadata/MetadataForm';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="revision"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="skipForbidden"
          component={BoolCheckbox}
        />
      )}
      label="Skip Forbidden"
    />
  </React.Fragment>
);

function DocumentMetadataForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="documentMetadataName"
        label="documentName"
        component={InitialDisabledTextField}
        fullWidth
      />
      <FormSection
        name="metadataDocument"
        label="metadataDocument"
        component={MetadataType}
      />
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(DocumentMetadataForm);
