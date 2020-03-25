import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from '../form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadFieldGroupOptions } from '../fieldgroup/FieldGroupSelect';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';

const MetadataValueType = () => (
  <Grid container spacing={8}>
    <Grid item sm={10}>
      <Field
        name="value"
        component={TextField}
        fullWidth
      />
    </Grid>
    <Grid item sm={2}>
      <FormControl fullWidth>
        <InputLabel htmlFor="mode">Mode</InputLabel>
        <Field name="mode" component={Select}>
          <MenuItem value="add">
            Add
          </MenuItem>
          <MenuItem value="remove">
            Remove
          </MenuItem>
        </Field>
      </FormControl>
    </Grid>
  </Grid>
);

const MetadataFieldValueType = () => (
  <Grid container spacing={8}>
    <Grid item sm={6}>
      <Field
        name="name"
        label="Field Name"
        component={StatefulAsyncSelect}
        loadOptions={loadMetadataFieldOptions}
        cacheOptions
        isClearable
        required
        fullWidth
        disableInitial
      />
    </Grid>
    <Grid item sm={6}>
      <FieldTypeArray
        name="value"
        label="value"
        withHeader={false}
        direction="row"
        component={MetadataValueType}
      />
    </Grid>
  </Grid>
);

const MetadataGroupValueType = () => (
  <React.Fragment>
    <Field
      name="name"
      label="Group Name"
      component={StatefulAsyncSelect}
      loadOptions={loadFieldGroupOptions}
      cacheOptions
      isClearable
      required
      fullWidth
      disableInitial
      creatable
    />
    <FieldTypeArray
      name="field"
      label="field"
      withHeader={false}
      arrayHeader
      removeLabel
      component={MetadataFieldValueType}
    />
    <FieldTypeArray
      name="group"
      label="group"
      withHeader={false}
      arrayHeader
      removeLabel
      component={MetadataGroupValueType}
    />
  </React.Fragment>
);


const MetadataTimespanType = () => (
  <React.Fragment>
    <Grid container spacing={8}>
      <Grid item sm={6}>
        <Field
          name="start"
          component={InitialDisabledTextField}
          fullWidth
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="end"
          component={InitialDisabledTextField}
          fullWidth
        />
      </Grid>
    </Grid>
    <FieldTypeArray
      name="field"
      label="field"
      withHeader={false}
      arrayHeader
      removeLabel
      component={MetadataFieldValueType}
    />
    <FieldTypeArray
      name="group"
      label="group"
      withHeader={false}
      arrayHeader
      removeLabel
      component={MetadataGroupValueType}
    />
  </React.Fragment>
);

export const MetadataType = () => (
  <React.Fragment>
    <FieldTypeArray
      name="timespan"
      label="timespan"
      arrayHeader
      withHeader={false}
      hover={false}
      removeLabel
      component={MetadataTimespanType}
    />
  </React.Fragment>
);


function MetadataForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="metadataDocument"
        component={MetadataType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(MetadataForm);
