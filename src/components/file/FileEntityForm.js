import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField, Select } from 'redux-form-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import FileStates from '../../const/FileStates';
import { loadStorageOptions } from '../storage/StorageSelect';
import { StatefulAsyncSelect } from '../ui/Select';

const fileDocument = () => (
  <React.Fragment>
    <Field
      name="path"
      component={TextField}
      fullWidth
    />
    <Field
      name="uri"
      component={TextField}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel htmlFor="state">State</InputLabel>
      <Field name="state" component={Select}>
        {FileStates.map(fileState => (
          <MenuItem key={fileState} value={fileState}>
            {fileState}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  </React.Fragment>
);

const queryParams = () => (
  <React.Fragment>
    <FormControlLabel
      control={
        <Field
          name="createOnly"
          component={BoolCheckbox}
        />
      }
      label="Create Only"
    />
  </React.Fragment>
);


function FileEntityForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="storageId"
        component={StatefulAsyncSelect}
        loadOptions={loadStorageOptions}
        cacheOptions
        isClearable
        required
        fullWidth
      />
      <FormSection
        name="fileDocument"
        component={fileDocument}
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(FileEntityForm);
