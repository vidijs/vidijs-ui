import React from 'react';
import { TextField } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';

import FieldTypeArray from './FieldTypeArray';
import Field from './Field';

export const KeyValuePairType = ({ dense = true }) => (
  dense ? (
    <Grid container spacing={8}>
      <Grid item sm={6}>
        <Field
          name="key"
          label="key"
          component={TextField}
          fullWidth
        />
      </Grid>
      <Grid item sm={6}>
        <Field
          name="value"
          label="value"
          component={TextField}
          fullWidth
        />
      </Grid>
    </Grid>
  ) : (
    <React.Fragment>
      <Field
        name="key"
        label="key"
        component={TextField}
        fullWidth
      />
      <Field
        name="value"
        label="value"
        component={TextField}
        fullWidth
      />
    </React.Fragment>
  )
);

export const SimpleMetadataType = ({ dense = true }) => (
  <React.Fragment>
    <FieldTypeArray
      name="field"
      arrayHeader="field"
      withHeader={false}
      component={KeyValuePairType}
      dense={dense}
    />
  </React.Fragment>
);
