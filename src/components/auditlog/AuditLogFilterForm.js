import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { loadUserOptions } from '../user/UserSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import BoolCheckbox from '../ui/BoolCheckbox';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="method">Method</InputLabel>
      <Field name="method" component={Select}>
        <MenuItem value="GET">GET</MenuItem>
        <MenuItem value="PUT">PUT</MenuItem>
        <MenuItem value="POST">POST</MenuItem>
        <MenuItem value="DELETE">DELETE</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="path"
      component={TextField}
      fullWidth
    />
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="rows"
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
      required
      fullWidth
    />
    <Field
      name="starttime"
      component={TextField}
      fullWidth
    />
    <Field
      name="endtime"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="wildcard"
          component={BoolCheckbox}
        />
      )}
      label="Wildcard"
    />
    <FormControlLabel
      control={(
        <Field
          name="performCount"
          component={BoolCheckbox}
          disabled
        />
      )}
      label="Perform Count"
    />
  </>
);

function AuditLogFilterForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(AuditLogFilterForm);
