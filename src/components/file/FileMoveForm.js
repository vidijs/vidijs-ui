import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { loadStorageOptions } from '../storage/StorageSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import BoolCheckbox from '../ui/BoolCheckbox';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';

const queryParams = () => (
  <>
    <FormControl fullWidth>
      <InputLabel htmlFor="move">Action</InputLabel>
      <Field name="move" component={Select}>
        <MenuItem value="false">Copy</MenuItem>
        <MenuItem value="true">Move</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="filename"
      component={TextField}
      fullWidth
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
          name="useOriginalFilename"
          component={BoolCheckbox}
        />
      )}
      label="Use Original Filename"
    />
    <Field
      name="timeRequirement"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="limitRate"
      component={TextField}
      type="number"
      fullWidth
    />
    <FieldTypeArray
      name="jobmetadata"
      label="Job Metadata"
      component={KeyValuePairType}
    />
    <Field
      name="notification"
      component={TextField}
      fullWidth
    />
    <FieldTypeArray
      name="notificationData"
      label="Notification Data"
      component={KeyValuePairType}
    />
  </>
);

function FileMoveForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="targetStorageId"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        required
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

export default reduxForm()(FileMoveForm);
