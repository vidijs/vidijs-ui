import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import Field from '../ui/Field';

function UserRealNameForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="realName"
        component={TextField}
        fullWidth
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(UserRealNameForm);
