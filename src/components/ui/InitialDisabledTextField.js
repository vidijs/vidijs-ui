import React from 'react';
import { TextField } from '../form';

const InitialDisabledTextField = (props) => (
  <TextField
    disabled={(props.meta.initial !== undefined && props.meta.initial !== '')}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    {...props}
  />
);

export default InitialDisabledTextField;
