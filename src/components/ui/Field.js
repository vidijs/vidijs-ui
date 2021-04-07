import React from 'react';
import { Field } from 'redux-form';
import startCase from 'lodash.startcase';

const withStartCase = (WrappedComponent) => ({
  nameAsTitle = true,
  useStartCase = true,
  ...props
}) => {
  let { label } = props;
  if (!label && nameAsTitle) {
    label = (props.name && useStartCase) ? startCase(props.name) : props.name;
  } else {
    label = (props.label && useStartCase) ? startCase(props.label) : props.label;
  }
  const title = (props.title && useStartCase) ? startCase(props.title) : props.title;
  return <WrappedComponent {...props} title={title} label={label} />;
};

export default withStartCase(Field);
