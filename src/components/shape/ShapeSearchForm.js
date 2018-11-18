import React from 'react';
import { reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';

import FormSection from '../ui/FormSection';
import { ItemSearchType } from '../item/ItemSearchForm';

function ShapeSearchForm({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="shapeSearchDocument"
        component={ItemSearchType}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(ShapeSearchForm);
