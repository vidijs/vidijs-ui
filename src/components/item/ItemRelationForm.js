import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';

export const DirectionQueryParam = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="direction">Direction</InputLabel>
    <Field name="direction" component={Select} fullWidth>
      <MenuItem value="U">Unidirectional</MenuItem>
      <MenuItem value="S">Source</MenuItem>
      <MenuItem value="T">Target</MenuItem>
    </Field>
  </FormControl>
);

export const AllowDuplicateQueryParam = () => (
  <FormControlLabel
    control={(
      <Field
        name="allowDuplicate"
        component={BoolCheckbox}
      />
    )}
    label="Allow Duplicates"
  />
);

export const RelationMetadataQueryParam = () => (
  <FieldTypeArray
    name="relationMetadata"
    component={KeyValuePairType}
    label="Relation Metadata"
    arrayHeader
    withHeader={false}
    dense
  />
);

export const RelationItemId = () => (
  <Field
    name="relationItemId"
    label="Relation Item ID"
    component={TextField}
    fullWidth
  />
);

export const queryParams = () => (
  <>
    <DirectionQueryParam />
    <AllowDuplicateQueryParam />
    <RelationMetadataQueryParam />
  </>
);

function ItemRelationForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <RelationItemId />
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(ItemRelationForm);
