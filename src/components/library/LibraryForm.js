import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import { TextField } from '../form';

import FormSection from '../ui/FormSection';
import Field from '../ui/Field';
import FieldTypeArray from '../ui/FieldTypeArray';

const ItemType = () => (
  <Field
    name="id"
    label="Item ID"
    component={TextField}
    fullWidth
  />
);

export const ItemListDocument = () => (
  <FieldTypeArray
    name="item"
    label="item"
    component={ItemType}
    withHeader={false}
    arrayHeader
  />
);

const queryParams = () => (
  <>
    <Field
      name="externalId"
      component={TextField}
      fullWidth
    />
  </>
);

function LibraryForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
      <FormSection
        name="itemListDocument"
        label="itemListDocument "
        component={ItemListDocument}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(LibraryForm);
