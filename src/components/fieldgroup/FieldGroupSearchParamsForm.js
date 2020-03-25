import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import BoolCheckbox from '../ui/BoolCheckbox';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadFieldGroupOptions } from './FieldGroupSelect';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="source"
      component={StatefulAsyncSelect}
      isMulti
      options={[
        { value: 'item', label: 'item' },
        { value: 'collection', label: 'collection' },
        { value: 'global', label: 'global' },
        { value: 'document', label: 'document' },
      ]}
      fullWidth
    />
    <Field
      name="group"
      component={StatefulAsyncSelect}
      loadOptions={loadFieldGroupOptions}
      cacheOptions
      isClearable
      fullWidth
      isMulti
    />
    <Field
      name="data"
      component={TextField}
      fullWidth
    />
    <FormControlLabel
      control={(
        <Field
          name="traverse"
          component={BoolCheckbox}
        />
      )}
      label="Traverse"
    />
    <FormControlLabel
      control={(
        <Field
          name="includeValue"
          component={BoolCheckbox}
        />
      )}
      label="Include Value"
    />
    <FormControlLabel
      control={(
        <Field
          name="includeDefinition"
          component={BoolCheckbox}
        />
      )}
      label="Include Definition"
    />
    <FormControlLabel
      control={(
        <Field
          name="includeSource"
          component={BoolCheckbox}
        />
      )}
      label="Include Source"
    />
  </React.Fragment>
);

const matrixParams = () => (
  <React.Fragment>
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
  </React.Fragment>
);


function FieldGroupSearchParamsForm({
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

export default reduxForm()(FieldGroupSearchParamsForm);
