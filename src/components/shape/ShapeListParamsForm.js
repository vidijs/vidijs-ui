import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField, Select } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';

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
      <InputLabel htmlFor="placeholder">Placeholder</InputLabel>
      <Field name="placeholder" component={Select}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="true">True</MenuItem>
        <MenuItem value="false">False</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="version"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="url"
          component={BoolCheckbox}
        />
      )}
      label="Show URL"
    />
  </>
);

function ShapeListParamsForm({
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
    </form>
  );
}

export default reduxForm()(ShapeListParamsForm);
