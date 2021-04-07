import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';

const matrixParams = () => (
  <>
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
      name="samplerate"
      component={TextField}
      fullWidth
    />
    <Field
      name="revision"
      component={TextField}
      fullWidth
    />
    <Field
      name="include"
      component={TextField}
      fullWidth
    />
    <Field
      name="from"
      component={TextField}
      fullWidth
    />
    <Field
      name="to"
      component={TextField}
      fullWidth
    />
    <Field
      name="includeConstraintValue"
      component={TextField}
      fullWidth
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
          name="defaultValue"
          component={BoolCheckbox}
        />
      )}
      label="Default Value"
    />
    <FormControlLabel
      control={(
        <Field
          name="starttc"
          component={BoolCheckbox}
        />
      )}
      label="Start TC"
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
  </>
);

const queryParams = () => (
  <>
    <FormControlLabel
      control={(
        <Field
          name="includeTransientMetadata"
          component={BoolCheckbox}
        />
      )}
      label="Include Transient Metadata"
    />
  </>
);

function MetadataDisplayParamsForm({
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
    </form>
  );
}

export default reduxForm()(MetadataDisplayParamsForm);
