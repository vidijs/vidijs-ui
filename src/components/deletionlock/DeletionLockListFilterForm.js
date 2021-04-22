import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { TextField, Select } from '../form';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { loadUserOptions } from '../user/UserSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import BoolCheckbox from '../ui/BoolCheckbox';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = ({ entityType }) => (
  <>
    {!entityType && (
      <FormControl fullWidth>
        <InputLabel htmlFor="entityTypes">Entity Types</InputLabel>
        <Field name="entityTypes" component={Select}>
          <MenuItem value="item">Item</MenuItem>
          <MenuItem value="collection">Collection</MenuItem>
          <MenuItem value="file">File</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </Field>
      </FormControl>
    )}
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="number"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="username"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="range"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="onlyEffective"
          component={BoolCheckbox}
        />
      )}
      label="Only Effective"
    />
    <FieldTypeArray
      name="metadata"
      label="Metadata"
      component={KeyValuePairType}
    />
  </>
);

function DeletionLockListFilterForm({
  error,
  handleSubmit,
  entityType,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
        entityType={entityType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(DeletionLockListFilterForm);
