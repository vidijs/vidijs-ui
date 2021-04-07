import React from 'react';

import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import BoolCheckbox from '../ui/BoolCheckbox';
import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';

import FieldTypeArray from '../ui/FieldTypeArray';

const StorageCriteriaType = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="value">Criteria</InputLabel>
    <Field name="value" component={Select}>
      <MenuItem value="bandwidth">bandwidth</MenuItem>
      <MenuItem value="capacity">capacity</MenuItem>
    </Field>
  </FormControl>
);

const StorageRuleStorageType = () => (
  <>
    <Field
      name="storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="group"
      label="Storage Group"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
  </>
);

const StorageRuleNotType = () => (
  <>
    <StorageRuleStorageType />
    <Field
      name="any"
      component={TextField}
      fullWidth
    />
  </>
);

const StorageRulePriorityType = () => (
  <>
    <Field
      name="level"
      type="number"
      component={TextField}
      fullWidth
    />
    <StorageCriteriaType />
  </>
);

const StorageRuleAppliesType = () => (
  <>
    <Field
      name="id"
      component={TextField}
      fullWidth
    />
    <Field
      name="type"
      component={TextField}
      fullWidth
    />
  </>
);

const StorageRuleType = () => (
  <>
    <Field
      name="storageCount"
      type="number"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="priority"
      label="Priority"
      component={StorageRulePriorityType}
    />
    <FormControlLabel
      control={(
        <Field
          name="inherited"
          component={BoolCheckbox}
        />
      )}
      label="Inherited"
    />
    <Field
      name="storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="group"
      label="Storage Group"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <FormSection
      name="not"
      label="not"
      component={StorageRuleNotType}
    />
    <FormSection
      name="pool"
      label="pool"
      component={StorageRuleStorageType}
    />
    <FormSection
      name="appliesTo"
      label="appliesTo"
      component={StorageRuleAppliesType}
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="precedence">Precedence</InputLabel>
      <Field name="precedence" component={Select}>
        <MenuItem value="HIGHEST">HIGHEST</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="LOWEST">LOWEST</MenuItem>
      </Field>
    </FormControl>
  </>
);

const EntityForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="tagName"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <FormSection
      name="storageRuleDocument"
      component={StorageRuleType}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageRuleEntityForm = reduxForm()(EntityForm);

const TagForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageRuleDocument"
      component={StorageRuleType}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageRuleTagForm = reduxForm()(TagForm);

function StorageRuleForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth>
        <InputLabel htmlFor="entityType">Type</InputLabel>
        <Field name="entityType" component={Select}>
          <MenuItem value="item">Item</MenuItem>
          <MenuItem value="collection">Collection</MenuItem>
          <MenuItem value="library">Library</MenuItem>
        </Field>
      </FormControl>
      <Field
        name="entityId"
        component={TextField}
        fullWidth
      />
      <FormSection
        name="storageRuleDocument"
        component={StorageRuleType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(StorageRuleForm);
