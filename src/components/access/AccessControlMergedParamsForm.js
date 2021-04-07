import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadUserOptions } from '../user/UserSelect';

export const queryParams = () => (
  <>
    <Field
      name="username"
      label="User"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="permission">Permission</InputLabel>
      <Field name="permission" component={Select}>
        <MenuItem value="NONE">None</MenuItem>
        <MenuItem value="READ">Read</MenuItem>
        <MenuItem value="WRITE">Write</MenuItem>
        <MenuItem value="ALL">All</MenuItem>
        <MenuItem value="OWNER">Owner</MenuItem>
      </Field>
    </FormControl>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Type</InputLabel>
      <Field name="type" component={Select}>
        <MenuItem value="GENERIC">Generic</MenuItem>
        <MenuItem value="URI">URI</MenuItem>
        <MenuItem value="SHAPE">Shape</MenuItem>
        <MenuItem value="METADATA">Metadata</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="Extra Data"
      label="extradata"
      component={TextField}
      fullWidth
    />
  </>
);

function AccessControlMergedParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
        fullWidth
      />
    </form>
  );
}

export default reduxForm()(AccessControlMergedParamsForm);
