import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';

import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import SimpleMetadataField from '../ui/SimpleMetadataField';
import { required } from '../../utils/FieldValidation';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="uri"
      label="URI"
      component={TextField}
      helperText="Must be specified unless File Id is specified"
      fullWidth
    />
    <Field
      name="fileId"
      label="File ID"
      component={TextField}
      helperText="Must be specified unless URI is specified"
      fullWidth
    />
    <Field
      name="shapeId"
      label="Shape ID"
      component={TextField}
      fullWidth
    />
    <Field
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Field name="priority" component={Select}>
        <MenuItem value="HIGHEST">HIGHEST</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="LOWEST">LOWEST</MenuItem>
      </Field>
    </FormControl>
    <FieldArray
      name="jobmetadata"
      label="Job Metadata"
      component={SimpleMetadataField}
      buttonLabel="Add Job Metadata"
    />
  </>
);

function ImportComponentForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="itemId"
        label="Item Id"
        component={TextField}
        validate={[required]}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="component">Component</InputLabel>
        <Field name="component" component={Select}>
          <MenuItem value="container">Container</MenuItem>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
          <MenuItem value="binary">Binary</MenuItem>
        </Field>
      </FormControl>
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportComponentForm);
