import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';

export const queryParams = () => (
  <React.Fragment>
    <Field
      name="content"
      component={StatefulAsyncSelect}
      isMulti
      options={[
        { value: 'metadata', label: 'metadata' },
        { value: 'merged-access', label: 'merged-access' },
        { value: 'external', label: 'external' },
      ]}
      fullWidth
    />
    <Field
      name="field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="group"
      component={TextField}
      fullWidth
    />
    <Field
      name="interval"
      component={TextField}
      fullWidth
    />
    <Field
      name="track"
      component={TextField}
      fullWidth
    />
    <Field
      name="language"
      component={TextField}
      fullWidth
    />
    <Field
      name="sampleRate"
      component={TextField}
      fullWidth
    />
    <Field
      name="include"
      component={TextField}
      fullWidth
    />
    <Field
      name="includeValues"
      component={TextField}
      fullWidth
    />
    <Field
      name="revision"
      component={TextField}
      fullWidth
    />
    <Field
      name="mergedType"
      component={TextField}
      fullWidth
    />
    <Field
      name="mergedPermission"
      component={TextField}
      fullWidth
    />
    <Field
      name="mergedExtradata"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="defaultValue"
          component={BoolCheckbox}
        />
      )}
      label="Default Value"
    />
    <FormControlLabel
      control={(
        <Field
          name="conflict"
          component={BoolCheckbox}
        />
      )}
      label="Conflict"
    />
    <FormControlLabel
      control={(
        <Field
          name="includeTransientMetadata"
          component={BoolCheckbox}
        />
      )}
      label="Include Transient Metadata"
    />
    <FormControlLabel
      control={(
        <Field
          name="terse"
          component={BoolCheckbox}
        />
      )}
      label="Terse"
    />
  </React.Fragment>
);


function CollectionContentParamsForm({
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

export default reduxForm()(CollectionContentParamsForm);
