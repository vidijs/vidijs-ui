import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { StatefulAsyncSelect } from '../ui/Select';
import { required } from '../../utils/FieldValidation';
import FormSection from '../ui/FormSection';

const queryParams = () => (
  <React.Fragment>
    <Field
      name="container"
      label="Container"
      component={TextField}
      type="number"
      fullWidth
      helperText="Total Container Files"
    />
    <Field
      name="video"
      label="Video"
      component={TextField}
      type="number"
      helperText="Total Video Files"
      fullWidth
    />
    <Field
      name="audio"
      label="Audio"
      component={TextField}
      helperText="Total Audio Files"
      type="number"
      fullWidth
    />
    <Field
      name="binary"
      label="Binary"
      component={TextField}
      type="number"
      fullWidth
      helperText="Total Binary Files"
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
  </React.Fragment>
);


function ImportShapePlaceholderForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="itemId"
        label="Item Id"
        component={TextField}
        validate={[required]}
        required
        fullWidth
      />
      <FormSection
        name="queryParams"
        component={queryParams}
      />
      <button type="submit" hidden />
    </form>
  );
}
export default reduxForm()(ImportShapePlaceholderForm);
