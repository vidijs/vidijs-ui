import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import { ItemListDocument } from './LibraryForm';

function LibraryUpdateForm({
  error,
  handleSubmit,
  libraryId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      {!libraryId && (
        <Field
          name="libraryId"
          component={TextField}
          fullWidth
        />
      )}
      <FormSection
        name="itemListDocument"
        label="itemListDocument"
        component={ItemListDocument}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LibraryUpdateForm);
