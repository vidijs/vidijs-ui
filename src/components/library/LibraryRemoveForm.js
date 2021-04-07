import React from 'react';
import { reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Select } from '../form';

import Field from '../ui/Field';
import FormSection from '../ui/FormSection';
import FieldTypeArray from '../ui/FieldTypeArray';
import JobPriority from '../../const/JobPriority';
import { KeyValuePairType } from '../ui/FormType';
import BoolCheckbox from '../ui/BoolCheckbox';
import { required } from '../../utils/FieldValidation';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="async"
          component={BoolCheckbox}
        />
      )}
      label="Async"
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
  </>
);

function LibraryRemoveForm({
  error,
  handleSubmit,
  libraryId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!libraryId && (
        <Field
          name="libraryId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LibraryRemoveForm);
