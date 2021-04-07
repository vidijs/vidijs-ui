import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import {
  queryParams as contentQueryParams,
} from '../item/ItemContentParamsForm';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadStorageOptions } from '../storage/StorageSelect';
import { loadStorageGroupOptions } from '../storagegroup/StorageGroupSelect';

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="count"
          component={BoolCheckbox}
        />
      )}
      label="Count"
    />
    <FormControlLabel
      control={(
        <Field
          name="save"
          component={BoolCheckbox}
        />
      )}
      label="Save"
    />
  </>
);

const matrixParams = () => (
  <>
    <Field
      name="first"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="number"
      component={TextField}
      type="number"
      fullWidth
    />
    <Field
      name="storage"
      label="Storage"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="storageGroup"
      label="Storage Group"
      component={StatefulAsyncSelect}
      loadOptions={loadStorageGroupOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
  </>
);

function SearchParamsForm({
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
        name="queryParams"
        component={contentQueryParams}
      />
      <FormSection
        name="matrixParams"
        component={matrixParams}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(SearchParamsForm);
