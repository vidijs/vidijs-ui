import React from 'react';
import { TextField } from 'redux-form-material-ui';

const InitialDisabledTextField = props => (
  <TextField
    disabled={(props.meta.initial !== undefined && props.meta.initial !== '')}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    {...props}
  />
);

export default InitialDisabledTextField;
