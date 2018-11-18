import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import SimpleMetadataField from '../ui/SimpleMetadataField';


function ConformParamsForm({
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="queryParams.destinationItem"
        label="Destination Item ID"
        component={TextField}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="priority">Priority</InputLabel>
        <Field name="queryParams.priority" component={Select} >
          <MenuItem value="HIGHEST">HIGHEST</MenuItem>
          <MenuItem value="HIGH">HIGH</MenuItem>
          <MenuItem value="MEDIUM">MEDIUM</MenuItem>
          <MenuItem value="LOW">LOW</MenuItem>
          <MenuItem value="LOWEST">LOWEST</MenuItem>
        </Field>
      </FormControl>
      <Field
        name="queryParams.tag"
        label="Shape Tag"
        component={ChipInput}
        simple
        fullWidth
      />
      <FormControlLabel
        control={
          <Field
            name="queryParams.conformMetadata"
            component={BoolCheckbox}
          />
        }
        label="Conform Metadata"
      />
      <FormControlLabel
        control={
          <Field
            name="queryParams.createThumbnails"
            component={BoolCheckbox}
          />
        }
        label="Create Thumbnails"
      />
      <FormControlLabel
        control={
          <Field
            name="queryParams.createPosters"
            component={BoolCheckbox}
          />
        }
        label="Create Posters"
      />
      <Field
        name="queryParams.thumbnailService"
        label="Thumbnail Storage ID"
        component={TextField}
        fullWidth
      />
      <Field
        name="queryParams.original"
        label="Reset Original Tag"
        component={TextField}
        fullWidth
      />
      <Field
        name="queryParams.resourceId"
        label="Transcoder ID"
        component={TextField}
        fullWidth
      />
      <Field
        name="queryParams.sourceTag"
        label="Source Tags"
        component={ChipInput}
        simple
        fullWidth
      />
      <Field
        name="queryParams.notification"
        label="Notification ID"
        component={TextField}
        fullWidth
      />
      <Field
        name="queryParams.notificationData"
        label="Notification Data"
        component={TextField}
        fullWidth
      />
      <FieldArray
        name="queryParams.jobmetadata"
        label="Job Metadata"
        component={SimpleMetadataField}
        buttonLabel="Add Job Metadata"
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ConformParamsForm);
