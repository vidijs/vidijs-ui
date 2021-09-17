import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { TextField, Select } from '../form';
import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import BoolCheckbox from '../ui/BoolCheckbox';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <Field
      name="fileId"
      label="File ID"
      component={TextField}
      fullWidth
    />

    <Field
      name="uri"
      label="URI"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="allowReimport"
          component={BoolCheckbox}
        />
      )}
      label="Allow Reimport"
    />
    <FieldTypeArray
      name="notificationData"
      component={KeyValuePairType}
      label="Notification Metadata"
      arrayHeader
      withHeader={false}
      dense
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
    <FieldTypeArray
      name="jobmetadata"
      component={KeyValuePairType}
      label="Job Metadata"
      withHeader={false}
      arrayHeader
      dense
    />
  </>
);

function ShapeAddComponentForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
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
      {!shapeId && (
        <Field
          name="shapeId"
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

export default reduxForm()(ShapeAddComponentForm);
