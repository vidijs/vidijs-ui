import React from 'react';
import { reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';

import FormSection from '../ui/FormSection';
import { MetadataType } from '../metadata/MetadataForm';

function ConformMetadataForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="conformRequestDocument.metadata"
        component={MetadataType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ConformMetadataForm);
