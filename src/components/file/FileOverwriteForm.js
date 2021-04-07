import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import UploadButton from '../ui/UploadButton';

const queryParams = () => (
  <>
    <Field
      name="transferId"
      component={TextField}
      fullWidth
      disabled
    />
    <Field
      name="transferPriority"
      component={TextField}
      type="number"
      fullWidth
    />
  </>
);

function FileOverwriteForm({
  error,
  handleSubmit,
  submitting,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <Field
        name="file"
        component={UploadButton}
        loading={submitting}
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

export default reduxForm()(FileOverwriteForm);
