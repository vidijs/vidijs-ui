import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';

import CodeField from '../ui/CodeField';

function ProjectionForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="projectionDocument"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/xml',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ProjectionForm);
