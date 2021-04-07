import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FormSection } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select } from '../form';

import { loadGroupOptions } from '../group/GroupSelect';
import { StatefulAsyncSelect } from '../ui/Select';

const ImportAccessQueryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="permission">Permission</InputLabel>
    <Field name="permission" component={Select}>
      <MenuItem value="READ">Read</MenuItem>
      <MenuItem value="WRITE">Write</MenuItem>
      <MenuItem value="ALL">All</MenuItem>
      <MenuItem value="OWNER">Owner</MenuItem>
      <MenuItem value="NONE">None</MenuItem>
    </Field>
  </FormControl>
);

function ImportAccessForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="groupName"
        label="Group"
        component={StatefulAsyncSelect}
        loadOptions={loadGroupOptions}
        cacheOptions
        isClearable
      />
      <FormSection
        name="queryParams"
        component={ImportAccessQueryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ImportAccessForm);
