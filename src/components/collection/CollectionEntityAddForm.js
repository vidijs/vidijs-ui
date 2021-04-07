import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { TextField, Select } from '../form';

import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { required } from '../../utils/FieldValidation';

const KeyValueType = () => (
  <Grid container spacing={8}>
    <Grid item sm={6}>
      <Field
        name="key"
        label="key"
        component={TextField}
        fullWidth
      />
    </Grid>
    <Grid item sm={6}>
      <Field
        name="value"
        label="value"
        component={TextField}
        fullWidth
      />
    </Grid>
  </Grid>
);

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Entity Type</InputLabel>
      <Field name="type" component={Select} validate={[required]}>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="collection">Collection</MenuItem>
        <MenuItem value="library">Library</MenuItem>
      </Field>
    </FormControl>
    <FormControlLabel
      control={(
        <Field
          name="addItems"
          component={BoolCheckbox}
        />
      )}
      label="Add Items"
    />
    <FieldTypeArray
      name="metadata"
      label="Relation Metadata"
      arrayHeader
      withHeader={false}
      dense
      component={KeyValueType}
    />
  </>
);

function CollectionEntityAddForm({
  error,
  handleSubmit,
  collectionId,
  entityId,
  initialValues,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!collectionId && (
        <Field
          name="collectionId"
          label="Collection ID"
          component={TextField}
          fullWidth
        />
      )}
      {!entityId && (
        <Field
          name="entityId"
          label="Entity ID"
          component={TextField}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        component={queryParams}
        initialValues={initialValues}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(CollectionEntityAddForm);
