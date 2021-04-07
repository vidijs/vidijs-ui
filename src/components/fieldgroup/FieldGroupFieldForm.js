import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import { StatefulAsyncSelect } from '../ui/Select';
import Field from '../ui/Field';
import { loadMetadataFieldOptions } from '../metadatafield/MetadataFieldSelect';

const FieldGroupFieldForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    {error && <Typography color="error">{error}</Typography>}
    <Field
      name="fieldName"
      label="Metadata Field"
      component={StatefulAsyncSelect}
      loadOptions={loadMetadataFieldOptions}
      cacheOptions
      isClearable
      required
      fullWidth
      disableInitial
    />
    <button type="submit" hidden />
  </form>
);

export default reduxForm()(FieldGroupFieldForm);
