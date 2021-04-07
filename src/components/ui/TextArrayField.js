import React from 'react';
import { Field } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircle from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TextField } from '../form';

export default function TextArrayField({
  fields,
  label,
  fieldsLabel,
  meta = {},
  required,
}) {
  return (
    <div style={{ marginTop: '10px' }}>
      <Grid container direction="row" alignItems="center" justify="space-between">
        <Grid item sm={10}>
          {label
          && (
          <InputLabel
            error={Boolean(meta.submitFailed && meta.error)}
            required={required}
            onClick={() => fields.push()}
          >
            {label}
          </InputLabel>
          )}
          {meta.submitFailed && meta.error
            && (
            <FormHelperText error>
              {meta.error}
            </FormHelperText>
            )}
        </Grid>
        <Grid item sm={2}>
          <IconButton onClick={() => fields.push()}>
            <AddCircle />
          </IconButton>
        </Grid>
      </Grid>
      {fields.map((fieldName, index) => (
        <Grid
          key={fieldName}
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item sm={10}>
            <Field
              style={{ width: '100%' }}
              name={`${fieldName}`}
              component={TextField}
              label={fieldsLabel}
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
    </div>
  );
}
