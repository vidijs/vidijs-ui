import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { KeyValuePairType } from '../ui/FormType';

export const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="direction">Direction</InputLabel>
      <Field name="direction" component={Select} fullWidth>
        <MenuItem value="A">All</MenuItem>
        <MenuItem value="U">Unidirectional</MenuItem>
        <MenuItem value="S">Source</MenuItem>
        <MenuItem value="T">Target</MenuItem>
        <MenuItem value="D">Source or Target</MenuItem>
      </Field>
    </FormControl>
    <FieldTypeArray
      name="relationMetadata"
      component={KeyValuePairType}
      label="Relation Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
  </>
);

function ItemRelationParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(ItemRelationParamsForm);
