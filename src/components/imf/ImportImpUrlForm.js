import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import JobPriority from '../../const/JobPriority';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';

const queryParams = () => (
  <>
    <Field
      name="uri"
      component={TextField}
      fullWidth
      required
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
          name="noCPLreimport"
          component={BoolCheckbox}
        />
      )}
      label="No CPL Reimport"
    />
    <FormControlLabel
      control={(
        <Field
          name="no-transcode"
          component={BoolCheckbox}
        />
      )}
      label="No Transcode"
    />
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
      name="tag"
      label="Shape Tag"
      component={StatefulAsyncSelect}
      loadOptions={loadShapeTagOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
  </>
);

function ImportImpUrlForm({
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

export default reduxForm()(ImportImpUrlForm);
