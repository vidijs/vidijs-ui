import React from 'react';
import { Field } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { TextField } from '../form';

import TextButton from './TextButton';

export default function ItemIdField({ fields, buttonLabel }) {
  const addField = () => fields.push();
  return (
    <Grid
      container
      direction="column"

    >
      {fields.map((thisField, index) => (
        <Grid
          key={thisField}
          container
          direction="row"
          wrap="nowrap"
          spacing={16}
        >
          <Grid item sm={5}>
            <Field
              name={`${thisField}.id`}
              component={TextField}
              label="Item ID"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <IconButton onClick={() => fields.remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <TextButton onClick={addField} color="primary" style={{ marginTop: 10 }}>
          {buttonLabel || 'Add Item'}
        </TextButton>
      </Grid>
    </Grid>
  );
}
