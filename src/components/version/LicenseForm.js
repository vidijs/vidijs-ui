import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';

import { required } from '../../utils/FieldValidation';
import UploadButton from '../ui/UploadButton';

function LicenseForm({
  error,
  handleSubmit,
  className,
  onSubmit,
  submitOnChange,
}) {
  const onChange = submitOnChange ? () => setTimeout(handleSubmit((p) => onSubmit(p))) : undefined;
  return (
    <form onChange={onChange} onSubmit={handleSubmit} className={className} style={{ padding: '10px' }}>
      <Grid container direction="column" alignItems="center">
        {error && <Typography color="error">{error}</Typography>}
        <Field
          name="license"
          label="Choose License File"
          fullWidth
          component={UploadButton}
          validate={[required]}
        />
        <button type="submit" hidden />
      </Grid>
    </form>
  );
}

export const EDIT_LICENSE_FORM = 'EDIT_LICENSE_FORM';

export default reduxForm({
  form: EDIT_LICENSE_FORM,
})(LicenseForm);
