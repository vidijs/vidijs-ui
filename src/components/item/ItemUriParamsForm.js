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
import StorageTypes from '../../const/StorageTypes';

const queryParams = () => (
  <>
    <Field
      name="type"
      component={TextField}
      fullWidth
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
    <Field
      name="scheme"
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
    <FormControl fullWidth>
      <InputLabel htmlFor="methodType">Method Type</InputLabel>
      <Field name="methodType" component={Select}>
        <MenuItem value="AUTO">AUTO</MenuItem>
        <MenuItem value="AZURE_SAS">AZURE_SAS</MenuItem>
      </Field>
    </FormControl>
    <Field
      name="methodMetadata"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="closedFiles"
          component={BoolCheckbox}
        />
      )}
      label="Closed Files"
    />
  </>
);

function ItemUriParamsForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(ItemUriParamsForm);
