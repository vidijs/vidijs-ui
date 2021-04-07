import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import ChipInput from '../ui/ChipInput';
import BoolCheckbox from '../ui/BoolCheckbox';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import FieldTypeArray from '../ui/FieldTypeArray';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
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
        {JobPriority.map((priority) => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <FormControlLabel
      control={(
        <Field
          name="createThumbnails"
          component={BoolCheckbox}
        />
      )}
      label="Create Thumbnails"
    />
    <Field
      name="createPosters"
      label="Poster Timecodes"
      component={ChipInput}
      simple
      fullWidth
    />
    <Field
      name="destinationItem"
      component={TextField}
      fullWidth
    />
    <Field
      name="original"
      label="Reset Original"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
    <Field
      name="notification"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
    />
    <Field
      name="thumbnailService"
      component={TextField}
      fullWidth
    />
    <Field
      name="resourceId"
      label="Transcoder ID"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="overrideFastStart"
          component={BoolCheckbox}
        />
      )}
      label="Override FastStart"
    />
    <FormControlLabel
      control={(
        <Field
          name="requireFastStart"
          component={BoolCheckbox}
        />
      )}
      label="Require FastStart"
    />
    <Field
      name="fastStartLength"
      component={TextField}
      fullWidth
    />
  </>
);

function ItemTranscodeForm({
  error,
  handleSubmit,
  itemId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ItemTranscodeForm);
