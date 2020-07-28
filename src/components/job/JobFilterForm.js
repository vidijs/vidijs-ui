import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from '../form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadJobTypeOptions } from '../jobtype/JobTypeSelect';
import BoolCheckbox from '../ui/BoolCheckbox';
import ChipInput from '../ui/ChipInput';
import JobStates from '../../const/JobStates';
import { KeyValuePairType } from '../ui/FormType';


const queryParams = () => (
  <React.Fragment>
    <FieldTypeArray
      name="jobmetadata"
      label="Job Metadata"
      component={KeyValuePairType}
    />
    <FormControlLabel
      control={(
        <Field
          name="metadata"
          component={BoolCheckbox}
        />
      )}
      label="Include Metadata"
    />
    <FormControlLabel
      control={(
        <Field
          name="idonly"
          component={BoolCheckbox}
        />
      )}
      label="Only IDs"
    />
    <FormControlLabel
      control={(
        <Field
          name="step"
          component={BoolCheckbox}
        />
      )}
      label="Include Steps"
    />
    <Field
      name="starttime-from"
      component={TextField}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
    <Field
      name="starttime-to"
      component={TextField}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
    <Field
      name="finishtime-from"
      component={TextField}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
    <Field
      name="finishtime-to"
      component={TextField}
      type="datetime-local"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  </React.Fragment>
);


const matrixParams = () => (
  <React.Fragment>
    <FormControl fullWidth>
      <InputLabel htmlFor="state">State</InputLabel>
      <Field name="state" component={Select}>
        <MenuItem value="all">All</MenuItem>
        {JobStates.map(jobState => (
          <MenuItem key={jobState} value={jobState}>
            {jobState}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field
      name="type"
      label="Type"
      component={StatefulAsyncSelect}
      loadOptions={loadJobTypeOptions}
      cacheOptions
      isClearable
      fullWidth
    />
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
      disabled
    />
    <Field
      name="number"
      component={TextField}
      type="number"
      fullWidth
      disabled
    />
    <Field
      name="sort"
      component={ChipInput}
      simple
      fullWidth
      disabled
    />
    <FormControlLabel
      control={(
        <Field
          name="user"
          component={BoolCheckbox}
        />
      )}
      label="Only My User"
    />
  </React.Fragment>
);


function JobFilterForm({
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
      <FormSection
        name="matrixParams"
        component={matrixParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(JobFilterForm);
