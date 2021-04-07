import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Select } from '../form';

import SimpleMetadataField from '../ui/SimpleMetadataField';
import UploadButton from '../ui/UploadButton';
import { required } from '../../utils/FieldValidation';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="filename"
      label="Filename"
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

function ImportRawForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="upload"
        label="Choose File"
        component={UploadButton}
        validate={[required]}
        fullWidth
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportRawForm);
