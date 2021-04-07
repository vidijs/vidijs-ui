import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Select } from '../form';

import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import FieldTypeArray from '../ui/FieldTypeArray';
import FormSection from '../ui/FormSection';
import CodeField from '../ui/CodeField';
import UrlField from '../ui/UrlField';
import StorageTypes from '../../const/StorageTypes';
import { SimpleMetadataType } from '../ui/FormType';

const StorageFileSequenceType = () => (
  <>
    <Field
      name="regex"
      label="regex"
      component={TextField}
      fullWidth
    />
    <Field
      name="numGroup"
      label="numGroup"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

const StorageMethodType = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="read"
          component={BoolCheckbox}
        />
      )}
      label="Read"
    />
    <FormControlLabel
      control={(
        <Field
          name="write"
          component={BoolCheckbox}
        />
      )}
      label="Write"
    />
    <FormControlLabel
      control={(
        <Field
          name="browse"
          component={BoolCheckbox}
        />
      )}
      label="Browse"
    />
    <Field
      name="uri"
      label="uri"
      component={UrlField}
      fullWidth
    />
    <Field
      name="bandwidth"
      label="bandwidth"
      component={TextField}
      fullWidth
    />
    <Field
      name="loc"
      label="loc"
      component={TextField}
      fullWidth
    />
    <Field
      name="lastSuccess"
      label="lastSuccess"
      component={TextField}
      disabled
      fullWidth
    />
    <Field
      name="lastFailure"
      label="lastFailure"
      component={TextField}
      disabled
      fullWidth
    />
    <Field
      name="failureMessage"
      label="failureMessage"
      component={TextField}
      disabled
      fullWidth
    />
    <Field
      name="type"
      label="type"
      component={TextField}
      fullWidth
    />
    <FormSection
      name="metadata"
      label="metadata"
      component={SimpleMetadataType}
    />
  </>
);

const StorageSection = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Type</InputLabel>
      <Field name="type" component={Select}>
        {StorageTypes.map((storageType) => (
          <MenuItem key={storageType} value={storageType}>
            {storageType}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field
      name="scanInterval"
      label="scanInterval"
      component={TextField}
      type="number"
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="autoDetect"
          component={BoolCheckbox}
        />
      )}
      label="Auto Detect"
    />
    <FormControlLabel
      control={(
        <Field
          name="showImportables"
          component={BoolCheckbox}
        />
      )}
      label="Show Importables"
    />
    <Field
      name="capacity"
      label="capacity"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="state"
      label="state"
      component={TextField}
      fullWidth
      disabled
    />
  </>
);

const BasicForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={StorageSection}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageBasicForm = reduxForm()(BasicForm);

const MetadataSection = () => (
  <>
    <FormSection
      name="metadata"
      label="metadata"
      component={SimpleMetadataType}
    />
  </>
);

const MetadataForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={MetadataSection}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageMetadataForm = reduxForm()(MetadataForm);

const MethodSection = () => (
  <>
    <FieldTypeArray
      name="method"
      label="method"
      component={StorageMethodType}
    />
  </>
);

const MethodListForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={MethodSection}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageMethodListForm = reduxForm()(MethodListForm);

const MethodForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="method"
      component={StorageMethodType}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageMethodForm = reduxForm()(MethodForm);

const AdvancedSection = () => (
  <>
    <Field
      name="freeCapacity"
      label="freeCapacity"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="bandwidth"
      label="bandwidth"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="timestamp"
      label="timestamp"
      component={TextField}
      disabled
      fullWidth
    />
    <Field
      name="lowWatermark"
      label="lowWatermark"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="highWatermark"
      label="highWatermark"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="lowWatermarkPercentage"
      label="lowWatermarkPercentage"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="lowWatermarkPercentage"
      label="lowWatermarkPercentage"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="bean"
      label="bean"
      component={TextField}
      fullWidth
    />
    <Field
      name="projection"
      label="projection"
      component={TextField}
      fullWidth
    />
    <Field
      name="sequenceTimeout"
      label="sequenceTimeout"
      component={TextField}
      type="number"
      fullWidth
    />
    <FieldTypeArray
      name="sequence"
      label="sequence"
      component={StorageFileSequenceType}
    />
  </>
);

const AdvancedForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={AdvancedSection}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageAdvancedForm = reduxForm()(AdvancedForm);

const ScriptSection = () => (
  <>
    <Field
      name="archiveScript"
      label="archiveScript"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
  </>
);

const ScriptForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={ScriptSection}
    />
    <button type="submit" hidden />
  </form>
);

export const StorageScriptForm = reduxForm()(ScriptForm);

const StorageForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="storageDocument"
      component={StorageSection}
    />
    <FormSection
      name="storageDocument"
      component={MethodSection}
    />
    <FormSection
      name="storageDocument"
      component={AdvancedSection}
    />
    <FormSection
      name="storageDocument"
      component={MetadataSection}
    />
    <FormSection
      name="storageDocument"
      component={ScriptSection}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(StorageForm);
