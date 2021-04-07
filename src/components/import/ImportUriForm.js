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
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <>
    <Field
      name="uri"
      label="URI"
      component={TextField}
      helperText="Make Sure To Percent Encode"
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

function ImportUriForm({
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
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportUriForm);
