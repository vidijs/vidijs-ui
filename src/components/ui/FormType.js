import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '../form';

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
    <>
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
    </>
  )
);

export const SimpleMetadataType = ({ dense = true }) => (
  <>
    <FieldTypeArray
      name="field"
      arrayHeader="field"
      withHeader={false}
      component={KeyValuePairType}
      dense={dense}
    />
  </>
);
