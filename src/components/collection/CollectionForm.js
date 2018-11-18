import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { MetadataType } from '../metadata/MetadataForm';

const CollectionContentType = () => (
  <React.Fragment>
    <Field
      name="id"
      label="Entity ID"
      component={TextField}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="type">Entity Type</InputLabel>
      <Field name="type" component={Select}>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="library">Library</MenuItem>
        <MenuItem value="collection">Collection</MenuItem>
      </Field>
    </FormControl>
  </React.Fragment>
);

const CollectionType = () => (
  <React.Fragment>
    <FormSection
      name="metadata"
      label="metadata"
      component={MetadataType}
    />
    <FieldTypeArray
      name="content"
      label="content"
      component={CollectionContentType}
    />
  </React.Fragment>
);

const queryParams = () => (
  <React.Fragment>
    <Field
      name="name"
      component={TextField}
      fullWidth
    />
    <Field
      name="externalId"
      component={TextField}
      fullWidth
    />
    <Field
      name="settings"
      component={TextField}
      fullWidth
    />
  </React.Fragment>
);


const DocumentForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="collectionDocument"
      component={CollectionType}
    />
    <button type="submit" hidden />
  </form>
);

export const CollectionDocumentForm = reduxForm()(DocumentForm);

const QueryParamsForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <button type="submit" hidden />
  </form>
);

export const CollectionQueryParamsForm = reduxForm()(QueryParamsForm);

const CollectionForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <FormSection
      name="queryParams"
      label="queryParams"
      component={queryParams}
    />
    <FormSection
      name="collectionDocument"
      label="collectionDocument"
      component={CollectionType}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(CollectionForm);
