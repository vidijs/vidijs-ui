import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { TextField } from '../form';
import Field from '../ui/Field';
import { StatefulAsyncSelect } from '../ui/Select';
import { loadShapeTagOptions } from '../shapetag/ShapeTagSelect';
import { required } from '../../utils/FieldValidation';

function ShapeTagAddForm({
  error,
  handleSubmit,
  itemId,
  shapeId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!itemId && (
        <Field
          name="itemId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      {!shapeId && (
        <Field
          name="shapeId"
          component={TextField}
          validate={[required]}
          fullWidth
        />
      )}
      <Field
        name="tagName"
        label="Shape Tag"
        component={StatefulAsyncSelect}
        loadOptions={loadShapeTagOptions}
        cacheOptions
        isClearable
        fullWidth
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeTagAddForm);
