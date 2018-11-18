import React from 'react';
import { FormSection, FieldArray } from 'redux-form';

import withErrorBoundary from '../../hoc/withErrorBoundary';


const MatrixFieldComponent = ({
  fieldList,
  fields,
}) => fieldList.map((thisField, index) => (
  <FormSection
    key={index}
    name={`${fields.name}[${index}]`}
    component={thisField}
  />
));


const MatrixFieldArray = ({ component, ...props }) => (
  <FieldArray
    component={MatrixFieldComponent}
    fieldList={component}
    {...props}
  />
);

export default withErrorBoundary(MatrixFieldArray);
