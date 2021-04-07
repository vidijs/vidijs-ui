import React from 'react';
import Typography from '@material-ui/core/Typography';
import { reduxForm, FieldArray, FormSection } from 'redux-form';

import { SimpleMetadataFieldArray, SimpleMetadataFieldRemove } from './SimpleMetadataField';

export const SimpleMetadataType = (props) => (
  <FieldArray
    {...props}
    name="field"
    component={SimpleMetadataFieldArray}
  />
);

function SimpleMetadataForm({
  error,
  handleSubmit,
  onAdd,
  array,
  initialValues,
}) {
  const onRemove = (value) => {
    if (value) {
      const { simpleMetadataDocument = {} } = initialValues;
      const { field = [] } = simpleMetadataDocument;
      const isInitial = field.find((thisField) => thisField.key === value.key);
      if (isInitial) {
        array.push('removedKeys', value);
      }
    }
  };
  const onRestore = (value) => {
    if (value) { array.push('simpleMetadataDocument.field', value); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
      {error && <Typography color="error">{error}</Typography>}
      <FormSection
        name="simpleMetadataDocument"
        component={SimpleMetadataType}
        onAdd={onAdd}
        onRemove={onRemove}
      />
      <FieldArray
        name="removedKeys"
        component={SimpleMetadataFieldRemove}
        onRestore={onRestore}
      />

      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(SimpleMetadataForm);
