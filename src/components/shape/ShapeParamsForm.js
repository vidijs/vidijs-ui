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
import StorageTypes from '../../const/StorageTypes';

const queryParams = () => (
  <>
    <Field
      name="methodType"
      component={TextField}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="storageType">StorageType</InputLabel>
      <Field name="storageType" component={Select}>
        {StorageTypes.map((storageType) => (
          <MenuItem key={storageType} value={storageType}>
            {storageType}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
    <Field
      name="methodMetadata"
      component={TextField}
      fullWidth
    />
    <Field
      name="scheme"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="includePlaceholder"
          component={BoolCheckbox}
        />
      )}
      label="Include Placeholder"
    />
    <FormControlLabel
      control={(
        <Field
          name="transient"
          component={BoolCheckbox}
        />
      )}
      label="Transient"
    />
  </>
);

function ShapeParamsForm({
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

export default reduxForm()(ShapeParamsForm);
