import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import Field from '../ui/Field';

function ExternalIdForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="externalId"
        component={TextField}
        required
        fullWidth
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ExternalIdForm);
