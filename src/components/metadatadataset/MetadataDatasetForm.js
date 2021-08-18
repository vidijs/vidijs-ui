import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';
import Field from '../ui/Field';
import InitialDisabledTextField from '../ui/InitialDisabledTextField';
import FormSection from '../ui/FormSection';
import CodeField from '../ui/CodeField';

const queryParams = () => (
  <Field
    name="id-seed"
    label="id-seed"
    component={TextField}
    fullWidth
  />
);

const headers = () => (
  <FormControl fullWidth>
    <InputLabel htmlFor="contentType">Model</InputLabel>
    <Field name="contentType" component={Select}>
      <MenuItem value="application/rdf+xml">RDF</MenuItem>
      <MenuItem value="text/turtle">TURTLE</MenuItem>
      <MenuItem value="application/ld+json">LD+JSON</MenuItem>
    </Field>
  </FormControl>
);

const MetadataDatasetForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="datasetId"
      label="name"
      component={InitialDisabledTextField}
      fullWidth
    />
    <FormSection
      name="headers"
      component={headers}
    />
    <FormSection
      name="queryParams"
      component={queryParams}
    />
    <Field
      name="body"
      label="body"
      component={CodeField}
      options={{
        theme: 'material',
        mode: 'application/ld+json',
        lineWrapping: true,
        lineNumbers: true,
      }}
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(MetadataDatasetForm);
