import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { SimpleMetadataType } from '../ui/SimpleMetadataForm';
import { loadGroupOptions } from './GroupSelect';
import { loadUserOptions } from '../user/UserSelect';
import { StatefulAsyncSelect } from '../ui/Select';

const GroupLookup = () => (
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

const UserLookup = () => (
  <>
    <Field
      name="userName"
      label="User"
      component={StatefulAsyncSelect}
      loadOptions={loadUserOptions}
      cacheOptions
      isClearable
    />
  </>
);

const GroupListType = () => (
  <FieldTypeArray
    name="group"
    label="Group"
    component={GroupLookup}
  />
);

const UserListType = () => (
  <FieldTypeArray
    name="user"
    component={UserLookup}
  />
);

const GroupType = () => (
  <>
    <Field
      name="groupName"
      component={InitialDisabledTextField}
      fullWidth
    />
    <Field
      name="description"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="role"
          component={BoolCheckbox}
          disabled
        />
      )}
      label="Role"
    />
    <FormSection
      name="metadata"
      component={SimpleMetadataType}
    />
    <FormSection
      name="parentGroupList"
      label="Parent Groups"
      component={GroupListType}
    />
    <FormSection
      name="childGroupList"
      label="Child Groups"
      component={GroupListType}
    />
    <FormSection
      name="userList"
      label="Users"
      component={UserListType}
    />
  </>
);

const queryParams = () => (
  <FormControlLabel
    control={(
      <Field
        name="clear"
        component={BoolCheckbox}
      />
    )}
    label="Clear Existing Users/Groups"
  />
);

const UserSection = () => (
  <>
    <FormSection
      name="userList"
      component={UserListType}
    />
  </>
);

const UserForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="groupDocument"
      component={UserSection}
    />
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <button type="submit" hidden />
  </form>
);

export const GroupUserForm = reduxForm()(UserForm);

const ChildSection = () => (
  <>
    <FormSection
      name="childGroupList"
      component={GroupListType}
    />
  </>
);

const ChildForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="groupDocument"
      component={ChildSection}
    />
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <button type="submit" hidden />
  </form>
);

export const GroupChildForm = reduxForm()(ChildForm);

const ParentSection = () => (
  <>
    <FormSection
      name="parentGroupList"
      component={GroupListType}
    />
  </>
);

const ParentForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="groupDocument"
      component={ParentSection}
    />
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <button type="submit" hidden />
  </form>
);

export const GroupParentForm = reduxForm()(ParentForm);

function GroupForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="groupDocument"
        component={GroupType}
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(GroupForm);
