import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import ChipInput from '../ui/ChipInput';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { SimpleMetadataType } from '../ui/SimpleMetadataForm';
import { loadGroupOptions } from '../group/GroupSelect';
import { StatefulAsyncSelect } from '../ui/Select';

const GroupType = () => (
  <>
    <Field
      name="groupName"
      label="Group"
      component={StatefulAsyncSelect}
      loadOptions={loadGroupOptions}
      cacheOptions
      isClearable
    />
  </>
);

const GroupListType = () => (
  <FieldTypeArray
    name="group"
    component={GroupType}
  />
);

const UserType = () => (
  <>
    <Field
      name="userName"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="realName"
      component={TextField}
      fullWidth
    />
    <Field
      name="alias"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="password"
      component={TextField}
      type="password"
      fullWidth
    />
    <Field
      name="salt"
      component={TextField}
      fullWidth
    />
    <FormSection
      name="groupList"
      component={GroupListType}
    />
    <FormSection
      name="metadata"
      component={SimpleMetadataType}
    />
    <FormControlLabel
      control={(
        <Field
          name="disabled"
          component={BoolCheckbox}
        />
      )}
      label="Disabled"
    />
    <FormControlLabel
      control={(
        <Field
          name="remove"
          component={BoolCheckbox}
        />
      )}
      label="remove"
    />
  </>
);

const queryParams = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="passwordType">Password Type</InputLabel>
    <Field name="passwordType" component={Select}>
      <MenuItem value="md5">MD5</MenuItem>
      <MenuItem value="raw">Raw</MenuItem>
    </Field>
  </FormControl>
);

function UserForm({
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
      <FormSection
        name="userDocument"
        component={UserType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserForm);
