import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import FieldTypeArray from '../../ui/FieldTypeArray';
import FormSection from '../../ui/FormSection';
import Field from '../../ui/Field';
import JobPriority from '../../../const/JobPriority';

const JobPoolType = () => (
  <React.Fragment>
    <FormControl fullWidth>
      <InputLabel htmlFor="priorityThreshold">Priority Threshold</InputLabel>
      <Field name="priorityThreshold" component={Select}>
        {JobPriority.map(priority => (
          <MenuItem key={priority} value={priority}>
            {priority}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field
      name="size"
      component={TextField}
      type="number"
      fullWidth
    />
  </React.Fragment>
);

const JobPoolListType = () => (
  <React.Fragment>
    <Field
      name="concurrentJobs"
      component={TextField}
      type="number"
      fullWidth
    />
    <FieldTypeArray
      name="pool"
      label="Pool"
      component={JobPoolType}
    />
  </React.Fragment>
);


function JobPoolForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="jobPoolListDocument"
        component={JobPoolListType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobPoolForm);
