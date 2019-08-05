import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from '../form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FieldTypeArray from '../ui/FieldTypeArray';

import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import FormSection from '../ui/FormSection';

import { KeyValuePairType } from '../ui/FormType';
import { MetadataSchemaElementType, MetadataFieldType } from '../metadatafield/MetadataFieldForm';

const MetadataFieldAccessControlType = () => (
  <React.Fragment>
    <Field
      name="field"
      label="field"
      component={TextField}
      fullWidth
    />
    <Field
      name="fieldGroup"
      label="fieldGroup"
      component={TextField}
      fullWidth
    />
    <Field
      name="user"
      label="user"
      component={TextField}
      fullWidth
    />
    <Field
      name="group"
      label="group"
      component={TextField}
      fullWidth
    />
    <Field
      name="permission"
      label="permission"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);

const BasicSection = () => (
  <React.Fragment>
    <Field
      name="name"
      label="name"
      component={InitialDisabledTextField}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="inheritance">Inheritance</InputLabel>
      <Field name="inheritance" component={Select} >
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
  </React.Fragment>
);

const AccessSection = () => (
  <React.Fragment>
    <FieldTypeArray
      name="access"
      label="access"
      component={MetadataFieldAccessControlType}
    />
  </React.Fragment>
);

const FieldSection = () => (
  <React.Fragment>
    <FieldTypeArray
      name="field"
      label="field"
      component={MetadataFieldType}
    />
  </React.Fragment>
);

const SchemaSection = () => (
  <React.Fragment>
    <FormSection
      name="schema"
      label="schema"
      component={MetadataSchemaElementType}
    />
  </React.Fragment>
);

const DataSection = () => (
  <React.Fragment>
    <FieldTypeArray
      name="data"
      label="data"
      component={KeyValuePairType}
    />
  </React.Fragment>
);

const MetadataFieldGroupType = () => (
  <React.Fragment>
    <BasicSection />
    <SchemaSection />
    <FieldSection />
    <FieldTypeArray
      name="group"
      label="group"
      component={MetadataFieldGroupType}
    />
    <AccessSection />
    <DataSection />
  </React.Fragment>
);

const GroupSection = () => (
  <React.Fragment>
    <FieldTypeArray
      name="group"
      label="group"
      component={MetadataFieldGroupType}
    />
  </React.Fragment>
);

const DataForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={DataSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupDataForm = reduxForm()(DataForm);

const BasicForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={BasicSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupBasicForm = reduxForm()(BasicForm);

const SchemaForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={SchemaSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupSchemaForm = reduxForm()(SchemaForm);

const FieldForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={FieldSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupFieldForm = reduxForm()(FieldForm);

const GroupForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={GroupSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupGroupForm = reduxForm()(GroupForm);

const AccessForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={AccessSection}
    />
    <button type="submit" hidden />
  </form>
);

export const FieldGroupAccessForm = reduxForm()(AccessForm);

const FieldGroupForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="metadataFieldGroupDocument"
      component={MetadataFieldGroupType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(FieldGroupForm);
