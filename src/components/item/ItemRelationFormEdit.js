import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

import FormSection from '../ui/FormSection';
import { DirectionQueryParam, RelationMetadataQueryParam } from './ItemRelationForm';


export const queryParams = () => (
  <React.Fragment>
    <DirectionQueryParam />
    <RelationMetadataQueryParam />
  </React.Fragment>
);


function ItemRelationFormEdit({
  error,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="queryParams"
        label="queryParams"
        component={queryParams}
      />
    </form>
  );
}

export default reduxForm()(ItemRelationFormEdit);
