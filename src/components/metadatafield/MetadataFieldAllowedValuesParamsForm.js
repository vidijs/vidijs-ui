import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadMetadataFieldOptions } from './MetadataFieldSelect';

const MetadataFieldValueConstraintType = () => (
  <>
    <Field
      name="field"
      label="Metadata Field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="value"
      component={TextField}
      fullWidth
    />
    <Field
      name="id"
      component={TextField}
      fullWidth
    />
  </>
);

const MetadataFieldValueConstraintListType = () => (
  <FieldTypeArray
    name="constraint"
    component={MetadataFieldValueConstraintType}
    fullWidth
  />
);

function MetadataFieldAllowedValuesParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="metadataFieldValueConstraintListDocument"
        component={MetadataFieldValueConstraintListType}
      />
    </form>
  );
}

export default reduxForm()(MetadataFieldAllowedValuesParamsForm);
